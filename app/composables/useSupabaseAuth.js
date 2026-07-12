const authUser = ref(null)
const authInitialized = ref(false)
let authSubscription

export function useSupabaseAuth() {
  async function refreshUser() {
    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        authUser.value = null
        return { error }
      }

      authUser.value = data.user
      return { data }
    } catch (error) {
      authUser.value = null
      return { error }
    }
  }

  function initializeAuth() {
    if (authInitialized.value) return
    authInitialized.value = true
    refreshUser()

    try {
      const supabase = useSupabase()
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        authUser.value = session?.user ?? null
      })
      authSubscription = data.subscription
    } catch {
      authInitialized.value = false
    }
  }

  async function signIn(email, password) {
    try {
      const supabase = useSupabase()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) authUser.value = data.user
      return { data, error }
    } catch (error) {
      return { error }
    }
  }

  async function signOut() {
    try {
      const supabase = useSupabase()
      // Only clear the dashboard session in this browser tab. Do not revoke
      // sessions on the administrator's other devices.
      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (!error) authUser.value = null
      return { error }
    } catch (error) {
      return { error }
    }
  }

  return {
    user: readonly(authUser),
    initialized: readonly(authInitialized),
    initializeAuth,
    refreshUser,
    signIn,
    signOut,
  }
}
