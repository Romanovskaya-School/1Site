<template>
  <div class="articles-page">
    <section class="page-hero">
      <div class="container">
        <p class="section-label">Блог</p>
        <h1 class="section-title" style="margin-bottom:16px;">Статьи о психологии</h1>
        <p class="section-subtitle" style="margin:0 auto;">
          Делюсь знаниями и советами о психологии — просто, понятно и без лишних терминов.
        </p>
      </div>
    </section>

    <section style="padding:64px 0 100px; background:var(--warm-white);">
      <div class="container">
        <div class="filter-bar" style="justify-content: space-between;">
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <span class="filter-label">Фильтр:</span>
            <button class="filter-btn" :class="{ active: currentFilter === 'all' }" @click="currentFilter = 'all'">
              Все <span class="filter-count">{{ articles.length }}</span>
            </button>
            <button v-for="cat in categories" :key="cat" class="filter-btn" :class="{ active: currentFilter === cat }" @click="currentFilter = cat">
              {{ cat }} <span class="filter-count">{{ articles.filter(a => a.category === cat).length }}</span>
            </button>
          </div>
          
          <div class="search-box">
            <input type="text" v-model="searchQuery" placeholder="Поиск статей..." class="search-input" />
          </div>
        </div>

        <div id="articlesList">
          <article v-for="(a, i) in filteredArticles" :key="a.id" class="article-full-card" :style="{ 'animation-delay': (i * 0.06) + 's', animation: 'fadeInUp 0.5s ease backwards' }">
            <img :src="a.image || 'images/article-anxiety.png'" :alt="a.title" class="article-full-img" @error="$event.target.src='images/article-anxiety.png'" />
            <div class="article-full-body">
              <div>
                <span class="article-cat">{{ a.category || '' }}</span>
              </div>
              <h2 class="article-full-title">{{ a.title }}</h2>
              <div class="article-meta" style="margin-bottom:18px;">
                🗓 {{ formatDate(a.date) }} {{ a.readTime ? '· ⏱ ' + a.readTime : '' }} <span style="margin-left: 8px;">👁 {{ a.views || 0 }}</span>
              </div>
              <p class="article-full-excerpt">{{ a.excerpt || '' }}</p>
              <div class="article-read-more" @click="openArticle(a)">
                Читать статью →
              </div>
            </div>
          </article>
        </div>

        <div v-if="filteredArticles.length === 0" class="no-results show">
          <div class="icon">🔍</div>
          <p>Статей в этой категории пока нет.</p>
        </div>
      </div>
    </section>

    <!-- ARTICLE READER OVERLAY -->
    <div id="articleOverlay" role="dialog" aria-modal="true" aria-label="Статья" :class="{ open: selectedArticle }" @click="handleOverlayClick">
      <div class="overlay-card" v-if="selectedArticle" @click.stop>
        <img :src="selectedArticle.image || 'images/article-anxiety.png'" :alt="selectedArticle.title" class="overlay-cover" @error="$event.target.src='images/article-anxiety.png'" />
        <div class="overlay-body">
          <button class="overlay-close" @click="closeArticle" aria-label="Закрыть">✕</button>
          <span class="overlay-cat">{{ selectedArticle.category || '' }}</span>
          <h1 class="overlay-title">{{ selectedArticle.title }}</h1>
          <div class="overlay-meta">
            <span>🗓 {{ formatDate(selectedArticle.date) }}</span>
            <span v-if="selectedArticle.readTime">⏱ {{ selectedArticle.readTime }}</span>
            <span>👁 {{ selectedArticle.views || 0 }}</span>
          </div>
          <div class="overlay-content" v-html="selectedArticle.content || ''"></div>
          <div class="overlay-cta">
            <p>Хотите поработать над похожим запросом вместе?</p>
            <router-link to="/#contact" class="btn btn-primary" @click="closeArticle">Записаться на консультацию</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useArticles } from '../composables/useArticles'
import { useRoute, useRouter } from 'vue-router'

const { articles, saveArticle } = useArticles()
const route = useRoute()
const router = useRouter()

const currentFilter = ref('all')
const selectedArticle = ref(null)
const searchQuery = ref('')

const categories = computed(() => {
  return [...new Set(articles.value.map(a => a.category).filter(Boolean))]
})

