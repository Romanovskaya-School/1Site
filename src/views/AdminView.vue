<script setup>
import { ref, onMounted, computed } from 'vue'

const status = ref('')
const saving = ref(false)
const rawData = ref({})

// Все поля сайта: ключ → человеческое описание и подсказка
const FIELDS = [
  { key: 'site.title', label: 'Заголовок вкладки браузера', section: 'general', long: false },
  { key: 'logo.main', label: 'Имя в шапке', section: 'header', long: false },
  { key: 'logo.sub', label: 'Подпись под именем (например: интегративный семейный психолог)', section: 'header', long: false },
  { key: 'nav.about', label: 'Пункт меню: О психологе', section: 'header', long: false },
  { key: 'nav.services', label: 'Пункт меню: Услуги', section: 'header', long: false },
  { key: 'nav.articles', label: 'Пункт меню: Статьи', section: 'header', long: false },
  { key: 'nav.contact', label: 'Пункт меню: Контакты', section: 'header', long: false },
  { key: 'nav.cta', label: 'Кнопка в меню (можно: Записаться <span>→</span>)', section: 'header', long: false, html: true },
  { key: 'hero.pill', label: 'Короткий слоган над заголовком', section: 'hero', long: false },
  { key: 'hero.title', label: 'Главный заголовок (можно <span>…</span> и <br />)', section: 'hero', long: false, html: true },
  { key: 'hero.subtitle', label: 'Подзаголовок под главным заголовком', section: 'hero', long: true },
  { key: 'hero.list.item1', label: 'Пункт списка 1 (например про образование)', section: 'hero', long: false },
  { key: 'hero.list.item2', label: 'Пункт списка 2', section: 'hero', long: false },
  { key: 'hero.list.item3', label: 'Пункт списка 3', section: 'hero', long: false },
  { key: 'hero.cta.button', label: 'Текст кнопки «Записаться» (можно <span>→</span>)', section: 'hero', long: false, html: true },
  { key: 'hero.cta.note', label: 'Подпись под кнопкой', section: 'hero', long: false },
  { key: 'hero.meta', label: 'Формат и длительность (можно <strong>, <br />)', section: 'hero', long: false, html: true },
  { key: 'hero.float.tag', label: 'Подпись на карточке с фото', section: 'hero', long: false },
  { key: 'hero.photo.placeholder', label: 'Текст-заглушка вместо фото (или описание)', section: 'hero', long: false },
  { key: 'hero.photo.badge.title', label: 'Заголовок бейджа на карточке (например: Моё кредо)', section: 'hero', long: false },
  { key: 'hero.photo.badge.text', label: 'Текст бейджа на карточке', section: 'hero', long: true },
  { key: 'hero.tag1', label: 'Тег 1 (например: онлайн‑консультации)', section: 'hero', long: false },
  { key: 'hero.tag2', label: 'Тег 2', section: 'hero', long: false },
  { key: 'hero.tag3', label: 'Тег 3', section: 'hero', long: false },
  { key: 'about.kicker', label: 'Маленький заголовок блока (О психологе)', section: 'about', long: false },
  { key: 'about.title', label: 'Заголовок блока «О психологе»', section: 'about', long: false },
  { key: 'about.subtitle', label: 'Подзаголовок блока', section: 'about', long: true },
  { key: 'services.kicker', label: 'Маленький заголовок блока услуг', section: 'services', long: false },
  { key: 'services.title', label: 'Заголовок блока «Услуги и стоимость»', section: 'services', long: false },
  { key: 'services.subtitle', label: 'Подзаголовок блока услуг', section: 'services', long: true },
  { key: 'card1.title', label: 'Карточка 1: название (например: Индивидуальная консультация)', section: 'services', long: false },
  { key: 'card1.duration', label: 'Карточка 1: длительность (60 минут)', section: 'services', long: false },
  { key: 'card1.price', label: 'Карточка 1: цена (можно 4&nbsp;000&nbsp;₽)', section: 'services', long: false, html: true },
  { key: 'card1.text', label: 'Карточка 1: описание', section: 'services', long: true },
  { key: 'card1.note', label: 'Карточка 1: примечание под кнопкой', section: 'services', long: false },
  { key: 'pricing.note', label: 'Общее примечание к ценам (можно <strong>, <br />)', section: 'services', long: true, html: true },
  { key: 'articles.kicker', label: 'Маленький заголовок блока статей', section: 'articles', long: false },
  { key: 'articles.title', label: 'Заголовок блока «Статьи»', section: 'articles', long: false },
  { key: 'articles.subtitle', label: 'Подзаголовок блока статей', section: 'articles', long: true },
  { key: 'contact.kicker', label: 'Маленький заголовок блока контактов', section: 'contact', long: false },
  { key: 'contact.title', label: 'Заголовок блока «Контакты»', section: 'contact', long: false },
  { key: 'contact.subtitle', label: 'Подзаголовок (как записаться)', section: 'contact', long: true },
  { key: 'footer.text1', label: 'Подвал: первая строка (можно © <span id=\"year\"></span> …)', section: 'footer', long: false, html: true },
  { key: 'footer.text2', label: 'Подвал: вторая строка', section: 'footer', long: false },
]

