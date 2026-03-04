<script setup>
import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SiteShell from '@/components/SiteShell.vue'
import { useContent } from '@/composables/useContent'

const { getValue } = useContent()
const route = useRoute()
const router = useRouter()

const TOPICS = {
  // Семейная психология
  'family-couples-joint': {
    title: 'Консультации для пар (совместно)',
    section: 'Семейная психология',
  },
  'family-couples-conflicts': {
    title: 'Конфликты в семье, кризисы в отношениях',
    section: 'Семейная психология',
  },
  'family-couples-individual': {
    title: 'Индивидуальные консультации для супругов (когда второй не готов)',
    section: 'Семейная психология',
  },
  'family-parents-consult': {
    title: 'Консультации для родителей',
    section: 'Семейная психология',
  },
  'family-parents-joint': {
    title: 'Для родителей и детей (совместные сессии)',
    section: 'Семейная психология',
  },
  'family-parents-teens': {
    title: 'Поддержка подростков',
    section: 'Семейная психология',
  },
  // Личная терапия и самореализация
  'personal-selfesteem-confidence': {
    title: 'Повышение самооценки и уверенности',
    section: 'Личная терапия и самооценка',
  },
  'personal-selfesteem-acceptance': {
    title: 'Принятие себя (женская энергия, телесность)',
    section: 'Личная терапия и самооценка',
  },
  'personal-selfesteem-body': {
    title: 'Работа с телом и самооценкой',
    section: 'Личная терапия и самооценка',
  },
  'personal-search-dontknow': {
    title: '«Я не знаю, чего хочу» (потеря ориентиров)',
    section: 'Личная терапия и поиск себя',
  },
  'personal-search-motivation': {
    title: 'Как найти мотивацию и дисциплину (апатия, выгорание)',
    section: 'Личная терапия и поиск себя',
  },
  'personal-search-procrastination': {
    title: 'Как собраться и начать действовать (прокрастинация)',
    section: 'Личная терапия и поиск себя',
  },
  'personal-emotions-anxiety': {
    title: 'Тревога и стресс',
    section: 'Личная терапия и эмоциональные состояния',
  },
  'personal-emotions-depression': {
    title: 'Депрессия',
    section: 'Личная терапия и эмоциональные состояния',
  },
  'personal-emotions-apathy': {
    title: 'Нет сил и энергии (апатия, упадок сил)',
    section: 'Личная терапия и эмоциональные состояния',
  },
  // РПП
  'rpp-anorexia': {
    title: 'Анорексия',
    section: 'Помощь при РПП',
  },
  'rpp-what-is': {
    title: 'Что такое РПП',
    section: 'Помощь при РПП',
  },
  'rpp-symptoms': {
    title: 'Симптомы РПП',
    section: 'Помощь при РПП',
  },
  'rpp-compulsive': {
    title: 'Компульсивное переедание',
    section: 'Помощь при РПП',
  },
  'rpp-emotional': {
    title: 'Эмоциональное заедание',
    section: 'Помощь при РПП',
  },
  'rpp-analysis': {
    title: 'Анализ пищевого поведения',
    section: 'Помощь при РПП',
  },
}

const slug = computed(() => String(route.params.slug || ''))
const topic = computed(() => TOPICS[slug.value])

function field(suffix, fallback) {
  return getValue(`topic.${slug.value}.${suffix}`, fallback)
}

function goToContact() {
  router
    .push({ name: 'home' })
    .then(() => {
      nextTick(() => {
        const el = document.getElementById('contact')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
    .catch(() => {})
}
</script>

<template>
  <SiteShell>
    <section class="hero" v-if="topic">
      <div class="container hero-inner">
        <div>
          <p class="hero-subtitle" style="margin-bottom: 8px">
            {{ topic.section }}
          </p>
          <h1 class="hero-title">
            {{ topic.title }}
          </h1>
          <p class="hero-subtitle">
            {{ field('description', 'ваш текст') }}
          </p>
          <div class="hero-cta-row" style="margin-top: 10px">
            <button
              class="btn-primary"
              @click="goToContact"
            >
              Записаться
            </button>
          </div>
        </div>
      </div>
    </section>

    <section
      v-if="topic"
      class="services"
    >
      <div class="container">
        <div class="services-grid">
          <div>
            <div class="section-header">
              <div class="section-kicker">
                <span>Описание запроса</span>
              </div>
              <h2 class="section-title">
                Как выглядит эта тема в жизни
              </h2>
              <p class="section-subtitle">
                {{ field('details', 'ваш текст') }}
              </p>
            </div>

            <div class="section-header" style="margin-top: 24px">
              <div class="section-kicker">
                <span>Как может помочь терапия</span>
              </div>
              <p class="section-subtitle">
                {{ field('help', 'ваш текст') }}
              </p>
            </div>
          </div>

          <aside>
            <div class="card">
              <div class="card-header">
                <div>
                  <div class="card-title">Формат и стоимость</div>
                </div>
              </div>
              <div class="card-text">
                {{ field('pricing', 'ваш текст') }}
              </div>
              <div class="card-footer">
                <button
                  class="card-btn-link"
                  @click="goToContact"
                >
                  Записаться
                </button>
              </div>
            </div>

            <div class="card" style="margin-top: 12px">
              <div class="card-header">
                <div>
                  <div class="card-title">Статьи по теме</div>
                </div>
              </div>
              <div class="card-text">
                {{ field('articles', 'ваш текст') }}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section
      v-else
      class="services"
    >
      <div class="container">
        <p class="section-subtitle">Тема не найдена.</p>
      </div>
    </section>
  </SiteShell>
</template>

