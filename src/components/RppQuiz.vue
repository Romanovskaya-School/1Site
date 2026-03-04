<script setup>
import { ref, computed } from 'vue'
import { useContent } from '@/composables/useContent'

const { getValue } = useContent()

const DEFAULT_THRESHOLD = 3

const threshold = computed(() => {
  const raw = getValue('rppQuiz.threshold', String(DEFAULT_THRESHOLD))
  const num = parseInt(String(raw), 10)
  if (!Number.isFinite(num) || num <= 0) return DEFAULT_THRESHOLD
  return num
})

const questions = computed(() => [
  getValue(
    'rppQuiz.q1',
    'Вы часто думаете о еде, калориях или весе в течение дня?'
  ),
  getValue(
    'rppQuiz.q2',
    'Вы едите больше, чем планировали, и чувствуете, что не можете остановиться?'
  ),
  getValue(
    'rppQuiz.q3',
    'Вы вызываете рвоту, принимаете слабительные или много тренируетесь, чтобы «компенсировать» съеденное?'
  ),
  getValue(
    'rppQuiz.q4',
    'Вы сильно ограничиваете себя в еде или пропускаете приёмы пищи?'
  ),
  getValue(
    'rppQuiz.q5',
    'Ваша самооценка сильно зависит от вашего веса или формы тела?'
  ),
  getValue(
    'rppQuiz.q6',
    'Вы едите, когда не голодны — от скуки, стресса или одиночества?'
  ),
  getValue(
    'rppQuiz.q7',
    'Вы чувствуете вину или стыд после еды?'
  ),
  getValue(
    'rppQuiz.q8',
    'Вы едите тайком или скрываете от других, сколько съели?'
  ),
  getValue(
    'rppQuiz.q9',
    'Вы часто сравниваете своё тело с другими и чувствуете себя хуже?'
  ),
  getValue(
    'rppQuiz.q10',
    'Еда или контроль веса мешают вашей обычной жизни, работе или отношениям?'
  ),
])

const answers = ref({}) // { 0: true, 1: false, ... }

const currentStep = ref(0)
const isComplete = ref(false)

const concerningCount = computed(() => {
  return Object.values(answers.value).filter(Boolean).length
})

const shouldRecommend = computed(() => {
  return isComplete.value && concerningCount.value >= threshold.value
})

const showNeutralResult = computed(() => {
  return (
    isComplete.value &&
    concerningCount.value >= 1 &&
    concerningCount.value < threshold.value
  )
})

const showLowResult = computed(() => {
  return isComplete.value && concerningCount.value === 0
})

