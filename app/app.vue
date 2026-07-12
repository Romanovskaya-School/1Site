<template>
  <div id="app-root">
    <SiteHeader v-if="!isDashboard" @open-mobile="mobileNavOpen = true" />
    <div v-if="!isDashboard" class="mobile-nav" :class="{ open: mobileNavOpen }">
      <button class="mobile-nav-close" @click="mobileNavOpen = false">✕</button>
      <NuxtLink to="/about" @click="mobileNavOpen = false">О психологе</NuxtLink>
      <NuxtLink to="/rpp" @click="mobileNavOpen = false">РПП</NuxtLink>
      <NuxtLink to="/personal" @click="mobileNavOpen = false">Личная терапия</NuxtLink>
      <NuxtLink to="/family" @click="mobileNavOpen = false">Семейная терапия</NuxtLink>
      <NuxtLink to="/articles" @click="mobileNavOpen = false">Статьи</NuxtLink>
      <NuxtLink to="/#contact" @click="mobileNavOpen = false">Записаться</NuxtLink>
    </div>
    <NuxtPage />
    <SiteFooter v-if="!isDashboard" />
    <TestPrompt v-if="!isDashboard" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue'

const route = useRoute()
const isDashboard = computed(() => route.path.startsWith('/dashboard'))
const mobileNavOpen = ref(false)
const { incrementVisits, loadSiteData } = useSiteData()
const { loadArticles } = useArticles()

let revealObserver = null

const initReveal = () => {
  if (revealObserver) revealObserver.disconnect()
  // Ensure we are running on client
  if (typeof window === 'undefined') return
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
        revealObserver.unobserve(e.target)
      }
    })
  }, { threshold: 0.1 })
  nextTick(() => {
    document.querySelectorAll('.reveal:not(.visible), .reveal-blur:not(.visible)').forEach(el => {
      revealObserver.observe(el)
    })
  })
}

onMounted(async () => {
  await Promise.all([loadSiteData(), loadArticles()])
  incrementVisits()
  initReveal()
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      if (href === '#') return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })
})

watch(() => route.fullPath, () => {
  initReveal()
})
</script>

<style>
/* Nuxt Page Transition */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