const SECTIONS = [
  { id: 'general', title: 'Общее' },
  { id: 'header', title: 'Шапка и меню' },
  { id: 'hero', title: 'Главный экран' },
  { id: 'about', title: 'О психологе' },
  { id: 'services', title: 'Услуги и цены' },
  { id: 'articles', title: 'Статьи' },
  { id: 'contact', title: 'Контакты' },
  { id: 'footer', title: 'Подвал' },
]

function getFieldValue(key) {
  return rawData.value[key]?.value ?? ''
}

function setFieldValue(key, value) {
  if (!rawData.value[key]) {
    rawData.value[key] = { selector: '', property: 'textContent', value: '' }
  }
  rawData.value[key].value = value
}

const fieldsBySection = computed(() => {
  const bySection = {}
  for (const s of SECTIONS) {
    bySection[s.id] = FIELDS.filter((f) => f.section === s.id)
  }
  return bySection
})

function setStatus(text, isError = false) {
  status.value = text
  if (isError) console.error(text)
}

async function loadContent() {
  try {
    setStatus('Загрузка…')
    const res = await fetch('/api/content')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    rawData.value = { ...(data || {}) }
    // чтобы все поля из FIELDS были в rawData (для реактивности и сохранения)
    for (const f of FIELDS) {
      const existing = rawData.value[f.key]
      if (!existing || typeof existing !== 'object') {
        rawData.value[f.key] = { selector: '', property: 'textContent', value: '' }
      } else if (typeof existing.value === 'undefined') {
        rawData.value[f.key] = { ...existing, value: '' }
      }
    }
    setStatus('Данные загружены. Отредактируйте поля и нажмите «Сохранить».')
  } catch (e) {
    setStatus('Не удалось загрузить данные. Проверьте, что вы на странице с запущенным сайтом (порт 5173).', true)
  }
}

async function saveContent() {
  try {
    setStatus('Сохраняем…')
    saving.value = true
    const res = await fetch('/api/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rawData.value),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    await res.json()
    setStatus('Готово! Обновите главную страницу сайта (F5), чтобы увидеть изменения.')
  } catch (e) {
    setStatus('Ошибка при сохранении. Попробуйте ещё раз.', true)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadContent()
})
</script>

<template>
  <div class="cms">
    <header class="cms-header">
      <div class="cms-header-top">
        <h1>Редактирование текстов сайта</h1>
        <a :href="'/'" target="_blank" rel="noopener" class="cms-link">Открыть сайт →</a>
      </div>
      <p class="cms-desc">
        Меняйте текст в полях ниже и нажимайте «Сохранить». После сохранения обновите главную страницу (F5), чтобы увидеть изменения.
      </p>
      <div class="cms-status" :class="{ 'cms-status--error': status.includes('Ошибка') || status.includes('Не удалось') }">
        {{ status }}
      </div>
    </header>

    <form class="cms-form" @submit.prevent="saveContent">
      <section
        v-for="sec in SECTIONS"
        :key="sec.id"
        class="cms-section"
      >
        <h2 class="cms-section-title">{{ sec.title }}</h2>
        <div class="cms-fields">
          <div
            v-for="field in fieldsBySection[sec.id]"
            :key="field.key"
            class="cms-field"
          >
            <label class="cms-label">
              {{ field.label }}
              <span v-if="field.html" class="cms-hint">Можно HTML: &lt;strong&gt;, &lt;br /&gt;, &lt;span&gt;</span>
            </label>
            <textarea
              v-if="field.long"
              :value="getFieldValue(field.key)"
              class="cms-input cms-input--area"
              rows="3"
              :placeholder="field.placeholder"
              @input="setFieldValue(field.key, $event.target.value)"
            />
            <input
              v-else
              :value="getFieldValue(field.key)"
              type="text"
              class="cms-input"
              :placeholder="field.placeholder"
              @input="setFieldValue(field.key, $event.target.value)"
            />
          </div>
        </div>
      </section>

      <div class="cms-actions">
        <button type="submit" class="cms-btn" :disabled="saving">
          {{ saving ? 'Сохранение…' : 'Сохранить изменения' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.cms {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a1a1a;
}

.cms-header {
  margin-bottom: 28px;
}

.cms-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}

.cms-header h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.cms-link {
  font-size: 0.9rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}
.cms-link:hover {
  text-decoration: underline;
}

.cms-desc {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

.cms-status {
  font-size: 0.85rem;
  color: #0d9488;
  padding: 8px 12px;
  background: #ccfbf1;
  border-radius: 8px;
}
.cms-status--error {
  color: #b91c1c;
  background: #fee2e2;
}

.cms-form {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.cms-section {
  background: #fafafa;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 20px 24px;
}

.cms-section-title {
  margin: 0 0 16px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #e5e5e5;
}

.cms-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cms-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cms-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.4;
}

.cms-hint {
  display: block;
  font-size: 0.75rem;
  font-weight: 400;
  color: #6b7280;
  margin-top: 2px;
}

.cms-input {
  width: 100%;
  font-size: 0.9rem;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  color: #1a1a1a;
  box-sizing: border-box;
  font-family: inherit;
}
.cms-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}
.cms-input::placeholder {
  color: #9ca3af;
}

.cms-input--area {
  min-height: 72px;
  resize: vertical;
}

.cms-actions {
  padding-top: 8px;
}

.cms-btn {
  font-size: 1rem;
  font-weight: 500;
  padding: 12px 24px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
}
.cms-btn:hover:not(:disabled) {
  background: #1d4ed8;
}
.cms-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