function selectAnswer(index, value) {
  answers.value[index] = value
  const total = questions.value.length
  if (currentStep.value < total - 1) {
    currentStep.value++
  } else {
    isComplete.value = true
  }
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

function restart() {
  answers.value = {}
  currentStep.value = 0
  isComplete.value = false
}
</script>

<template>
  <section id="services" class="rpp-quiz">
    <div class="container">
      <div class="section-header">
        <div class="section-kicker">
          <span>
            {{ getValue('rppQuiz.kicker', 'РПП') }}
          </span>
        </div>
        <h2 class="section-title">
          {{ getValue('rppQuiz.title', 'Есть ли у вас РПП?') }}
        </h2>
        <p class="section-subtitle">
          {{
            getValue(
              'rppQuiz.subtitle',
              'Короткий опросник из 10 вопросов. Ответы не сохраняются — это только для самопроверки. Если вы ответите «да» на несколько вопросов, имеет смысл обсудить это со специалистом.'
            )
          }}
        </p>
      </div>

      <div v-if="!isComplete" class="quiz-body">
        <div class="quiz-progress">
          <span class="quiz-step">Вопрос {{ currentStep + 1 }} из {{ questions.length }}</span>
          <div class="quiz-progress-bar">
            <div
              class="quiz-progress-fill"
              :style="{ width: `${((currentStep + 1) / questions.length) * 100}%` }"
            />
          </div>
        </div>

        <div class="quiz-question">
          <p class="quiz-question-text">{{ questions[currentStep] }}</p>
          <div class="quiz-options">
            <button
              type="button"
              class="quiz-btn quiz-btn--yes"
              :class="{ 'quiz-btn--selected': answers[currentStep] === true }"
              @click="selectAnswer(currentStep, true)"
            >
              Да
            </button>
            <button
              type="button"
              class="quiz-btn quiz-btn--no"
              :class="{ 'quiz-btn--selected': answers[currentStep] === false }"
              @click="selectAnswer(currentStep, false)"
            >
              Нет
            </button>
          </div>
        </div>

        <div v-if="currentStep > 0" class="quiz-nav">
          <button type="button" class="quiz-back" @click="currentStep--">
            ← Назад
          </button>
        </div>
      </div>

      <div v-else class="quiz-result">
        <div v-if="shouldRecommend" class="quiz-result-card quiz-result-card--recommend">
          <h3 class="quiz-result-title">Рекомендуем обратиться к специалисту</h3>
          <p class="quiz-result-text">
            Ваши ответы указывают на возможные признаки расстройства пищевого поведения. Это не диагноз — только повод обсудить ситуацию с психологом. РПП хорошо поддаётся терапии при своевременной поддержке.
          </p>
          <button type="button" class="quiz-cta" @click="scrollToContact">
            Записаться на консультацию →
          </button>
        </div>

        <div v-else-if="showNeutralResult" class="quiz-result-card quiz-result-card--neutral">
          <h3 class="quiz-result-title">Есть что обсудить</h3>
          <p class="quiz-result-text">
            Ваши ответы показывают, что у вас есть переживания, связанные с едой или телом. Если это мешает вам жить спокойно, можно попробовать обсудить это на консультации.
          </p>
          <button type="button" class="quiz-cta quiz-cta--secondary" @click="scrollToContact">
            Записаться на консультацию →
          </button>
        </div>

        <div v-else class="quiz-result-card quiz-result-card--low">
          <h3 class="quiz-result-title">Похоже, всё в порядке</h3>
          <p class="quiz-result-text">
            По вашим ответам признаки РПП не выражены. Если у вас всё же есть вопросы о питании или теле, вы всегда можете написать и задать их.
          </p>
          <button type="button" class="quiz-cta quiz-cta--secondary" @click="scrollToContact">
            Связаться со мной →
          </button>
        </div>

        <button type="button" class="quiz-restart" @click="restart">
          Пройти тест заново
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rpp-quiz {
  background: linear-gradient(to bottom, rgba(248, 243, 237, 0.6), rgba(255, 255, 255, 0.95));
  padding: 40px 0;
}

.section-header {
  margin-bottom: 28px;
}

.section-kicker {
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.section-kicker span {
  background: linear-gradient(90deg, #ea9ab7, #e8bc62);
  -webkit-background-clip: text;
  color: transparent;
}

.section-title {
  font-size: 1.375rem;
  letter-spacing: -0.01em;
  margin: 0 0 8px;
}

.section-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
  max-width: 560px;
}

.quiz-body {
  max-width: 520px;
}

.quiz-progress {
  margin-bottom: 24px;
}

.quiz-step {
  font-size: 0.8125rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 8px;
}

.quiz-progress-bar {
  height: 6px;
  border-radius: 999px;
  background: rgba(234, 223, 212, 0.8);
  overflow: hidden;
}

.quiz-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e9b8c7, #f3d9a6);
  border-radius: 999px;
  transition: width 0.3s ease;
}

.quiz-question {
  padding: 24px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(234, 223, 212, 0.9);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.04);
}

.quiz-question-text {
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 20px;
  line-height: 1.45;
}

.quiz-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.quiz-btn {
  padding: 12px 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(233, 184, 199, 0.6);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quiz-btn:hover {
  background: rgba(233, 184, 199, 0.12);
  border-color: rgba(233, 184, 199, 0.9);
}

.quiz-btn--selected {
  background: linear-gradient(135deg, #e9b8c7, #f3d9a6);
  border-color: transparent;
  color: #fff;
}

.quiz-nav {
  margin-top: 16px;
}

.quiz-back {
  font-size: 0.8125rem;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
}

.quiz-back:hover {
  color: var(--text-main);
}

.quiz-result {
  max-width: 480px;
}

.quiz-result-card {
  padding: 28px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(234, 223, 212, 0.9);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.04);
}

.quiz-result-card--recommend {
  border-left: 4px solid #e9b8c7;
}

.quiz-result-card--neutral {
  border-left: 4px solid #e8bc62;
}

.quiz-result-card--low {
  border-left: 4px solid #a0c2df;
}

.quiz-result-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 12px;
}

.quiz-result-text {
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.55;
  margin: 0 0 20px;
}

.quiz-cta {
  padding: 12px 22px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 500;
  background: linear-gradient(135deg, #e9b8c7, #f3d9a6);
  color: #fff;
  box-shadow: 0 10px 24px rgba(233, 184, 199, 0.55);
}

.quiz-cta:hover {
  filter: brightness(1.03);
  transform: translateY(-1px);
}

.quiz-cta--secondary {
  background: rgba(233, 184, 199, 0.2);
  color: #c97f9a;
  box-shadow: none;
  border: 1px solid rgba(233, 184, 199, 0.6);
}

.quiz-cta--secondary:hover {
  background: rgba(233, 184, 199, 0.3);
}

.quiz-restart {
  margin-top: 16px;
  font-size: 0.8125rem;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-decoration-style: dotted;
}

.quiz-restart:hover {
  color: var(--text-main);
}
</style>
