<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero" id="home">
      <div class="blob blob-1" ref="blob1"></div>
      <div class="blob blob-2" ref="blob2"></div>

      <div class="container">
        <div class="hero-inner">
          <div class="hero-content reveal">
            <div class="hero-tag"><span>🌿</span> Онлайн-консультации</div>
            <h1 class="hero-title">Пространство для вашего<br><em>внутреннего роста</em></h1>
            <p class="hero-desc">Я — Виктория Терехова, психолог с нежным и профессиональным подходом. Помогаю справляться с тревожностью, выстраивать личные границы и находить путь к себе в спокойной, безопасной обстановке.</p>
            <div class="hero-actions">
              <router-link to="/#contact" class="btn btn-primary">Записаться на консультацию →</router-link>
              <router-link to="/#about" class="btn btn-outline">Узнать больше</router-link>
            </div>
            <div class="hero-stats">
              <div><div class="stat-num">7+</div><div class="stat-label">лет<br>опыта</div></div>
              <div><div class="stat-num">400+</div><div class="stat-label">довольных<br>клиентов</div></div>
              <div><div class="stat-num">100%</div><div class="stat-label">онлайн<br>формат</div></div>
            </div>
          </div>
          <div class="hero-visual reveal" style="transition-delay:0.2s">
            <div class="hero-photo-wrap">
              <div class="hero-photo-bg"></div>
              <img src="/images/hero.png" alt="Виктория Терехова — психолог" class="hero-photo" />
              <div class="hero-badge">
                <div class="badge-icon">🎓</div>
                <div class="badge-text"><strong>Сертифицированный</strong> психолог, КПТ и гештальт</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about" id="about">
      <div class="container">
        <div class="about-inner">
          <div class="about-image-wrap reveal">
            <img src="/images/hero.png" alt="Виктория Терехова" class="about-image-main" />
            <div class="about-cert"><strong>7+</strong> лет практики</div>
          </div>
          <div class="about-text reveal" style="transition-delay:0.15s">
            <p class="section-label">О психологе</p>
            <h2 class="section-title">Здравствуйте, я — Виктория</h2>
            <p class="about-body" style="margin-top:20px">Я верю, что каждый человек несёт в себе огромный ресурс и способность к исцелению. Моя задача — создать для вас безопасное пространство, где вы сможете открыто говорить, исследовать себя и двигаться вперёд в своём темпе.</p>
            <p class="about-body">Работаю в интегративном подходе, объединяя методы когнитивно-поведенческой терапии (КПТ) и гештальт-терапии.</p>
            <div class="about-qualities">
              <span class="quality-tag">🧠 КПТ-терапия</span>
              <span class="quality-tag">🌱 Гештальт</span>
              <span class="quality-tag">💬 Психосоматика</span>
              <span class="quality-tag">🤝 Семейные отношения</span>
              <span class="quality-tag">✨ Тревога и стресс</span>
              <span class="quality-tag">🏠 Личные границы</span>
            </div>
            <router-link to="/#contact" class="btn btn-primary">Записаться на первую встречу</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="services" id="services">
      <div class="container">
        <div class="services-head reveal">
          <p class="section-label">Услуги и стоимость</p>
          <h2 class="section-title">Чем я могу вам помочь</h2>
          <p class="section-subtitle">Все консультации проходят онлайн через Zoom или Telegram.</p>
        </div>
        <div class="services-grid">
          <ServiceCard icon="🌿" title="Разовая консультация" desc="Первый шаг к пониманию себя..." price="3 500 ₽" meta="/ 60 минут" :delay="0.05" />
          <ServiceCard icon="💫" title="Курс терапии (5 сессий)" desc="Глубокая работа с вашим запросом..." price="15 000 ₽" meta="/ пакет (экономия 20%)" :featured="true" :delay="0.1" />
          <ServiceCard icon="💌" title="Письменная терапия" desc="Переписка с психологом в удобном темпе..." price="2 500 ₽" meta="/ неделя переписки" :delay="0.15" />
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="how" id="how">
      <div class="container">
        <div class="how-head reveal">
          <p class="section-label">Как это работает</p>
          <h2 class="section-title">4 простых шага к началу</h2>
          <p class="section-subtitle">Начать работу с психологом проще, чем кажется. Я проведу вас через каждый этап.</p>
        </div>
        <div class="how-steps">
          <div class="how-step reveal" style="transition-delay:0.05s">
            <div class="step-num">1</div>
            <h4 class="step-title">Оставьте заявку</h4>
            <p class="step-desc">Заполните форму ниже или напишите мне напрямую в любом удобном мессенджере.</p>
          </div>
          <div class="how-step reveal" style="transition-delay:0.12s">
            <div class="step-num">2</div>
            <h4 class="step-title">Первый контакт</h4>
            <p class="step-desc">Я отвечу в течение дня, уточним детали и согласуем удобное для вас время встречи.</p>
          </div>
          <div class="how-step reveal" style="transition-delay:0.18s">
            <div class="step-num">3</div>
            <h4 class="step-title">Оплата</h4>
            <p class="step-desc">Оплата удобным способом: карта, переводом. Оплата за разовую сессию или пакет.</p>
          </div>
          <div class="how-step reveal" style="transition-delay:0.24s">
            <div class="step-num">4</div>
            <h4 class="step-title">Встреча онлайн</h4>
            <p class="step-desc">Встречаемся в Zoom или Telegram в удобное время. Никаких поездок, всё из дома.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ARTICLES PREVIEW -->
    <section class="articles-prev" id="articles">
      <div class="container">
        <div class="articles-head reveal">
          <div>
            <p class="section-label">Блог и статьи</p>
            <h2 class="section-title">Полезные материалы</h2>
          </div>
          <router-link to="/articles" class="btn btn-outline">Все статьи →</router-link>
        </div>
        <div class="articles-grid">
          <ArticleCard 
            v-for="(article, index) in recentArticles" 
            :key="article.id" 
            :article="article" 
            :delay="0.05 * (index + 1)" 
          />
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials" id="testimonials">
      <div class="container">
        <div class="testimonials-head reveal">
          <p class="section-label">Отзывы</p>
          <h2 class="section-title">Что говорят клиенты</h2>
        </div>
        <div class="testimonials-grid">
          <TestimonialCard 
            text="После нескольких месяцев работы с Викторией я наконец почувствовала, что понимаю себя. Тревога стала гораздо тише. Благодарна за безопасное пространство и искреннее внимание."
            name="Анна М."
            since="Клиент с 2024 года"
            avatar="А"
            :delay="0.05"
          />
          <TestimonialCard 
            text="Виктория помогла мне разобраться в запутанных отношениях с семьёй. Её подход очень тёплый и при этом профессиональный. Я научился говорить «нет» и не чувствовать себя виноватым."
            name="Сергей Р."
            since="Клиент с 2025 года"
            avatar="С"
            :delay="0.1"
          />
          <TestimonialCard 
            text="Онлайн-формат сначала казался необычным, но оказался очень удобным. Чувствуется, что Виктория по-настоящему слышит. Рекомендую всем, кто хочет понять себя лучше."
            name="Елена К."
            since="Клиент с 2025 года"
            avatar="Е"
            :delay="0.15"
          />
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section class="contact" id="contact">
      <div class="container">
        <div class="contact-inner">
          <div class="contact-info reveal">
            <p class="section-label">Записаться</p>
            <h2 class="section-title">Сделайте первый шаг</h2>
            <p class="section-subtitle">Готова ответить на ваши вопросы и помочь выбрать формат работы, который подойдёт именно вам.</p>
            <div class="contact-links">
              <a href="https://t.me/vikaterekhova" class="contact-link" target="_blank" rel="noopener">
                <span class="contact-link-icon">✈️</span>
                <div class="contact-link-text"><span>Telegram</span><strong>@vikaterekhova</strong></div>
              </a>
              <a href="https://wa.me/79001234567" class="contact-link" target="_blank" rel="noopener">
                <span class="contact-link-icon">📱</span>
                <div class="contact-link-text"><span>WhatsApp</span><strong>+7 900 123-45-67</strong></div>
              </a>
              <a href="mailto:vika@terekhova.ru" class="contact-link">
                <span class="contact-link-icon">📧</span>
                <div class="contact-link-text"><span>Email</span><strong>vika@terekhova.ru</strong></div>
              </a>
            </div>
          </div>
          <div class="reveal" style="transition-delay:0.15s">
            <form class="contact-form" @submit.prevent="handleSubmit">
              <h3 style="font-family:var(--font-head);font-size:1.4rem;color:var(--text-dark);margin-bottom:28px;">Оставить заявку</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Ваше имя</label>
                  <input type="text" id="name" v-model="form.name" placeholder="Алёна" required />
                </div>
                <div class="form-group">
                  <label for="phone">Телефон / Telegram</label>
                  <input type="text" id="phone" v-model="form.phone" placeholder="+7 900 000-00-00" required />
                </div>
              </div>
              <div class="form-group">
                <label for="service">Формат работы</label>
                <select id="service" v-model="form.service">
                  <option value="">Выберите формат</option>
                  <option value="single">Разовая консультация (3 500 ₽)</option>
                  <option value="package">Курс 5 сессий (15 000 ₽)</option>
                  <option value="written">Письменная терапия (2 500 ₽/нед)</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message">Расскажите немного о себе и запросе</label>
                <textarea id="message" v-model="form.message" placeholder="С чем вы хотели бы поработать?"></textarea>
              </div>
              <button type="submit" class="btn btn-primary form-submit" :disabled="formStatus === 'submitting'">
                {{ submitBtnText }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import ServiceCard from '../components/ServiceCard.vue';
import ArticleCard from '../components/ArticleCard.vue';
import TestimonialCard from '../components/TestimonialCard.vue';
import { getArticles } from '../utils/articles-data';

const blob1 = ref(null);
const blob2 = ref(null);
const articles = ref([]);
const recentArticles = computed(() => articles.value.slice(0, 3));

const form = ref({
  name: '',
  phone: '',
  service: '',
  message: ''
});
const formStatus = ref('idle');
const submitBtnText = computed(() => {
  if (formStatus.value === 'submitting') return 'Отправка...';
  if (formStatus.value === 'success') return '✓ Заявка отправлена!';
  return 'Отправить заявку →';
});

const handleSubmit = () => {
  formStatus.value = 'submitting';
  // Simulate API call
  setTimeout(() => {
    formStatus.value = 'success';
    setTimeout(() => {
        formStatus.value = 'idle';
        form.value = { name: '', phone: '', service: '', message: '' };
    }, 3500);
  }, 800);
};

const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  if (blob1.value) blob1.value.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  if (blob2.value) blob2.value.style.transform = `translate(${-x * 0.3}px, ${-y * 0.3}px)`;
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
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  revealObserver.disconnect();
});
</script>
