import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// ─── Runtime config ────────────────────────────────────────────────────────
// Force dynamic so Next.js never pre-renders / caches this handler.
export const dynamic = 'force-dynamic'

// ─── Types ─────────────────────────────────────────────────────────────────
interface PingResult {
  ok: boolean
  rowCount: number | null
  latencyMs: number
  timestamp: string
}

interface ErrorResult {
  ok: false
  error: string
  timestamp: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────

/** Builds a typed ErrorResult body, ensuring `timestamp` is always present. */
function errorResponse(error: string): ErrorResult {
  return { ok: false, error, timestamp: new Date().toISOString() }
}

/**
 * Builds a Supabase admin client that bypasses Row-Level-Security.
 * Uses the service-role key so the query is always authorised regardless
 * of session state — appropriate for a server-side background job.
 */
function buildSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      'Missing required env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    )
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      // Disable session persistence — this client is ephemeral per request.
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

/**
 * Performs a lightweight real query against Supabase so the connection
 * is truly exercised (counts as activity for the free-tier inactivity timer).
 *
 * We intentionally limit to 1 row so the payload is negligible.
 */
async function pingDatabase(): Promise<PingResult> {
  const supabase = buildSupabaseAdminClient()
  const start = Date.now()

  // A simple SELECT on any publicly available table. Adjust the table name
  // if your schema changes.  `limit(1)` keeps the data transfer minimal.
  const { error, count } = await supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .limit(1)

  const latencyMs = Date.now() - start

  if (error) {
    throw new Error(`Supabase ping failed: ${error.message}`)
  }

  return {
    ok: true,
    rowCount: count,
    latencyMs,
    timestamp: new Date().toISOString(),
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────

/**
 * GET /api/cron/keep-alive
 *
 * Invoked by Vercel Cron on the schedule defined in vercel.json.
 * Protected by the `Authorization: Bearer <CRON_SECRET>` header that
 * Vercel injects automatically — we validate it to reject rogue calls.
 */
export async function GET(request: NextRequest): Promise<Response> {
  // ── 1. Auth guard ──────────────────────────────────────────────────────
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('[keep-alive] CRON_SECRET env var is not set.')
    return Response.json(errorResponse('Server misconfiguration'), { status: 500 })
  }

  const authHeader = request.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (token !== cronSecret) {
    console.warn('[keep-alive] Unauthorised request — invalid or missing bearer token.')
    return Response.json(errorResponse('Unauthorised'), { status: 401 })
  }

  // ── 2. Ping Supabase ───────────────────────────────────────────────────
  try {
    const result = await pingDatabase()

    console.log(
      `[keep-alive] Supabase ping succeeded — latency: ${result.latencyMs}ms, rows: ${result.rowCount}`
    )

    return Response.json(result satisfies PingResult, { status: 200 })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('[keep-alive] Supabase ping failed:', message)

    return Response.json(errorResponse(message), { status: 502 })
  }
}
