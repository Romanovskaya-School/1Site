<template>
  <div>
    <!-- HERO -->
    <section class="hero" id="home">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>

      <div class="container">
        <div class="hero-inner">
          <div class="hero-content reveal">
            <div class="hero-tag">
              <span>🍰</span> Психологическая помощь
            </div>
            <h1 class="hero-title">
              Бережная помощь при <em>РПП</em>
            </h1>
            <p class="hero-desc">
              Еда стала источником тревоги? Вы не одиноки. Помогу вернуть здоровые отношения с едой и телом.
            </p>
            <div class="hero-actions">
              <a href="#contact" class="btn btn-primary">Записаться на консультацию →</a>
              <a href="#rpp-test" class="btn btn-outline">Тест: «Есть ли у меня РПП?»</a>
            </div>
          </div>

          <div class="hero-visual reveal" style="transition-delay:0.2s">
            <div class="hero-photo-wrap">
              <div class="hero-photo-bg" style="background: linear-gradient(135deg, var(--mauve), var(--rose));"></div>
              <div class="photo-placeholder" style="aspect-ratio: 3/4; border-radius: var(--radius-lg); position: relative; z-index: 1;">
                <span>Место для фото</span>
              </div>
              <div class="hero-badge">
                <div class="badge-icon">🌿</div>
                <div class="badge-text">
                  <strong>Специалист по РПП</strong>
                  бережный подход
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT IS RPP -->
    <section class="rpp-info" id="rpp-info">
      <div class="container">
        <div class="about-inner">
          <div class="about-text reveal">
            <p class="section-label">О расстройстве</p>
            <h2 class="section-title">Что такое РПП?</h2>
            <p class="about-body" style="margin-top:20px">
              РПП — не причуда и не слабость. Это состояние, когда мысли о еде и весе начинают контролировать жизнь.
            </p>
            <p class="about-body">
              За любым проявлением стоит эмоциональная боль, с которой можно и нужно работать.
            </p>
          </div>
          <div class="about-image-wrap reveal" style="transition-delay:0.15s">
            <div style="background: var(--blush); padding: 40px; border-radius: var(--radius-lg); border: 2px solid var(--rose);">
              <h3 style="font-family: var(--font-head); margin-bottom: 20px; color: var(--text-dark);">Важно помнить:</h3>
              <ul style="display: flex; flex-direction: column; gap: 15px;">
                <li style="display: flex; gap: 12px; align-items: flex-start;">
                  <span style="font-size: 1.2rem;">✨</span>
                  <p style="font-size: 0.95rem; color: var(--text-mid);">РПП — это не ваш выбор и не ваша вина</p>
                </li>
                <li style="display: flex; gap: 12px; align-items: flex-start;">
                  <span style="font-size: 1.2rem;">✨</span>
                  <p style="font-size: 0.95rem; color: var(--text-mid);">Это поддается лечению в любом возрасте</p>
                </li>
                <li style="display: flex; gap: 12px; align-items: flex-start;">
                  <span style="font-size: 1.2rem;">✨</span>
                  <p style="font-size: 0.95rem; color: var(--text-mid);">Помощь доступна, и первый шаг можно сделать сегодня</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RPP TEST -->
    <section class="rpp-test" id="rpp-test" style="padding: 80px 0;">
      <div class="container" style="max-width: 800px;">
        <div class="services-head reveal">
          <p class="section-label">Самодиагностика</p>
          <h2 class="section-title">Есть ли у меня...?</h2>
        </div>

        <!-- Catalog Grid -->
        <div class="test-catalog-grid reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 40px;">
          <div v-for="(t, idx) in tests" :key="idx" 
               class="test-card" 
               :class="{ active: activeTestIndex === idx }"
               @click="selectTest(idx)"
               style="padding: 24px; border-radius: 16px; background: var(--warm-white); border: 1px solid var(--border); cursor: pointer; transition: all 0.3s ease;">
            <h3 style="font-size: 1.1rem; color: var(--text-dark); margin-bottom: 8px;">{{ t.title }}</h3>
            <p style="font-size: 0.85rem; color: var(--text-light);">{{ t.questions.length }} вопросов</p>
          </div>
        </div>

        <!-- Fullscreen Modal Test -->
        <transition name="modal-fade">
          <div v-if="isModalOpen" class="fullscreen-modal">
            <div class="modal-content">
              <button class="modal-close" @click="closeModal">✕</button>
              
              <div class="test-inner" v-if="!showResult">
                <div class="test-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: ((currentQuestionIndex + 1) / tests[activeTestIndex].questions.length * 100) + '%' }"></div>
                  </div>
                  <div class="progress-text">Вопрос {{ currentQuestionIndex + 1 }} из {{ tests[activeTestIndex].questions.length }}</div>
                </div>

                <h3 class="modal-test-title">{{ tests[activeTestIndex].title }}</h3>
                
                <div class="test-question-card">
                  <p class="question-text">{{ typeof tests[activeTestIndex].questions[currentQuestionIndex] === 'object' ? tests[activeTestIndex].questions[currentQuestionIndex].text : tests[activeTestIndex].questions[currentQuestionIndex] }}</p>
                  <div class="options-grid">
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '5' }" @click="answers[currentQuestionIndex] = '5'">Всегда</button>
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '4' }" @click="answers[currentQuestionIndex] = '4'">Очень часто</button>
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '3' }" @click="answers[currentQuestionIndex] = '3'">Часто</button>
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '2' }" @click="answers[currentQuestionIndex] = '2'">Иногда</button>
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '1' }" @click="answers[currentQuestionIndex] = '1'">Редко</button>
                    <button class="custom-radio-btn" :class="{ selected: answers[currentQuestionIndex] === '0' }" @click="answers[currentQuestionIndex] = '0'">Никогда</button>
                  </div>
                </div>

                <div class="modal-footer-actions">
                  <button class="btn btn-primary" :disabled="answers[currentQuestionIndex] === null" :class="{ 'btn-blurred': answers[currentQuestionIndex] === null }" @click="nextQuestion">
                    {{ currentQuestionIndex === tests[activeTestIndex].questions.length - 1 ? 'Узнать результат' : 'Далее →' }}
                  </button>
                </div>
              </div>

              <div class="test-inner" v-if="showResult" style="text-align: center; padding-top: 40px;">
                <h3 style="font-family: var(--font-head); font-size: 2rem; color: var(--text-dark); margin-bottom: 16px;">Результат:</h3>
                <p style="font-size: 1.2rem; color: var(--text-mid); margin-bottom: 40px;" v-html="testText"></p>
                <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                  <button v-if="isMaxResult" class="btn btn-primary" @click="scrollToContactAndClose">Записаться на консультацию</button>
                  <button class="btn btn-outline" @click="closeModal">Вернуться к тестам</button>
                </div>
              </div>

            </div>
          </div>
        </transition>

      </div>
    </section>

    <SiteContact />

    <!-- ARTICLES -->
    <section class="articles-prev" id="articles">
      <div class="container">
        <div class="articles-head reveal">
          <div>
            <p class="section-label">Полезно почитать</p>
            <h2 class="section-title">Статьи об РПП</h2>
          </div>
          <router-link to="/articles" class="btn btn-outline btn-sm">Все статьи</router-link>
        </div>
        <div class="articles-grid">
           <div v-for="(a, i) in rppArticles" :key="a.id" class="article-card reveal" @click="$router.push('/articles?read='+a.id)" :style="{ 'transition-delay': (i * 0.05) + 's', cursor: 'pointer' }">
             <div class="article-body">
                <span class="article-cat">{{ a.category }}</span>
                <h3 class="article-title">{{ a.title }}</h3>
                <p class="article-excerpt">{{ (a.excerpt || '').slice(0, 100) + '...' }}</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SiteContact from '../components/SiteContact.vue'
