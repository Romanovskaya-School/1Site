<template>
  <div class="article-card reveal" :style="delay ? `transition-delay:${delay}s` : ''">
    <img :src="article.image" :alt="article.title" class="article-thumb" />
    <div class="article-body">
      <span class="article-cat">{{ article.category }}</span>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-excerpt">{{ article.excerpt }}</p>
      <div class="article-meta">
        <span>🗓</span> {{ formatDate(article.date) }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  article: Object,
  delay: Number
});

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
</script>
