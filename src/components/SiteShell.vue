<script setup>
import { onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useContent } from '@/composables/useContent'

const router = useRouter()
const defaultFooterText1 =
  '© <span id="year"></span> Психолог Терёхина Виктория. Все права защищены.'

const { getValue, getHtml, loadContent } = useContent()

function setYear() {
  const yearEl = document.getElementById('year')
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString()
  }
}

async function ensureContentLoaded() {
  await loadContent()
  await nextTick()
  setYear()
}

function scrollToAnchorOnHome(anchorId) {
  router
    .push({ name: 'home' })
    .then(() => {
      nextTick(() => {
        const el = document.getElementById(anchorId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
    .catch(() => {})
}

onMounted(() => {
  setYear()
  ensureContentLoaded()
})
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="container header-inner">
        <div
          class="logo"
          @click="scrollToAnchorOnHome('')"
          style="cursor: pointer"
        >
          <div class="logo-mark" />
          <div>
            <div class="logo-text-main">
              {{ getValue('logo.main', 'Виктория Терёхина') }}
            </div>
            <div class="logo-text-sub">
              {{ getValue('logo.sub', 'интегративный семейный психолог') }}
            </div>
          </div>
        </div>
        <nav class="nav">
          <a
            href="#about"
            @click.prevent="scrollToAnchorOnHome('about')"
          >
            {{ getValue('nav.about', 'Обо мне') }}
          </a>
          <a
            href="#services"
            @click.prevent="scrollToAnchorOnHome('services')"
          >
            {{ getValue('nav.services', 'Есть ли у вас РПП?') }}
          </a>
          <a
            href="#articles"
            @click.prevent="scrollToAnchorOnHome('articles')"
          >
            {{ getValue('nav.articles', 'Статьи') }}
          </a>
          <a
            href="#contact"
            @click.prevent="scrollToAnchorOnHome('contact')"
          >
            {{ getValue('nav.contact', 'Контакты') }}
          </a>
          <button
            class="nav-cta"
            @click="scrollToAnchorOnHome('contact')"
            v-html="getHtml('nav.cta', 'Записаться <span>→</span>')"
          ></button>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-legal">
          <span
            v-html="getHtml('footer.text1', defaultFooterText1)"
          ></span>
          <span>
            {{
              getValue(
                'footer.text2',
                'Онлайн‑консультации. Индивидуальная и семейная психология.'
              )
            }}
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