import { useSiteData } from '../composables/useSiteData'
import { useArticles } from '../composables/useArticles'

const { articles } = useArticles()
const { siteData } = useSiteData()

const rppArticles = computed(() => {
  return articles.value.slice(0, 3)
})

const tests = computed(() => siteData.tests || [])

const activeTestIndex = ref(0)
const answers = ref(new Array(siteData.tests[0]?.questions.length || 0).fill(null))
const showResult = ref(false)
const testText = ref('')
const isModalOpen = ref(false)
const currentQuestionIndex = ref(0)
const isMaxResult = ref(false)

const selectTest = (index) => {
  activeTestIndex.value = index
  answers.value = new Array(tests.value[index].questions.length).fill(null)
  currentQuestionIndex.value = 0
  showResult.value = false
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = ''
}

const nextQuestion = () => {
  if (answers.value[currentQuestionIndex.value] === null) return
  if (currentQuestionIndex.value < tests.value[activeTestIndex.value].questions.length - 1) {
    currentQuestionIndex.value++
  } else {
    calculateTest()
  }
}

const calculateTest = () => {
    let score = 0;
    const test = tests.value[activeTestIndex.value];
    
    test.questions.forEach((q, index) => {
        let answer = Number(answers.value[index]);
        if (isNaN(answer)) answer = 0;
        
        let type = typeof q === 'object' ? (q.type || 'normal') : 'normal';
        
        if (type === 'normal') {
            score += answer;
        } else if (type === 'reverse') {
            // Assuming 0-5 scale, reverse is 5 - answer
            score += (5 - answer);
        } else if (type === 'ignore') {
            // Do nothing
        }
    });
    
    const testResults = test.results || [];
    
    // Results should be sorted by max. Find the first result where score <= max
    const sortedResults = [...testResults].sort((a, b) => a.max - b.max);
    const result = sortedResults.find(r => score <= r.max) || sortedResults[sortedResults.length - 1];
    
    testText.value = result ? result.text : `Ваш балл: ${score}`;
    
    // Check if it's the maximum threshold
    isMaxResult.value = sortedResults.length > 1 && score > sortedResults[0].max;

    showResult.value = true;
}

