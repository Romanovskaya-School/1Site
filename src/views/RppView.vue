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
              <router-link to="/#contact" class="btn btn-primary">Записаться на консультацию →</router-link>
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

        <!-- Fullscreen Modal Test (Awwwards Style) -->
        <transition name="modal-fade" :duration="500">
          <div v-if="isModalOpen" class="fullscreen-modal awwwards-bg">
            <div class="modal-content awwwards-modal">
              
              <!-- Progress Line -->
              <div class="awwwards-progress-line" v-if="!showResult">
                <div class="awwwards-progress-fill" :style="{ width: ((currentQuestionIndex + 1) / tests[activeTestIndex].questions.length * 100) + '%' }"></div>
              </div>
              
              <button class="modal-close awwwards-close" @click="closeModal">✕</button>
              
              <div class="test-inner awwwards-inner" v-if="!showResult">
                <div class="awwwards-header">
                  <h3 class="awwwards-test-title">{{ tests[activeTestIndex].title }}</h3>
                  <div class="awwwards-counter">{{ String(currentQuestionIndex + 1).padStart(2, '0') }} <span class="dim">/ {{ String(tests[activeTestIndex].questions.length).padStart(2, '0') }}</span></div>
                </div>
                
                <transition name="slide-fade" mode="out-in">
                  <div class="test-question-card awwwards-card" :key="currentQuestionIndex">
                    <p class="question-text awwwards-q-text">{{ typeof tests[activeTestIndex].questions[currentQuestionIndex] === 'object' ? tests[activeTestIndex].questions[currentQuestionIndex].text : tests[activeTestIndex].questions[currentQuestionIndex] }}</p>
                    <div class="options-grid awwwards-options">
                      <button 
                         v-for="(opt, oIdx) in (tests[activeTestIndex].options || defaultOptions)" 
                         :key="oIdx"
                         class="custom-radio-btn awwwards-btn" 
                         :class="{ selected: answers[currentQuestionIndex] === oIdx, 'is-transitioning': isTransitioning }" 
                         :disabled="isTransitioning"
                         @click="handleAnswer(oIdx)">
                         {{ opt.text }}
                      </button>
                    </div>
                  </div>
                </transition>
              </div>

              <div class="test-inner" v-if="showResult" style="text-align: center; padding-top: 40px;">
                <h3 style="font-family: var(--font-head); font-size: 2rem; color: var(--text-dark); margin-bottom: 16px;">Результаты:</h3>
                
                <div v-if="Array.isArray(testText)" class="multi-scale-results" style="text-align: left; max-width: 600px; margin: 0 auto 40px;">
                  <div v-for="(res, idx) in testText" :key="idx" class="scale-result-card" style="background:var(--warm-white); padding:20px; border-radius:var(--radius-md); border:1px solid rgba(72,164,165,0.15); margin-bottom:16px;">
                    <h4 style="font-family:var(--font-head); font-size:1.2rem; color:var(--accent); margin-bottom:8px;">{{ res.name }}</h4>
                    <div style="font-size:0.9rem; color:var(--text-light); margin-bottom:12px;">Балл: {{ res.score }}</div>
                    <div class="result-text" v-html="res.text" style="font-size: 1rem; color: var(--text-mid); line-height: 1.5;"></div>
                  </div>
                  <div style="font-size:0.85rem; color:var(--text-light); margin-top:24px; text-align:center; padding-top:16px; border-top:1px solid rgba(0,0,0,0.05);">
                    Этот тест не является диагнозом и не заменяет консультацию специалиста. Он помогает увидеть ведущие паттерны пищевого поведения.
                  </div>
                </div>
                
                <p v-else style="font-size: 1.2rem; color: var(--text-mid); margin-bottom: 40px;" v-html="testText"></p>
                
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
import { useRouter } from 'vue-router'
import SiteContact from '../components/SiteContact.vue'
import { useSiteData } from '../composables/useSiteData'
import { useArticles } from '../composables/useArticles'

const router = useRouter()

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
const isTransitioning = ref(false)

const defaultOptions = [
  { text: 'Всегда', value: 5, reverseValue: 0 },
  { text: 'Очень часто', value: 4, reverseValue: 1 },
  { text: 'Часто', value: 3, reverseValue: 2 },
  { text: 'Иногда', value: 2, reverseValue: 3 },
  { text: 'Редко', value: 1, reverseValue: 4 },
  { text: 'Никогда', value: 0, reverseValue: 5 }
]

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

const handleAnswer = (idx) => {
  if (isTransitioning.value) return
  answers.value[currentQuestionIndex.value] = idx
  isTransitioning.value = true
  
  // 450ms wait for ripple/highlight animation before transitioning
  setTimeout(() => {
    isTransitioning.value = false
    nextQuestion()
  }, 450)
}

