<template>
  <transition name="prompt-fade">
    <div v-if="showPrompt" class="test-prompt">
      <button class="prompt-close" @click="closePrompt">✕</button>
      <div class="prompt-icon">💡</div>
      <div class="prompt-content">
        <h4>Хотите узнать больше о себе?</h4>
        <p>Пройдите наши психологические тесты.</p>
        <router-link to="/rpp" class="btn btn-primary btn-sm prompt-btn" @click="closePrompt">Пройти тест</router-link>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'


const showPrompt = ref(false)
const route = useRoute()
let timeoutId = null

const checkAndStartPrompt = (path) => {
  // Check if we already showed or dismissed it in this session
  if (sessionStorage.getItem('testPromptShown')) {
    return
  }

  // Only show if we are on Home or Articles page
  if (path === '/' || path.startsWith('/articles')) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      // Re-check route just in case user navigated away within 5 seconds
      if (route.path === '/' || route.path.startsWith('/articles')) {
        showPrompt.value = true
        sessionStorage.setItem('testPromptShown', 'true')
      }
    }, 5000)
  }
}

onMounted(() => {
  checkAndStartPrompt(route.path)
})

watch(() => route.path, (newPath) => {
  checkAndStartPrompt(newPath)
})

const closePrompt = () => {
  if (timeoutId) clearTimeout(timeoutId)
  showPrompt.value = false
  sessionStorage.setItem('testPromptShown', 'true')
}
</script>

<style scoped>
.test-prompt {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: var(--warm-white);
  border-radius: var(--radius-md);
  box-shadow: 0 16px 40px var(--shadow);
  padding: 24px;
  max-width: 320px;
  z-index: 9999;
  display: flex;
  gap: 16px;
  border: 1px solid rgba(72, 164, 165, 0.2);
}

.prompt-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--text-light);
  cursor: pointer;
  transition: color 0.3s;
}

.prompt-close:hover {
  color: var(--text-dark);
}

.prompt-icon {
  font-size: 2rem;
}

.prompt-content h4 {
  font-family: var(--font-head);
  font-size: 1.1rem;
  color: var(--text-dark);
  margin-bottom: 8px;
}

.prompt-content p {
  font-size: 0.85rem;
  color: var(--text-mid);
  margin-bottom: 16px;
  line-height: 1.4;
}

.prompt-btn {
  padding: 8px 16px;
  font-size: 0.85rem;
  width: 100%;
  justify-content: center;
}

.prompt-fade-enter-active,
.prompt-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.prompt-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.prompt-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@media (max-width: 768px) {
  .test-prompt {
    bottom: 20px;
    right: 20px;
    left: 20px;
    max-width: none;
  }
}
</style>
