<template>
  <div class="page-view">
    <!-- HERO -->
    <section class="hero">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="container">
        <div class="hero-inner" style="grid-template-columns: 1fr; text-align: center; justify-items: center;">
          <div class="hero-content reveal" style="max-width: 800px; padding: 0;">
            <div class="hero-tag">
              <span>🌱</span> Личная терапия
            </div>
            <h1 class="hero-title">
              Путь к <em>себе</em> и гармонии
            </h1>
            <p class="hero-desc" style="margin-left: auto; margin-right: auto;">
              Безопасное пространство, чтобы быть собой, разобраться в чувствах и найти опору внутри.
            </p>
            <div class="hero-actions" style="justify-content: center;">
              <router-link to="/#contact" class="btn btn-primary">Записаться на консультацию →</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INFO & DROPDOWN -->
    <section class="therapy-info" style="padding: 60px 0;">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Полезные материалы</p>
          <h2 class="section-title">Статьи по темам</h2>
          <div class="article-blocks-grid" style="margin-top: 40px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
            <router-link to="/articles" class="article-topic-card" style="display: block; padding: 32px 24px; border-radius: 16px; background: var(--warm-white); border: 1px solid var(--border); text-decoration: none; transition: all 0.3s ease;">
              <h3 style="font-size: 1.2rem; color: var(--text-dark); margin-bottom: 12px;">Самооценка и самоценность</h3>
              <span style="color: var(--accent); font-weight: 500; font-size: 0.9rem;">Читать статьи →</span>
            </router-link>
            <router-link to="/articles" class="article-topic-card" style="display: block; padding: 32px 24px; border-radius: 16px; background: var(--warm-white); border: 1px solid var(--border); text-decoration: none; transition: all 0.3s ease;">
              <h3 style="font-size: 1.2rem; color: var(--text-dark); margin-bottom: 12px;">Поиск себя и мотивации</h3>
              <span style="color: var(--accent); font-weight: 500; font-size: 0.9rem;">Читать статьи →</span>
            </router-link>
            <router-link to="/articles" class="article-topic-card" style="display: block; padding: 32px 24px; border-radius: 16px; background: var(--warm-white); border: 1px solid var(--border); text-decoration: none; transition: all 0.3s ease;">
              <h3 style="font-size: 1.2rem; color: var(--text-dark); margin-bottom: 12px;">Эмоциональное состояние и тревога</h3>
              <span style="color: var(--accent); font-weight: 500; font-size: 0.9rem;">Читать статьи →</span>
            </router-link>
          </div>
        </div>

        <div class="info-grid reveal" style="margin-top: 60px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          <div>
            <h3>Для чего нужна личная терапия?</h3>
            <ul style="margin-top: 20px; list-style: disc; margin-left: 20px; line-height: 1.6; color: var(--text-mid);">
              <li>Выстроить границы и говорить «нет»</li>
              <li>Справиться с тревогой или выгоранием</li>
              <li>Найти свои цели и желания</li>
              <li>Пройти через кризис или потерю</li>
            </ul>
          </div>
          <div>
            <h3>Как проходят консультации?</h3>
            <p style="margin-top: 20px; line-height: 1.6; color: var(--text-mid);">
              Онлайн, 50 минут. Методы КПТ и гештальт. Начнём с диагностической встречи — без давления.
            </p>
          </div>
        </div>
      </div>
    </section>

    <SiteContact />
  </div>
</template>

<script setup>
import SiteContact from '../components/SiteContact.vue'
</script>

<style scoped>
.page-view {
}
.therapy-info h3 {
  font-size: 1.5rem;
  color: var(--text-dark);
}
.article-topic-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(72, 164, 165, 0.15);
  border-color: var(--rose) !important;
}
</style>
