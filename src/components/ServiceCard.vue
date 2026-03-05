<template>
  <div class="service-card reveal" :class="{ 'featured': featured }" :style="delay ? `transition-delay:${delay}s` : ''">
    <span v-if="featured" class="service-badge">Популярно</span>
    <div class="service-icon">{{ icon }}</div>
    <h3 class="service-title">{{ title }}</h3>
    <p class="service-desc">{{ desc }}</p>
    <div class="service-price">
      <span class="price-amount">{{ price }}</span>
      <span class="price-meta">{{ meta }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  desc: String,
  price: String,
  meta: String,
  icon: String,
  featured: Boolean,
  delay: Number
});
</script>
