<template>
  <div>
    <!-- HERO -->
    <section class="about-hero">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="container">
        <div class="about-hero-inner">
          <div class="about-hero-text reveal">
            <p class="section-label">О психологе</p>
            <h1 class="hero-title">{{ siteData.aboutTitle || 'Виктория Терехова' }}</h1>
            <p class="hero-desc">{{ siteData.aboutP1 }}</p>
            <div class="about-qualities" style="margin-top: 28px;">
              <span class="quality-tag">🧠 КПТ-терапия</span>
              <span class="quality-tag">🌱 Гештальт</span>
              <span class="quality-tag">💬 Психосоматика</span>
              <span class="quality-tag">🤝 Отношения</span>
              <span class="quality-tag">✨ Тревога</span>
              <span class="quality-tag">🏠 Границы</span>
            </div>
            <div style="margin-top: 36px; display: flex; gap: 16px; flex-wrap: wrap;">
              <router-link to="/#contact" class="btn btn-primary">Записаться →</router-link>
              <a href="#principles" class="btn btn-outline">Мои принципы</a>
            </div>
          </div>
          <div class="about-hero-photo reveal" style="transition-delay: 0.2s;">
            <div class="hero-photo-wrap">
              <div class="hero-photo-bg"></div>
              <div class="photo-placeholder" style="aspect-ratio: 3/4; border-radius: var(--radius-lg); position: relative; z-index: 1;">
                <span>Место для фото</span>
              </div>
              <div class="hero-badge">
                <div class="badge-icon">🎓</div>
                <div class="badge-text">
                  <strong>7+ лет практики</strong>
                  400+ клиентов
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="about-stats-section">
      <div class="container">
        <div class="about-stats-grid">
          <div class="about-stat-card reveal">
            <div class="about-stat-num">7+</div>
            <div class="about-stat-label">лет практики</div>
          </div>
          <div class="about-stat-card reveal" style="transition-delay:0.1s">
            <div class="about-stat-num">400+</div>
            <div class="about-stat-label">клиентов</div>
          </div>
          <div class="about-stat-card reveal" style="transition-delay:0.2s">
            <div class="about-stat-num">3</div>
            <div class="about-stat-label">направления</div>
          </div>
          <div class="about-stat-card reveal" style="transition-delay:0.3s">
            <div class="about-stat-num">100%</div>
            <div class="about-stat-label">онлайн</div>
          </div>
        </div>
      </div>
    </section>

    <!-- PRINCIPLES -->
    <section class="about-principles" id="principles" style="background: var(--warm-white);">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Как я работаю</p>
          <h2 class="section-title">Мои принципы</h2>
        </div>
        <div class="principles-grid">
          <div class="principle-card reveal">
            <div class="principle-icon">🔒</div>
            <h3>Конфиденциальность</h3>
            <p>Всё, что мы обсуждаем, остаётся только между нами.</p>
          </div>
          <div class="principle-card reveal" style="transition-delay:0.1s">
            <div class="principle-icon">🌿</div>
            <h3>Бережность</h3>
            <p>Принимаю вас без условий, оценок и осуждения.</p>
          </div>
          <div class="principle-card reveal" style="transition-delay:0.2s">
            <div class="principle-icon">🔬</div>
            <h3>Доказательный подход</h3>
            <p>Использую только методы с подтверждённой эффективностью.</p>
          </div>
          <div class="principle-card reveal" style="transition-delay:0.3s">
            <div class="principle-icon">⚡</div>
            <h3>Результат</h3>
            <p>Двигаемся к конкретным изменениям в вашей жизни.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DIPLOMAS -->
    <section class="about-diplomas-section" style="padding: 80px 0;">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Образование</p>
          <h2 class="section-title">Дипломы и сертификаты</h2>
        </div>
        <div class="diplomas-grid">
          <div class="diploma-card-new reveal">
            <div class="photo-placeholder diploma-placeholder"><span>Диплом 1</span></div>
            <p>Высшее профильное образование</p>
          </div>
          <div class="diploma-card-new reveal" style="transition-delay:0.1s">
            <div class="photo-placeholder diploma-placeholder"><span>Диплом 2</span></div>
            <p>Специализация КПТ</p>
          </div>
          <div class="diploma-card-new reveal" style="transition-delay:0.2s">
            <div class="photo-placeholder diploma-placeholder"><span>Диплом 3</span></div>
            <p>Специализация Гештальт</p>
          </div>
        </div>
      </div>
    </section>

    <SiteContact />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSiteData } from '../composables/useSiteData'
import SiteContact from '../components/SiteContact.vue'

const { siteData } = useSiteData()

onMounted(() => {
  // Reveal logic handled by App.vue
})
</script>

<style scoped>
/* Hero */
.about-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse 80% 60% at 70% 40%, rgba(232, 196, 186, 0.35) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 10% 80%, rgba(200, 213, 192, 0.25) 0%, transparent 60%),
    var(--cream);
}

.about-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-hero-photo {
  display: flex;
  justify-content: center;
}

/* Stats */
.about-stats-section {
  padding: 60px 0;
  background: var(--blush);
}

.about-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
}

.about-stat-card {
  padding: 32px 20px;
  background: rgba(255,255,255,0.6);
  border-radius: 16px;
  border: 1px solid rgba(72, 164, 165, 0.15);
  backdrop-filter: blur(8px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.about-stat-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(72, 164, 165, 0.15);
}

.about-stat-num {
  font-family: var(--font-head);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 8px;
}

.about-stat-label {
  font-size: 0.85rem;
  color: var(--text-mid);
}

/* Principles */
.about-principles {
  padding: 100px 0;
}

.principles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 52px;
}

.principle-card {
  background: var(--cream);
  border: 1px solid rgba(72, 164, 165, 0.15);
  border-radius: 20px;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.35s ease;
  position: relative;
  overflow: hidden;
}

.principle-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--rose), var(--accent));
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.principle-card:hover::before {
  transform: scaleX(1);
}

.principle-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(72, 164, 165, 0.15);
  border-color: var(--rose);
}

.principle-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.principle-card h3 {
  font-family: var(--font-head);
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 10px;
}

.principle-card p {
  font-size: 0.88rem;
  color: var(--text-mid);
  line-height: 1.65;
}

/* Diplomas */
.about-diplomas-section {
  background: var(--warm-white);
}

.diplomas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin-top: 52px;
}

.diploma-card-new {
  text-align: center;
  transition: transform 0.35s ease;
}

.diploma-card-new:hover {
  transform: translateY(-6px);
}

.diploma-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  margin-bottom: 16px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(72, 164, 165, 0.1);
}

.diploma-card-new p {
  font-weight: 500;
  color: var(--text-dark);
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .about-hero-inner {
    grid-template-columns: 1fr;
  }
  .about-hero-photo { display: none; }
  .about-stats-grid { grid-template-columns: repeat(2, 1fr); }
  .principles-grid { grid-template-columns: repeat(2, 1fr); }
  .diplomas-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 600px) {
  .about-stats-grid { grid-template-columns: 1fr 1fr; }
  .principles-grid { grid-template-columns: 1fr; }
  .diplomas-grid { grid-template-columns: 1fr; }
}
</style>