const scrollToContactAndClose = () => {
    closeModal()
    const target = document.querySelector('#contact')
    if (target) {
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
    }
}

watch(isModalOpen, (val) => {
  if (!val) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.test-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-color: var(--rose) !important;
}
.test-card.active {
  background: var(--blush) !important;
  border-color: var(--rose) !important;
  box-shadow: 0 10px 20px rgba(163, 201, 202, 0.25);
}

/* Fullscreen Modal */
.fullscreen-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
}

.modal-content {
  background: var(--warm-white);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 64px var(--shadow);
  width: 100%;
  max-width: 800px;
  position: relative;
  min-height: 500px;
  display: flex;
  flex-direction: column;
}

.modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: var(--blush);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  color: var(--text-mid);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: var(--rose);
  color: var(--text-dark);
  transform: rotate(90deg);
}

.test-inner {
  padding: 60px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.test-progress {
  margin-bottom: 32px;
}

.progress-bar {
  height: 6px;
  background: var(--blush);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.4s ease;
}

.progress-text {
  font-size: 0.85rem;
  color: var(--text-light);
  text-align: right;
}

.modal-test-title {
  font-family: var(--font-head);
  font-size: 1.5rem;
  color: var(--text-mid);
  margin-bottom: 40px;
  text-align: center;
}

.test-question-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.question-text {
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-dark);
  margin-bottom: 40px;
  line-height: 1.4;
  text-align: center;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  max-width: 500px;
  margin: 0 auto 40px;
  width: 100%;
}

@media (max-width: 600px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
}

.custom-radio-btn {
  padding: 16px 24px;
  border: 2px solid var(--blush);
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-mid);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
  text-align: center;
}

.custom-radio-btn:hover {
  border-color: var(--rose);
  background: var(--cream);
}

.custom-radio-btn.selected {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(72, 164, 165, 0.3);
  transform: translateY(-2px);
}

.modal-footer-actions {
  text-align: center;
  margin-top: auto;
}

.modal-footer-actions .btn {
  min-width: 240px;
  justify-content: center;
  padding: 16px 32px;
  font-size: 1.1rem;
}

.btn-blurred {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
</style>