const filteredArticles = computed(() => {
  let filtered = articles.value
  
  if (currentFilter.value !== 'all') {
    filtered = filtered.filter(a => a.category === currentFilter.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a => 
      (a.title && a.title.toLowerCase().includes(query)) || 
      (a.excerpt && a.excerpt.toLowerCase().includes(query)) ||
      (a.content && a.content.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })
}

const openArticle = (article) => {
  selectedArticle.value = article
  document.body.style.overflow = 'hidden'
  
  if (!article.views) article.views = 0
  article.views += 1
  saveArticle(article)
  
  router.replace({ query: { read: article.id } })
}

const closeArticle = () => {
  selectedArticle.value = null
  document.body.style.overflow = ''
  router.replace({ query: {} })
}

const handleOverlayClick = (e) => {
  closeArticle()
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') closeArticle()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  if (route.query.read) {
    const art = articles.value.find(a => a.id === route.query.read)
    if (art) openArticle(art)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* Search Input */
.search-box {
  flex-grow: 1;
  max-width: 300px;
  min-width: 200px;
}
.search-input {
  width: 100%;
  padding: 10px 16px;
  border-radius: 100px;
  border: 1.5px solid rgba(72, 164, 165, 0.22);
  background: var(--cream);
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-dark);
  outline: none;
  transition: all 0.3s ease;
}
.search-input:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 4px rgba(72, 164, 165, 0.1);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  padding: 20px 24px;
  background: var(--warm-white);
  border: 1px solid rgba(72, 164, 165, 0.12);
  border-radius: 16px;
}
.filter-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-light);
  margin-right: 4px;
  flex-shrink: 0;
}
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 100px;
  border: 1.5px solid rgba(72, 164, 165, 0.22);
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-mid);
  cursor: pointer;
  transition: all 0.3s ease;
}
.filter-btn:hover {
  background: var(--blush);
  border-color: var(--rose);
  color: var(--accent);
}
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  box-shadow: 0 4px 14px rgba(72, 164, 165, 0.35);
}
.filter-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 100px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  font-size: 0.72rem;
  font-weight: 700;
}
.filter-btn:not(.active) .filter-count {
  background: rgba(72, 164, 165, 0.12);
  color: var(--text-light);
}

/* Article Full Cards */
.article-full-card {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 0;
  background: var(--cream);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(72, 164, 165, 0.12);
  margin-bottom: 36px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.article-full-card:hover {
  box-shadow: 0 20px 56px rgba(72, 164, 165, 0.1);
  transform: translateY(-4px);
}
.article-full-img {
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  display: block;
}
.article-full-body {
  padding: 44px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.article-full-title {
  font-family: var(--font-head);
  font-size: clamp(1.35rem, 2.2vw, 1.9rem);
  font-weight: 700;
  color: var(--text-dark);
  margin: 12px 0 16px;
  line-height: 1.3;
  transition: color 0.3s;
}
.article-full-card:hover .article-full-title {
  color: var(--accent);
}
.article-full-excerpt {
  font-size: 0.95rem;
  color: var(--text-mid);
  line-height: 1.8;
  margin-bottom: 28px;
  flex: 1;
}
.article-read-more {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: gap 0.3s, color 0.3s;
  cursor: pointer;
}
.article-read-more:hover {
  gap: 13px;
  color: var(--accent-dark);
}

/* Article Overlay (modal reader) */
#articleOverlay {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 5000;
  background: rgba(44, 62, 80, 0.4);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  overflow-y: auto;
  padding: 40px 20px;
}
#articleOverlay.open {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.overlay-card {
  background: var(--warm-white);
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  box-shadow: 0 32px 80px rgba(44, 62, 80, 0.2);
  overflow: hidden;
  animation: slideUp 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
.overlay-cover {
  width: 100%;
  aspect-ratio: 16/7;
  object-fit: cover;
}
.overlay-body {
  padding: 44px 52px 52px;
}
.overlay-close {
  position: sticky;
  top: 20px;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(44, 62, 80, 0.08);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  margin: -12px -12px 0 16px;
  flex-shrink: 0;
}
.overlay-close:hover {
  background: rgba(72, 164, 165, 0.25);
}
.overlay-cat {
  display: inline-block;
  background: var(--blush);
  color: var(--accent-dark);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 5px 14px;
  border-radius: 100px;
  margin-bottom: 16px;
}
.overlay-title {
  font-family: var(--font-head);
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--text-dark);
  line-height: 1.25;
  margin-bottom: 12px;
}
.overlay-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.82rem;
  color: var(--text-light);
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(72, 164, 165, 0.12);
}

/* Article content inside overlay */
:deep(.overlay-content h2) {
  font-family: var(--font-head);
  font-size: 1.5rem;
  color: var(--text-dark);
  margin: 32px 0 14px;
}
:deep(.overlay-content h3) {
  font-family: var(--font-head);
  font-size: 1.2rem;
  color: var(--text-dark);
  margin: 24px 0 10px;
}
:deep(.overlay-content p) {
  color: var(--text-mid);
  line-height: 1.9;
  margin-bottom: 16px;
}
:deep(.overlay-content ul),
:deep(.overlay-content ol) {
  margin: 12px 0 16px 24px;
  color: var(--text-mid);
  line-height: 1.8;
}
:deep(.overlay-content li) {
  margin-bottom: 6px;
}
:deep(.overlay-content blockquote) {
  border-left: 4px solid var(--accent);
  padding: 16px 24px;
  background: var(--blush);
  border-radius: 0 10px 10px 0;
  margin: 24px 0;
  font-style: italic;
  color: var(--text-mid);
}
:deep(.overlay-content strong) {
  color: var(--text-dark);
}
.overlay-cta {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(72, 164, 165, 0.12);
  text-align: center;
}
.overlay-cta p {
  font-size: 0.95rem;
  color: var(--text-mid);
  margin-bottom: 16px;
}

/* No results */
.no-results {
  text-align: center;
  padding: 80px 24px;
  color: var(--text-light);
  display: none;
}
.no-results.show {
  display: block;
}
.no-results .icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.no-results p {
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .article-full-card { grid-template-columns: 1fr; }
  .article-full-img { min-height: 220px; max-height: 280px; }
  .article-full-body { padding: 28px 28px 32px; }
}
@media (max-width: 600px) {
  .overlay-body { padding: 28px 24px 36px; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