const calculateTest = () => {
    const test = tests.value[activeTestIndex.value];
    const testOptions = test.options || defaultOptions;
    
    if (test.scales && test.scales.length > 0) {
        let scaleResults = [];
        test.scales.forEach(scale => {
            let scaleScore = 0;
            // scale.range is [startIndex, endIndex] inclusive
            for (let i = scale.range[0]; i <= Math.min(scale.range[1], test.questions.length - 1); i++) {
                let ansIdx = Number(answers.value[i]);
                if (!isNaN(ansIdx) && ansIdx >= 0 && ansIdx < testOptions.length) {
                    let opt = testOptions[ansIdx];
                    let type = typeof test.questions[i] === 'object' ? (test.questions[i].type || 'normal') : 'normal';
                    
                    if (type === 'normal') {
                        scaleScore += opt.value;
                    } else if (type === 'reverse') {
                        scaleScore += opt.reverseValue;
                    }
                }
            }
            
            let finalScaleScore = scaleScore / (scale.divider || 1);
            
            const sortedResults = [...(scale.results || [])].sort((a, b) => a.max - b.max);
            const res = sortedResults.find(r => finalScaleScore <= r.max) || sortedResults[sortedResults.length - 1];
            
            scaleResults.push({
                name: scale.name,
                score: finalScaleScore.toFixed(1),
                text: res ? res.text : 'Результат не определен'
            });
        });
        
        isMaxResult.value = false;
        testText.value = scaleResults;
        showResult.value = true;
    } else {
        let score = 0;
        test.questions.forEach((q, index) => {
            let ansIdx = Number(answers.value[index]);
            if (!isNaN(ansIdx) && ansIdx >= 0 && ansIdx < testOptions.length) {
                let opt = testOptions[ansIdx];
                let type = typeof q === 'object' ? (q.type || 'normal') : 'normal';
                
                if (type === 'normal') {
                    score += opt.value;
                } else if (type === 'reverse') {
                    score += opt.reverseValue;
                }
            }
        });
        
        const testResults = test.results || [];
        const sortedResults = [...testResults].sort((a, b) => a.max - b.max);
        const result = sortedResults.find(r => score <= r.max) || sortedResults[sortedResults.length - 1];
        
        isMaxResult.value = (result && result.max === 999);
        testText.value = result ? result.text : 'Результат не определен';
        showResult.value = true;
    }
}

const scrollToContactAndClose = () => {
    closeModal()
    const target = document.querySelector('#contact')
    if (target) {
        const offset = 80
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
    } else {
        router.push('/#contact')
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

/* Fullscreen Modal Awwwards Style */
.fullscreen-modal.awwwards-bg {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
  background-size: 200% 200%;
  animation: gradientFlow 15s ease infinite;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.modal-content.awwwards-modal {
  width: 100%;
  height: 100%;
  max-width: 1200px;
  background: transparent;
  border: none;
  box-shadow: none;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Progress Line at absolute top */
.awwwards-progress-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.awwwards-progress-fill {
  height: 100%;
  background: var(--accent);
  transition: width 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.modal-close.awwwards-close {
  position: absolute;
  top: 40px;
  right: 40px;
  background: transparent;
  color: var(--text-dark);
  font-size: 2rem;
  font-weight: 300;
  width: 50px;
  height: 50px;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s ease;
  z-index: 100;
}

.modal-close.awwwards-close:hover {
  transform: rotate(90deg) scale(1.1);
  background: var(--text-dark);
  color: #fff;
  border-color: var(--text-dark);
}

.test-inner.awwwards-inner {
  padding: 80px 40px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.awwwards-header {
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.awwwards-counter {
  font-family: var(--font-head);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--accent);
}

.awwwards-counter .dim {
  color: var(--text-light);
  font-size: 1rem;
}

.awwwards-test-title {
  font-family: var(--font-body);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-mid);
}

.test-question-card.awwwards-card {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.question-text.awwwards-q-text {
  font-family: var(--font-head);
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--text-dark);
  line-height: 1.3;
  margin-bottom: 60px;
}

@media (max-width: 768px) {
  .question-text.awwwards-q-text {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }
  .awwwards-header {
    top: 20px;
    left: 20px;
  }
  .modal-close.awwwards-close {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
}

.options-grid.awwwards-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  width: 100%;
}

.custom-radio-btn.awwwards-btn {
  padding: 24px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: var(--radius-lg);
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0);
}

.custom-radio-btn.awwwards-btn:hover:not(:disabled) {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
}

.custom-radio-btn.awwwards-btn.selected {
  background: var(--accent);
  color: #fff;
  transform: scale(0.98);
  box-shadow: 0 10px 20px rgba(72, 164, 165, 0.3);
}

/* Slide Fade Transition for Questions */
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Modal Fade for Background */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
