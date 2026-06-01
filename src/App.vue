<template>
  <div id="app-root">
    <SiteHeader v-if="!isAdmin" @open-mobile="mobileNavOpen = true" />
    <div class="mobile-nav" :class="{ open: mobileNavOpen }">
      <button class="mobile-nav-close" @click="mobileNavOpen = false">✕</button>
      <router-link to="/about" @click="mobileNavOpen = false">О психологе</router-link>
      <router-link to="/rpp" @click="mobileNavOpen = false">РПП</router-link>
      <router-link to="/personal" @click="mobileNavOpen = false">Личная терапия</router-link>
      <router-link to="/family" @click="mobileNavOpen = false">Семейная терапия</router-link>
      <router-link to="/articles" @click="mobileNavOpen = false">Статьи</router-link>
      <router-link to="/#contact" @click="mobileNavOpen = false">Записаться</router-link>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="page-slide" mode="out-in" @after-enter="initReveal">
        <component :is="Component" />
      </transition>
    </router-view>
    <SiteFooter v-if="!isAdmin" />
    <TestPrompt v-if="!isAdmin" />
  </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import TestPrompt from './components/TestPrompt.vue'
import { useSiteData } from './composables/useSiteData'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
const mobileNavOpen = ref(false)
const { incrementVisits } = useSiteData()

let revealObserver = null

const initReveal = () => {
  if (revealObserver) revealObserver.disconnect()
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

onMounted(() => {
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
</script>
<style>
/* App Styles */
</style>
