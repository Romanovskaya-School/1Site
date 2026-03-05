<template>
  <div class="mobile-nav" :class="{ 'open': isOpen }" role="navigation" aria-label="Мобильное меню">
    <button class="mobile-nav-close" @click="$emit('close')" aria-label="Закрыть меню">✕</button>
    <router-link to="/#about" @click="$emit('close')">О психологе</router-link>
    <router-link to="/#services" @click="$emit('close')">Услуги</router-link>
    <router-link to="/#how" @click="$emit('close')">Как это работает</router-link>
    <router-link to="/articles" @click="$emit('close')">Статьи</router-link>
    <router-link to="/#testimonials" @click="$emit('close')">Отзывы</router-link>
    <router-link to="/#contact" @click="$emit('close')">Записаться</router-link>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean
});
defineEmits(['close']);
</script>
