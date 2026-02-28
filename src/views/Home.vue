<template>
  <div class="app">
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container header-content">
        <div class="logo">
          <span class="logo-name">{{ data.name }}</span>
        </div>
        <nav class="nav">
          <a href="#about" class="nav-link">О психологе</a>
          <a href="#services" class="nav-link">Услуги</a>
          <a href="#pricing" class="nav-link">Стоимость</a>
          <a href="#contacts" class="nav-link">Контакты</a>
        </nav>
        <a href="#contacts" class="btn btn-primary">Записаться</a>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container hero-content">
          <h1 class="hero-title">{{ data.heroTitle }}</h1>
          <p class="hero-subtitle">{{ data.heroSubtitle }}</p>
          <a href="#contacts" class="btn btn-primary btn-large">Записаться на консультацию</a>
        </div>
        <div class="hero-decoration"></div>
      </section>

      <section id="about" class="section about">
        <div class="container">
          <h2 class="section-title">О психологе</h2>
          <div class="about-content">
            <div class="about-text">
              <p>{{ data.aboutText }}</p>
              <p>{{ data.aboutText2 }}</p>
            </div>
            <div class="about-info">
              <div class="info-item">
                <span class="info-label">Специализация</span>
                <span class="info-value">{{ data.specialization }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Опыт работы</span>
                <span class="info-value">{{ data.experience }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Образование</span>
                <span class="info-value">{{ data.education }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" class="section services">
        <div class="container">
          <h2 class="section-title">Услуги</h2>
          <p class="section-subtitle">Индивидуальные онлайн-терапевтические услуги и программы для вашего благополучия</p>
          <div class="services-grid">
            <div v-for="(service, index) in data.services" :key="index" class="service-card">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <span class="service-price">{{ service.price }}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" class="section pricing">
        <div class="container">
          <h2 class="section-title">Стоимость консультаций</h2>
          <div class="pricing-grid">
            <div v-for="(price, index) in data.pricing" :key="index" class="pricing-card">
              <h3 class="pricing-title">{{ price.title }}</h3>
              <p class="pricing-duration">{{ price.duration }}</p>
              <p class="pricing-description">{{ price.description }}</p>
              <span class="pricing-price">{{ price.price }}</span>
              <a href="#contacts" class="btn btn-outline">Записаться</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" class="section contacts">
        <div class="container">
          <h2 class="section-title">Контакты</h2>
          <p class="section-subtitle">Свяжитесь со мной для записи на консультацию</p>
          <div class="contacts-wrapper">
            <div class="contacts-info">
              <a :href="'tel:' + data.phone" class="contact-link">
                <span class="contact-icon">📞</span>
                {{ data.phone }}
              </a>
              <a :href="'mailto:' + data.email" class="contact-link">
                <span class="contact-icon">✉️</span>
                {{ data.email }}
              </a>
            </div>
            <form class="contact-form" @submit.prevent="submitForm">
              <input v-model="formData.name" type="text" placeholder="Ваше имя" required class="form-input">
              <input v-model="formData.email" type="email" placeholder="Ваш email" required class="form-input">
              <textarea v-model="formData.message" placeholder="Ваше сообщение" rows="4" class="form-input"></textarea>
              <button type="submit" class="btn btn-primary">Отправить заявку</button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} {{ data.name }}. Все права защищены.</p>
        <a href="/admin" class="admin-link">Админ-панель</a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'

const isScrolled = ref(false)
const formData = reactive({ name: '', email: '', message: '' })

const defaultData = {
  name: 'Виктория Терехова',
  heroTitle: 'Интегративный семейный психолог',
  heroSubtitle: 'Помогаю найти гармонию в отношениях с собой и близкими',
  aboutText: 'Я помогаю людям справиться с трудностями в отношениях, разобраться в себе и найти путь к гармоничной жизни. Работаю с расстройствами пищевого поведения, семейными конфликтами и личностными кризисами.',
  aboutText2: 'Мой подход — мягкая и бережная работа с каждым клиентом, без давления и осуждения.',
  specialization: 'Интегративная семейная психология',
  experience: 'Более 10 лет',
  education: 'МГУ им. Ломоносова, психологический факультет',
  phone: '+7 (985) 400-30-00',
  email: 'ddvv2009@gmail.com',
  services: [
    { title: 'Индивидуальная консультация', description: 'Работа с личными запросами, РПП, тревожностью', price: '4000 ₽ / 60 мин' },
    { title: 'Семейная терапия', description: 'Работа с семейными конфликтами и отношениями', price: '6000 ₽ / 90 мин' },
    { title: 'Парная консультация', description: 'Работа с отношениями в паре', price: '5000 ₽ / 60 мин' }
  ],
  pricing: [
    { title: 'Первичная консультация', duration: '120 минут', description: 'Знакомство, диагностика, составление плана работы', price: '8000 ₽' },
    { title: 'Разовая консультация', duration: '60 минут', description: 'Работа с текущим запросом', price: '4000 ₽' },
    { title: 'Блок 5 консультаций', duration: '5 × 60 минут', description: 'Комплексная работа над запросом', price: '18000 ₽' }
  ],
  messages: []
}

const data = ref({ ...defaultData })

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })

  const saved = localStorage.getItem('psychologistData')
  if (saved) {
    try {
      data.value = { ...defaultData, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Ошибка загрузки данных:', e)
    }
  } else {
    localStorage.setItem('psychologistData', JSON.stringify(defaultData))
  }
})

