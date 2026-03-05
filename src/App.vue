<template>
  <div id="app">
    <TheHeader @open-mobile-nav="isMobileNavOpen = true" />
    <MobileNav :is-open="isMobileNavOpen" @close="isMobileNavOpen = false" />
    
    <main>
      <router-view />
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import MobileNav from './components/MobileNav.vue';

const isMobileNavOpen = ref(false);
</script>

<style>
@import './assets/css/styles.css';
</style>
