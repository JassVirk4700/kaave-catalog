'use server'

import { createSupabaseServerClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const supabase = await createSupabaseServerClient()
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Return standard error messaging to securely protect the server
    return { error: error.message }
  }

  // Redirect to dashboard on successful login
  redirect('/dashboard')
}
