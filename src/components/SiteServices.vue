<template>
  <div>
    <!-- PERSONAL THERAPY -->
    <section class="services" id="personal">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Направления работы</p>
          <h2 class="section-title">{{ siteData.perTitle }}</h2>
          <p class="section-subtitle">{{ siteData.perSubtitle }}</p>
        </div>

        <div class="services-grid">
          <div class="service-card reveal" style="transition-delay:0.05s">
            <div class="service-icon">🌱</div>
            <h3 class="service-title">{{ siteData.perCard1Title }}</h3>
            <p class="service-desc">{{ siteData.perCard1Desc }}</p>
          </div>

          <div class="service-card reveal" style="transition-delay:0.1s">
            <div class="service-icon">✨</div>
            <h3 class="service-title">{{ siteData.perCard2Title }}</h3>
            <p class="service-desc">{{ siteData.perCard2Desc }}</p>
          </div>

          <div class="service-card reveal" style="transition-delay:0.15s">
            <div class="service-icon">☁️</div>
            <h3 class="service-title">{{ siteData.perCard3Title }}</h3>
            <p class="service-desc">{{ siteData.perCard3Desc }}</p>
          </div>
        </div>
        
        <div class="articles-grid" style="margin-top: 60px;">
           <div v-for="(a, i) in personalArticles" :key="a.id" class="article-card reveal" :style="{ 'transition-delay': (i * 0.05) + 's', cursor: 'pointer' }">
             <div class="article-body">
                <span class="article-cat">{{ a.category }}</span>
                <h3 class="article-title">{{ a.title }}</h3>
                <p class="article-excerpt">{{ a.excerpt }}</p>
             </div>
           </div>
        </div>
      </div>
    </section>

    <!-- FAMILY THERAPY -->
    <section class="services" id="family" style="background: var(--bg-alt); padding-top: 80px; padding-bottom: 80px;">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Отношения</p>
          <h2 class="section-title">{{ siteData.famTitle }}</h2>
          <p class="section-subtitle">{{ siteData.famSubtitle }}</p>
        </div>

        <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));">
          <div class="service-card reveal" style="background: var(--bg-main); transition-delay:0.05s">
            <div class="service-icon">👥</div>
            <h3 class="service-title">{{ siteData.famCard1Title }}</h3>
            <p class="service-desc">{{ siteData.famCard1Desc }}</p>
          </div>

          <div class="service-card reveal" style="background: var(--bg-main); transition-delay:0.1s">
            <div class="service-icon">🧸</div>
            <h3 class="service-title">{{ siteData.famCard2Title }}</h3>
            <p class="service-desc">{{ siteData.famCard2Desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteData } from '../composables/useSiteData'
import { useArticles } from '../composables/useArticles'

const { siteData } = useSiteData()
const { articles } = useArticles()

const personalArticles = computed(() => {
  return articles.value.slice(0, 3)
})
</script>
