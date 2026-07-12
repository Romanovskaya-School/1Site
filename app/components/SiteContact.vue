<template>
  <section class="contact" id="contact">
    <div class="container">
      <div class="contact-inner">
        <div class="contact-info reveal-blur">
          <p class="section-label">Записаться</p>
          <h2 class="section-title">Сделайте первый шаг</h2>
          <p class="section-subtitle">Отвечу на вопросы и помогу выбрать формат.</p>

          <div class="contact-links">
            <a :href="siteData.contactTg" class="contact-link" target="_blank">
              <span class="contact-link-icon">✈️</span>
              <div class="contact-link-text">
                <span>Telegram</span>
                <strong>Написать</strong>
              </div>
            </a>
            <a :href="siteData.contactWa" class="contact-link" target="_blank">
              <span class="contact-link-icon">💬</span>
              <div class="contact-link-text">
                <span>WhatsApp</span>
                <strong>Написать</strong>
              </div>
            </a>
            <a href="mailto:vika@terekhova.ru" class="contact-link">
              <span class="contact-link-icon">📧</span>
              <div class="contact-link-text">
                <span>Email</span>
                <strong>vika@terekhova.ru</strong>
              </div>
            </a>
          </div>
        </div>

        <div class="reveal-blur" style="transition-delay:0.15s">
          <form class="contact-form" @submit.prevent="submitForm">
            <h3 style="font-family:var(--font-head);font-size:1.4rem;color:var(--text-dark);margin-bottom:28px;">Оставить заявку</h3>
            <div class="form-group">
              <label>Ваше имя</label>
              <input type="text" v-model="form.name" placeholder="Анна" required />
            </div>
            <div class="form-group">
              <label>Телефон / Telegram</label>
              <input type="text" v-model="form.phone" placeholder="+7 999 000-00-00" :class="{ 'input-error': phoneError }" required />
              <small v-if="phoneError" style="color: #e74c3c; font-size: 0.8rem; margin-top: 4px; display: block;">Пожалуйста, введите корректный номер телефона</small>
            </div>
            <div class="form-group">
              <label>С чем вы хотели бы поработать?</label>
              <textarea v-model="form.query" placeholder="Опишите ситуацию в нескольких словах"></textarea>
            </div>
            <button v-if="!submitted" type="submit" class="btn btn-primary form-submit">Отправить заявку →</button>
            <div v-if="submitted" style="color:var(--accent); text-align:center; margin-top:16px; font-weight:600;">Спасибо! Заявка успешно отправлена.</div>
            <div v-if="submitError" role="alert" style="color:#b42318; text-align:center; margin-top:16px; font-weight:600;">{{ submitError }}</div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useSiteData } from '../composables/useSiteData'
import { useApplications } from '../composables/useApplications'

const { siteData } = useSiteData()
const { saveApplication } = useApplications()
const form = ref({ name: '', phone: '', query: '' })
const submitted = ref(false)
const phoneError = ref(false)
const submitError = ref('')

const validatePhone = (phone) => {
  if (phone.startsWith('@')) return phone.length >= 3 
  const digitsOnly = phone.replace(/\D/g, '')
  return digitsOnly.length >= 7 && digitsOnly.length <= 15
}

const submitForm = async () => {
  phoneError.value = false
  submitError.value = ''
  
  if (!validatePhone(form.value.phone)) {
    phoneError.value = true
    return
  }

  const newApp = {
    name: form.value.name,
    contact: form.value.phone,
    query: form.value.query,
  }
  
  const { error } = await saveApplication(newApp)
  if (error) {
    submitError.value = 'Не удалось отправить заявку. Попробуйте ещё раз позже.'
    return
  }
  
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    form.value = { name: '', phone: '', query: '' }
  }, 5000)
}
</script>
