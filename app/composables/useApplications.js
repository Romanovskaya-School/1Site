import { ref } from 'vue'

const applications = ref([])
const applicationsError = ref(null)
const applicationsLoading = ref(false)

export function useApplications() {
  const loadApplications = async () => {
    const supabase = useSupabase()
    applicationsLoading.value = true
    applicationsError.value = null
    const { data, error } = await supabase
      .from('applications')
      .select('id, name, contact, query, status, created_at')
      .order('created_at', { ascending: false })

    applicationsLoading.value = false
    if (error) {
      applicationsError.value = error.message
      return { error }
    }

    applications.value = data.map(application => ({ ...application, date: application.created_at }))
    return { data: applications.value }
  }

  const saveApplication = async (application) => {
    const supabase = useSupabase()
    applicationsError.value = null
    const payload = {
      name: application.name.trim(),
      contact: application.contact.trim(),
      query: application.query?.trim() || null,
    }

    if (!application.id) {
      // Do not request the inserted row: public form submissions intentionally
      // have no SELECT policy under RLS.
      const { error } = await supabase.from('applications').insert(payload)
      if (error) {
        applicationsError.value = error.message
        return { error }
      }
      return { data: null, error: null }
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status: application.status })
      .eq('id', application.id)
      .select()
      .single()

    if (error) {
      applicationsError.value = error.message
      return { error }
    }

    const normalized = { ...data, date: data.created_at }
    const index = applications.value.findIndex(item => item.id === normalized.id)
    if (index >= 0) applications.value[index] = normalized
    else applications.value.unshift(normalized)
    return { data: normalized }
  }

  const deleteApplication = async (id) => {
    const supabase = useSupabase()
    applicationsError.value = null
    const { error } = await supabase.from('applications').delete().eq('id', id)
    if (error) {
      applicationsError.value = error.message
      return { error }
    }

    applications.value = applications.value.filter(application => application.id !== id)
    return { error: null }
  }

  return {
    applications,
    applicationsError,
    applicationsLoading,
    loadApplications,
    saveApplication,
    deleteApplication,
  }
}
