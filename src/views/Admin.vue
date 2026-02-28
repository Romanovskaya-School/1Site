<template>
  <div class="admin">
    <header class="admin-header">
      <div class="container">
        <h1>Панель управления сайтом</h1>
        <div class="header-actions">
          <button @click="exportData" class="btn-secondary">Скачать резервную копию</button>
          <label class="btn-secondary">
            Загрузить резервную копию
            <input type="file" @change="importData" accept=".json" hidden>
          </label>
          <button @click="saveAll" class="btn-save" :disabled="saving">
            {{ saving ? 'Сохранение...' : 'Сохранить изменения' }}
          </button>
        </div>
      </div>
    </header>

    <main class="admin-main">
      <div class="container">
        <div class="admin-grid">
          <section class="admin-section">
            <h2>Основная информация</h2>
            <div class="form-group">
              <label>Имя / Название</label>
              <input v-model="data.name" type="text">
            </div>
            <div class="form-group">
              <label>Заголовок на главном экране</label>
              <input v-model="data.heroTitle" type="text">
            </div>
            <div class="form-group">
              <label>Подзаголовок</label>
              <input v-model="data.heroSubtitle" type="text">
            </div>
            <div class="form-group">
              <label>Обо мне (первый абзац)</label>
              <textarea v-model="data.aboutText" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label>Обо мне (второй абзац)</label>
              <textarea v-model="data.aboutText2" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label>Специализация</label>
              <input v-model="data.specialization" type="text">
            </div>
            <div class="form-group">
              <label>Опыт работы</label>
              <input v-model="data.experience" type="text">
            </div>
            <div class="form-group">
              <label>Образование</label>
              <input v-model="data.education" type="text">
            </div>
          </section>

          <section class="admin-section">
            <h2>Контакты</h2>
            <div class="form-group">
              <label>Телефон</label>
              <input v-model="data.phone" type="tel">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="data.email" type="email">
            </div>
          </section>

          <section class="admin-section">
            <h2>Услуги</h2>
            <div v-for="(service, index) in data.services" :key="index" class="item-card">
              <div class="item-header">
                <span>Услуга {{ index + 1 }}</span>
                <button @click="removeService(index)" class="btn-remove">Удалить</button>
              </div>
              <div class="form-group">
                <label>Название</label>
                <input v-model="service.title" type="text">
              </div>
              <div class="form-group">
                <label>Описание</label>
                <input v-model="service.description" type="text">
              </div>
              <div class="form-group">
                <label>Цена</label>
                <input v-model="service.price" type="text">
              </div>
            </div>
            <button @click="addService" class="btn-add">+ Добавить услугу</button>
          </section>

          <section class="admin-section">
            <h2>Стоимость (прайс)</h2>
            <div v-for="(price, index) in data.pricing" :key="index" class="item-card">
              <div class="item-header">
                <span>Пакет {{ index + 1 }}</span>
                <button @click="removePricing(index)" class="btn-remove">Удалить</button>
              </div>
              <div class="form-group">
                <label>Название</label>
                <input v-model="price.title" type="text">
              </div>
              <div class="form-group">
                <label>Длительность</label>
                <input v-model="price.duration" type="text">
              </div>
              <div class="form-group">
                <label>Описание</label>
                <input v-model="price.description" type="text">
              </div>
              <div class="form-group">
                <label>Цена</label>
                <input v-model="price.price" type="text">
              </div>
            </div>
            <button @click="addPricing" class="btn-add">+ Добавить пакет</button>
          </section>

          <section class="admin-section full-width">
            <h2>Заявки с сайта</h2>
            <div v-if="messages.length === 0" class="empty-state">
              Пока нет заявок
            </div>
            <div v-else class="messages-list">
              <div v-for="(msg, idx) in messages" :key="idx" class="message-card">
                <div class="message-header">
                  <strong>{{ msg.name }}</strong>
                  <span class="message-date">{{ formatDate(msg.timestamp) }}</span>
                </div>
                <div class="message-email">{{ msg.email }}</div>
                <div class="message-text">{{ msg.message }}</div>
                <button @click="deleteMessage(idx)" class="btn-remove btn-small">Удалить</button>
              </div>
            </div>
            <button v-if="messages.length > 0" @click="clearMessages" class="btn-clear">Очистить все заявки</button>
          </section>
        </div>

        <div v-if="successMessage" class="success-toast">
          {{ successMessage }}
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const saving = ref(false)
const successMessage = ref('')
const messages = ref([])

