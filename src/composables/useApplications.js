import { ref } from 'vue'

const APPLICATIONS_KEY = 'vt_applications'

export function useApplications() {
  const getApplications = () => {
    const raw = localStorage.getItem(APPLICATIONS_KEY)
    if (!raw) return []
    try {
      return JSON.parse(raw)
    } catch {
      return []
    }
  }

  const applications = ref(getApplications())

  const saveApplication = (app) => {
    const idx = applications.value.findIndex(a => a.id === app.id)
    if (idx >= 0) {
      applications.value[idx] = app
    } else {
      applications.value.unshift(app)
    }
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications.value))
  }

  const deleteApplication = (id) => {
    applications.value = applications.value.filter(a => a.id !== id)
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications.value))
  }

  const generateAppId = () => {
    return 'app-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7)
  }

  return {
    applications,
    saveApplication,
    deleteApplication,
    generateAppId
  }
}
