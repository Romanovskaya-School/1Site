<template>
  <div class="testi-card reveal" :style="delay ? `transition-delay:${delay}s` : ''">
    <div class="testi-quote">"</div>
    <p class="testi-text">{{ text }}</p>
    <div class="testi-author">
      <div class="testi-avatar">{{ avatar }}</div>
      <div>
        <div class="testi-name">{{ name }}</div>
        <div class="testi-since">{{ since }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  name: String,
  since: String,
  avatar: String,
  delay: Number
});
</script>
