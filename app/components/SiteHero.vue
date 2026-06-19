<template>
  <section class="hero" id="home" @mousemove="handleMouseMove">
    <div class="blob blob-1" :style="blob1Style"></div>
    <div class="blob blob-2" :style="blob2Style"></div>

    <div class="container">
      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-tag reveal-blur">
            <span>🌿</span> Бережные онлайн-консультации
          </div>
          <h1 class="hero-title reveal-blur" style="transition-delay:0.1s" v-html="siteData.heroTitle"></h1>
          <p class="hero-desc reveal-blur" style="transition-delay:0.2s">{{ siteData.heroDesc }}</p>
          <div class="hero-actions reveal-blur" style="transition-delay:0.3s">
            <router-link to="/#contact" class="btn btn-primary">Начать изменения →</router-link>
            <a href="#about" class="btn btn-outline">Познакомиться</a>
          </div>
          <div class="hero-stats reveal-blur" style="transition-delay:0.4s">
            <div>
              <div class="stat-num">7+</div>
              <div class="stat-label">лет<br>опыта</div>
            </div>
            <div>
              <div class="stat-num">400+</div>
              <div class="stat-label">клиентов</div>
            </div>
            <div>
              <div class="stat-num">100%</div>
              <div class="stat-label">онлайн</div>
            </div>
          </div>
        </div>

        <div class="hero-visual reveal-blur" style="transition-delay:0.3s">
          <div class="hero-photo-wrap">
            <div class="hero-photo-bg"></div>
            <img v-if="siteData.heroImage" :src="siteData.heroImage" class="hero-photo" alt="Виктория Терехова" />
            <div v-else class="photo-placeholder" style="aspect-ratio: 3/4; border-radius: var(--radius-lg); position: relative; z-index: 1;">
              <span>Место для фото</span>
            </div>
            <div class="hero-badge">
              <div class="badge-icon">🎓</div>
              <div class="badge-text">
                <strong>Сертифицированный</strong>
                психолог онлайн
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteData } from '../composables/useSiteData'

const { siteData } = useSiteData()
const blob1Style = ref('')
const blob2Style = ref('')

const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  blob1Style.value = `transform: translate(${x * 0.3}px, ${y * 0.3}px)`
  blob2Style.value = `transform: translate(${x * -0.3}px, ${y * -0.3}px)`
}
</script>