const submitForm = () => {
  const messages = JSON.parse(localStorage.getItem('psychologistMessages') || '[]')
  messages.push({ ...formData, timestamp: Date.now() })
  localStorage.setItem('psychologistMessages', JSON.stringify(messages))
  alert('Спасибо! Ваша заявка отправлена. Я свяжусь с вами в ближайшее время.')
  formData.name = ''
  formData.email = ''
  formData.message = ''
}
</script>

<style>
:root {
  --color-primary: #8FB3A3;
  --color-primary-dark: #7A9E8C;
  --color-secondary: #D4C1EC;
  --color-accent: #F5D5CB;
  --color-bg: #FDF8F5;
  --color-bg-light: #FFFFFF;
  --color-text: #4A4A4A;
  --color-text-light: #7A7A7A;
  --color-white: #FFFFFF;
  --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-hover: 0 8px 30px rgba(0, 0, 0, 0.1);
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app {
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(253, 248, 245, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-soft);
  padding: 15px 0;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.nav {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--color-primary);
}

.btn {
  display: inline-block;
  padding: 12px 28px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
}

.btn-large {
  padding: 16px 36px;
  font-size: 1.1rem;
}

.btn-outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}

.btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, var(--color-bg) 0%, #F0EDE9 100%);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 500;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--color-text-light);
  margin-bottom: 40px;
}

.hero-decoration {
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, var(--color-secondary) 0%, transparent 70%);
  opacity: 0.5;
}

.section {
  padding: 100px 0;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
  color: var(--color-text);
}

.section-subtitle {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: 60px;
  font-size: 1.1rem;
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-text p {
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.about-info {
  background: var(--color-white);
  padding: 30px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}

.info-item {
  margin-bottom: 20px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 5px;
}

.info-value {
  font-weight: 500;
  color: var(--color-text);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.service-card {
  background: var(--color-white);
  padding: 35px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  transition: all 0.3s ease;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.service-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--color-text);
}

.service-description {
  color: var(--color-text-light);
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.service-price {
  display: block;
  font-weight: 600;
  color: var(--color-primary-dark);
  font-size: 1.1rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.pricing-card {
  background: var(--color-white);
  padding: 40px 30px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.pricing-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.pricing-duration {
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 15px;
}

.pricing-description {
  color: var(--color-text-light);
  margin-bottom: 20px;
  font-size: 0.9rem;
}

.pricing-price {
  display: block;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 25px;
}

.contacts-wrapper {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
}

.contacts-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 15px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.contact-link:hover {
  color: var(--color-primary);
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input {
  padding: 16px 20px;
  border: 1px solid #E0DDD8;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  background: var(--color-white);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.footer {
  background: var(--color-white);
  padding: 30px 0;
  text-align: center;
  color: var(--color-text-light);
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-link {
  color: var(--color-text-light);
  text-decoration: none;
  font-size: 0.9rem;
}

.admin-link:hover {
  color: var(--color-primary);
}

@media (max-width: 968px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .services-grid,
  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .about-content,
  .contacts-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .nav {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