const defaultData = {
  name: 'Виктория Терехова',
  heroTitle: 'Интегративный семейный психолог',
  heroSubtitle: 'Помогаю найти гармонию в отношениях с собой и близкими',
  aboutText: 'Я помогаю людям справиться с трудностями в отношениях, разобраться в себе и найти путь к гармоничной жизни.',
  aboutText2: 'Мой подход — мягкая и бережная работа с каждым клиентом, без давления и осуждения.',
  specialization: 'Интегративная семейная психология',
  experience: 'Более 10 лет',
  education: 'МГУ им. Ломоносова',
  phone: '+7 (985) 400-30-00',
  email: 'ddvv2009@gmail.com',
  services: [
    { title: 'Индивидуальная консультация', description: 'Работа с личными запросами', price: '4000 ₽ / 60 мин' },
    { title: 'Семейная терапия', description: 'Работа с семейными конфликтами', price: '6000 ₽ / 90 мин' },
    { title: 'Парная консультация', description: 'Работа с отношениями в паре', price: '5000 ₽ / 60 мин' }
  ],
  pricing: [
    { title: 'Первичная консультация', duration: '120 минут', description: 'Знакомство и диагностика', price: '8000 ₽' },
    { title: 'Разовая консультация', duration: '60 минут', description: 'Работа с запросом', price: '4000 ₽' },
    { title: 'Блок 5 консультаций', duration: '5 × 60 минут', description: 'Комплексная работа', price: '18000 ₽' }
  ]
}

const data = ref({ ...defaultData })

onMounted(() => {
  const saved = localStorage.getItem('psychologistData')
  if (saved) {
    try {
      data.value = { ...defaultData, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Ошибка загрузки данных:', e)
    }
  }

  const msgs = localStorage.getItem('psychologistMessages')
  if (msgs) {
    try {
      messages.value = JSON.parse(msgs)
    } catch (e) {
      messages.value = []
    }
  }
})

const saveAll = () => {
  saving.value = true
  try {
    localStorage.setItem('psychologistData', JSON.stringify(data.value))
    successMessage.value = 'Изменения сохранены!'
    setTimeout(() => successMessage.value = '', 3000)
  } catch (e) {
    alert('Ошибка сохранения: ' + e.message)
  }
  saving.value = false
}

const exportData = () => {
  const exportObj = {
    siteData: data.value,
    messages: messages.value,
    exportDate: new Date().toISOString()
  }
  const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `psychologist-backup-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const importData = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result)
      if (imported.siteData) {
        data.value = imported.siteData
        localStorage.setItem('psychologistData', JSON.stringify(imported.siteData))
      }
      if (imported.messages) {
        messages.value = imported.messages
        localStorage.setItem('psychologistMessages', JSON.stringify(imported.messages))
      }
      successMessage.value = 'Данные успешно импортированы!'
      setTimeout(() => successMessage.value = '', 3000)
    } catch (err) {
      alert('Ошибка импорта: неверный формат файла')
    }
  }
  reader.readAsText(file)
  event.target.value = ''
}

const addService = () => {
  data.value.services.push({ title: '', description: '', price: '' })
}

const removeService = (index) => {
  data.value.services.splice(index, 1)
}

const addPricing = () => {
  data.value.pricing.push({ title: '', duration: '', description: '', price: '' })
}

const removePricing = (index) => {
  data.value.pricing.splice(index, 1)
}

const deleteMessage = (index) => {
  messages.value.splice(index, 1)
  localStorage.setItem('psychologistMessages', JSON.stringify(messages.value))
}

const clearMessages = () => {
  if (confirm('Удалить все заявки?')) {
    messages.value = []
    localStorage.setItem('psychologistMessages', JSON.stringify([]))
  }
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('ru-RU')
}
</script>

<style scoped>
.admin {
  min-height: 100vh;
  background: #F5F5F5;
  padding-bottom: 60px;
}

.admin-header {
  background: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  margin-bottom: 40px;
}

.admin-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.admin-header h1 {
  font-size: 1.5rem;
  color: #333;
}

.header-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.btn-save {
  background: #8FB3A3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.btn-save:hover:not(:disabled) {
  background: #7A9E8C;
}

.btn-save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.admin-section {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.admin-section.full-width {
  grid-column: 1 / -1;
}

.admin-section h2 {
  font-size: 1.2rem;
  margin-bottom: 25px;
  color: #333;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8FB3A3;
}

.item-card {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 500;
  color: #333;
}

.btn-remove {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-small {
  padding: 4px 10px;
  font-size: 0.8rem;
  margin-top: 10px;
}

.btn-add {
  background: #f0f0f0;
  color: #333;
  border: 2px dashed #ccc;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn-add:hover {
  border-color: #8FB3A3;
  color: #8FB3A3;
}

.btn-clear {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 20px;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message-card {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.message-date {
  font-size: 0.85rem;
  color: #999;
}

.message-email {
  color: #8FB3A3;
  margin-bottom: 8px;
}

.message-text {
  color: #666;
  font-size: 0.95rem;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px;
}

.success-toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #4CAF50;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-header .container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .btn-save {
    width: 100%;
  }
}
</style>
