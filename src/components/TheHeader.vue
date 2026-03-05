<template>
  <header id="header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <nav>
        <router-link to="/" class="nav-logo">
          <span class="logo-name">Виктория Терехова</span>
          <span class="logo-sub">Психолог · Онлайн</span>
        </router-link>

        <ul class="nav-links">
          <li><router-link to="/#about">О психологе</router-link></li>
          <li><router-link to="/#services">Услуги</router-link></li>
          <li><router-link to="/#how">Как это работает</router-link></li>
          <li><router-link to="/articles">Статьи</router-link></li>
          <li><router-link to="/#testimonials">Отзывы</router-link></li>
        </ul>

        <div class="nav-cta">
          <router-link to="/#contact" class="btn btn-primary">Записаться</router-link>
          <button class="burger" id="burgerBtn" aria-label="Открыть меню" @click="$emit('open-mobile-nav')">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

defineEmits(['open-mobile-nav']);
</script>
