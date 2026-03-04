import { ref } from 'vue'

const content = ref({})
const isLoaded = ref(false)

function resolveValue(key, fallback = '') {
  const value = content.value?.[key]?.value

  if (value === undefined || value === null) {
    return fallback
  }

  if (typeof value === 'string' && value.trim() === '') {
    return fallback
  }

  return value
}

function getValue(key, fallback = '') {
  return resolveValue(key, fallback)
}

function getHtml(key, fallback = '') {
  return resolveValue(key, fallback)
}

async function loadContent() {
  if (isLoaded.value) return

  try {
    const res = await fetch('/api/content')
    if (!res.ok) return
    const data = await res.json()
    content.value = data || {}

    if (content.value['site.title']?.value) {
      document.title = content.value['site.title'].value
    }

    isLoaded.value = true
  } catch {
    // fail silently, fall back to defaults in components
  }
}

export function useContent() {
  return {
    content,
    getValue,
    getHtml,
    loadContent,
  }
}

