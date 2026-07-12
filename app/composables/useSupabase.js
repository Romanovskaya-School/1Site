import { createClient } from '@supabase/supabase-js'

let client

export function useSupabase() {
  const config = useRuntimeConfig()
  const { supabaseUrl, supabaseKey } = config.public

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase is not configured. Set NUXT_PUBLIC_SUPABASE_URL and NUXT_PUBLIC_SUPABASE_KEY.')
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        // Dashboard access remains available on reload in this tab, but a new
        // tab or a reopened browser requires an explicit sign-in.
        storage: sessionStorage,
        storageKey: 'vt_dashboard_auth',
        persistSession: true,
      },
    })
  }

  return client
}
