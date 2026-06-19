<template>
  <section class="about" id="about">
    <div class="container">
      <div class="about-inner">
        <div class="about-image-wrap reveal-blur">
          <div class="hero-photo-wrap">
            <div class="hero-photo-bg"></div>
            <img v-if="siteData.aboutImage" :src="siteData.aboutImage" class="hero-photo" alt="Виктория Терехова" />
            <div v-else class="photo-placeholder" style="aspect-ratio: 3/4; border-radius: var(--radius-lg); position: relative; z-index: 1;">
              <span>Место для фото</span>
            </div>
            <div class="about-cert">
              <strong>7+</strong>
              лет практики
            </div>
          </div>
        </div>

        <div class="about-text reveal-blur" style="transition-delay:0.15s">
          <p class="section-label">О психологе</p>
          <h2 class="section-title">{{ siteData.aboutTitle }}</h2>
          <p class="about-body" style="margin-top:20px">{{ siteData.aboutP1 }}</p>
          <p class="about-body">{{ siteData.aboutP2 }}</p>
          
          <div class="about-qualities">
            <span class="quality-tag">🧠 КПТ-терапия</span>
            <span class="quality-tag">🌱 Гештальт</span>
            <span class="quality-tag">💬 Психосоматика</span>
            <span class="quality-tag">✨ Тревога и стресс</span>
            <span class="quality-tag">🏠 Личные границы</span>
          </div>

          <router-link to="/#contact" class="btn btn-primary">Записаться на первую встречу</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSiteData } from '../composables/useSiteData'
const { siteData } = useSiteData()
</script>
