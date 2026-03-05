<template>
  <div class="articles-page">
    <section class="articles-hero">
      <div class="container">
        <h1 class="reveal">Полезные материалы</h1>
        <p class="reveal" style="transition-delay:0.1s">Статьи о психологии, самопомощи и личностном росте.</p>
      </div>
    </section>

    <section class="articles-list">
      <div class="container">
        <div class="articles-grid">
          <ArticleCard 
            v-for="(article, index) in articles" 
            :key="article.id" 
            :article="article" 
            :delay="0.05 * (index + 1)" 
            @click="openArticle(article)"
          />
        </div>
      </div>
    </section>

    <!-- Modal for article details -->
    <div v-if="selectedArticle" class="article-modal" @click.self="selectedArticle = null">
      <div class="modal-content">
        <button class="modal-close" @click="selectedArticle = null">✕</button>
        <img :src="selectedArticle.image" :alt="selectedArticle.title" class="modal-image" />
        <div class="modal-body">
          <span class="article-cat">{{ selectedArticle.category }}</span>
          <h2>{{ selectedArticle.title }}</h2>
          <div class="article-meta">🗓 {{ formatDate(selectedArticle.date) }} • ⏳ {{ selectedArticle.readTime }}</div>
          <div class="article-full-content" v-html="selectedArticle.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ArticleCard from '../components/ArticleCard.vue';
import { getArticles } from '../utils/articles-data';

const articles = ref([]);
const selectedArticle = ref(null);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const openArticle = (article) => {
  selectedArticle.value = article;
  document.body.style.overflow = 'hidden';
};

const closeArticle = () => {
    selectedArticle.value = null;
    document.body.style.overflow = '';
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

onMounted(() => {
  articles.value = getArticles();
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
});
</script>

<style scoped>
.articles-hero {
  padding: 120px 0 60px;
  background: var(--sage-light);
  text-align: center;
}
.articles-list {
  padding: 80px 0;
}
.article-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
.modal-content {
  background: white;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.modal-body {
  padding: 40px;
}
.article-full-content {
  margin-top: 30px;
  line-height: 1.8;
}
.article-full-content :deep(h2) { margin-top: 40px; margin-bottom: 20px; }
.article-full-content :deep(p) { margin-bottom: 20px; }
</style>
