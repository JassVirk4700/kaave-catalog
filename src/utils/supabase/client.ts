import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

/**
 * Browser-side Supabase client.
 *
 * - Uses `createBrowserClient` from `@supabase/ssr` so auth cookies are
 *   handled automatically alongside the server client in `server.ts`.
 * - Safe to call multiple times — `createBrowserClient` returns a singleton
 *   per tab internally.
 * - Never use this in Server Components or Route Handlers; use
 *   `createSupabaseServerClient()` from `server.ts` instead.
 */
export function createSupabaseClient() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    )
}
