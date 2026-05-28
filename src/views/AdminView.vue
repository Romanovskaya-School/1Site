<template>
  <div class="admin-wrapper">
    <!-- AUTH SCREEN -->
    <div id="authScreen" v-if="!isAuthenticated">
      <div class="auth-card">
        <div class="auth-logo">Виктория Терехова</div>
        <div class="auth-sub">Панель управления</div>
        <h2>Вход</h2>
        <p>Введите пароль для доступа к администрированию сайта</p>
        <div class="auth-error" :class="{ show: authError }">Неверный пароль. Попробуйте снова.</div>
        <form @submit.prevent="doLogin">
          <div class="auth-input-group">
            <label for="authPassword">Пароль</label>
            <input type="password" id="authPassword" v-model="password" placeholder="••••••••" autocomplete="current-password" required />
          </div>
          <button type="submit" class="btn btn-primary auth-submit">Войти →</button>
        </form>
      </div>
    </div>

    <!-- ADMIN APP -->
    <div id="adminApp" :class="{ active: isAuthenticated }" v-else>
      <!-- Sidebar -->
      <aside class="sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-logo">
          <div class="logo-name">Виктория Терехова</div>
          <div class="logo-sub">Психолог · Онлайн</div>
          <div class="sidebar-admin-badge">⚙️ Админ</div>
        </div>
        <nav class="sidebar-nav">
          <button class="nav-item" :class="{ active: activePage === 'dashboard' }" @click="showPage('dashboard')">
            <span class="nav-icon">🏠</span> Дашборд
          </button>
          <button class="nav-item" :class="{ active: activePage === 'articles' }" @click="showPage('articles')">
            <span class="nav-icon">📝</span> Статьи
          </button>
          <button class="nav-item" :class="{ active: activePage === 'applications' }" @click="showPage('applications')">
            <span class="nav-icon">🎓</span> Заявки на курсы
          </button>
          <button class="nav-item" :class="{ active: activePage === 'tests' || activePage === 'testEditor' }" @click="showPage('tests')">
            <span class="nav-icon">📋</span> Тесты
          </button>
        </nav>
        <div class="sidebar-footer">
          <router-link to="/" target="_blank">🌐 Открыть сайт</router-link>
          <router-link to="/articles" target="_blank">📰 Страница статей</router-link>
          <a href="#" @click.prevent="doLogout">🚪 Выйти</a>
        </div>
      </aside>

      <!-- Main -->
      <main class="admin-main">
        <!-- Topbar -->
        <div class="topbar">
          <div style="display: flex; align-items: center; gap: 12px;">
            <button class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">☰</button>
            <div class="topbar-title">{{ pageTitle }}</div>
          </div>
          <div class="topbar-actions">
            <button class="btn btn-primary btn-sm" @click="showPage('editor', null)">
              + Новая статья
            </button>
          </div>
        </div>

        <!-- Dashboard -->
        <div class="page" :class="{ active: activePage === 'dashboard' }">
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-icon">📝</div>
              <div class="stat-content">
                <div class="stat-number">{{ articles.length }}</div>
                <div class="stat-label">Всего статей</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏷️</div>
              <div class="stat-content">
                <div class="stat-number">{{ categories.length }}</div>
                <div class="stat-label">Категорий</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🎓</div>
              <div class="stat-content">
                <div class="stat-number">{{ applications.length }}</div>
                <div class="stat-label">Заявок</div>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🌐</div>
              <div class="stat-content">
                <div class="stat-number">{{ siteData.visits || 0 }}</div>
                <div class="stat-label">Заходов</div>
              </div>
            </div>
          </div>
          <div class="table-wrap">
            <div class="table-head">
              <h3>Последние статьи</h3>
              <button class="btn btn-outline btn-sm" @click="showPage('articles')">Все статьи</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Заголовок</th>
                  <th>Категория</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="articles.length === 0">
                  <td colspan="4" style="text-align:center;color:var(--text-light);padding:32px">Статей нет</td>
                </tr>
                <tr v-for="a in articles.slice(0, 5)" :key="a.id">
                  <td class="td-title">
                    {{ a.title || 'Без заголовка' }}
                    <small>{{ (a.excerpt || '').slice(0, 60) + '…' }}</small>
                  </td>
                  <td><span class="cat-badge">{{ a.category || '—' }}</span></td>
                  <td>{{ formatDate(a.date) }}</td>
                  <td class="td-actions">
                    <button class="btn btn-outline btn-sm" @click="showPage('editor', a.id)">✏️</button>
                    <button class="btn btn-danger btn-sm" @click="askDelete(a.id)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Articles List -->
        <div class="page" :class="{ active: activePage === 'articles' }">
          <div class="table-wrap">
            <div class="table-head">
              <h3>Все статьи</h3>
              <button class="btn btn-primary btn-sm" @click="showPage('editor', null)">+ Добавить</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Заголовок</th>
                  <th>Категория</th>
                  <th>Дата</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in articles" :key="a.id">
                  <td class="td-title">
                    {{ a.title || 'Без заголовка' }}
                    <small>{{ (a.excerpt || '').slice(0, 60) + '…' }}</small>
                  </td>
                  <td><span class="cat-badge">{{ a.category || '—' }}</span></td>
                  <td>{{ formatDate(a.date) }}</td>
                  <td class="td-actions">
                    <button class="btn btn-outline btn-sm" @click="showPage('editor', a.id)">✏️ Изменить</button>
                    <button class="btn btn-danger btn-sm" @click="askDelete(a.id)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="empty-state" v-if="articles.length === 0">
              <div class="empty-icon">📭</div>
              <p>Статей пока нет. Создайте первую!</p>
            </div>
          </div>
        </div>

        <!-- Editor -->
        <div class="page" :class="{ active: activePage === 'editor' }">
          <div class="form-card">
            <form @submit.prevent="submitArticle">
              <div class="form-section-title">Основная информация</div>
              <div class="form-group">
                <label>Заголовок статьи</label>
                <input type="text" v-model="editArticle.title" required />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Категория</label>
                  <input type="text" v-model="editArticle.category" list="categorySuggestions" required />
                  <datalist id="categorySuggestions">
                    <option v-for="c in categories" :key="c" :value="c"></option>
                  </datalist>
                </div>
                <div class="form-group">
                  <label>Дата публикации</label>
                  <input type="date" v-model="editArticle.date" required />
                </div>
              </div>
              <div class="form-group">
                <label>Время чтения</label>
                <input type="text" v-model="editArticle.readTime" placeholder="7 минут" />
              </div>

              <div class="form-section-title">Контент</div>
              <div class="form-group">
                <label>Краткое описание</label>
                <textarea v-model="editArticle.excerpt" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label>Полный текст статьи</label>
                <textarea class="content-editor" v-model="editArticle.content" required></textarea>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Сохранить статью</button>
                <button type="button" class="btn btn-outline" @click="showPage('articles')">Отмена</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Applications -->
        <div class="page" :class="{ active: activePage === 'applications' }">
          <div class="table-wrap">
            <div class="table-head">
              <h3>Заявки на курсы</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Имя и Контакты</th>
                  <th>Курс / Запрос</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="app in applications" :key="app.id">
                  <td class="td-title">
                    <strong>{{ app.name }}</strong>
                    <small>{{ app.contact }}</small>
                  </td>
                  <td>
                    <strong>{{ app.courseName || '' }}</strong>
                    <small style="margin-top:4px;">{{ app.query || '' }}</small>
                    <small v-if="app.date">{{ formatDate(app.date) }}</small>
                  </td>
                  <td>
                    <span class="cat-badge" :style="{ background: app.status === 'processed' ? 'var(--success-bg)' : 'var(--danger-bg)', color: app.status === 'processed' ? 'var(--success)' : 'var(--danger)' }">
                      {{ app.status === 'processed' ? 'Обработана' : 'Новая' }}
                    </span>
                  </td>
                  <td class="td-actions">
                    <button v-if="app.status !== 'processed'" class="btn btn-outline btn-sm" @click="processApplication(app.id)">✅ Обработать</button>
                    <button class="btn btn-danger btn-sm" @click="handleDeleteApplication(app.id)">🗑 Удалить</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="empty-state" v-if="applications.length === 0">
              <div class="empty-icon">🎓</div>
              <p>Заявок пока нет.</p>
            </div>
          </div>
        </div>

        <!-- Tests List -->
        <div class="page" :class="{ active: activePage === 'tests' }">
          <div class="table-wrap">
            <div class="table-head">
              <h3>Тесты на сайте</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Название</th>
                  <th>Вопросов</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="t in siteData.tests" :key="t.id">
                  <td class="td-title">
                    {{ t.title }}
                  </td>
                  <td><span class="cat-badge">{{ t.questions.length }}</span></td>
                  <td class="td-actions">
                    <button class="btn btn-outline btn-sm" @click="showPage('testEditor', t.id)">✏️ Изменить</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Test Editor -->
        <div class="page" :class="{ active: activePage === 'testEditor' }">
          <div class="form-card" v-if="editTest">
            <form @submit.prevent="saveTest">
              <div class="form-section-title">Основная информация</div>
              <div class="form-group">
                <label>Название теста</label>
                <input type="text" v-model="editTest.title" required />
              </div>

              <div class="form-section-title">
                Вопросы ({{ editTest.questions.length }})
                <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addTestQuestion">+ Добавить</button>
              </div>
              <div v-for="(q, i) in editTest.questions" :key="i" class="form-group" style="display: flex; gap: 12px; align-items: flex-start; flex-wrap: wrap; background: var(--bg-alt); padding: 12px; border-radius: 8px;">
                <span style="padding-top: 8px; font-weight: bold; width: 24px;">{{ i + 1 }}.</span>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
                  <textarea v-model="editTest.questions[i].text" rows="2" required placeholder="Текст вопроса"></textarea>
                  <div style="display: flex; gap: 12px; align-items: center;">
                    <label style="font-size: 0.85rem; color: var(--text-mid);">Тип подсчета:</label>
                    <select v-model="editTest.questions[i].type" style="padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border);">
                      <option value="normal">Обычный (5-0 баллов)</option>
                      <option value="reverse">Обратный (0-5 баллов)</option>
                      <option value="ignore">Не учитывается</option>
                    </select>
                  </div>
                </div>
                <button type="button" class="btn btn-danger btn-sm" @click="removeTestQuestion(i)">🗑</button>
              </div>

              <div class="form-section-title">
                Пороги результатов ({{ editTest.results.length }})
                <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addTestResult" v-if="editTest.results.length < 5">+ Добавить порог</button>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px;">Укажите максимальный балл, при достижении которого будет показана рекомендация. Пороги должны идти по возрастанию (например: 10, 20, 30, 999).</p>
              
              <div v-for="(r, i) in editTest.results" :key="'r'+i" class="form-group" style="background: var(--bg-alt); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border); position: relative;">
                <button type="button" class="btn btn-danger btn-sm" style="position: absolute; top: 12px; right: 12px;" @click="removeTestResult(i)" v-if="editTest.results.length > 1">🗑</button>
                <div style="font-weight: 600; margin-bottom: 8px;">Порог {{ i + 1 }}</div>
                <div style="display: flex; gap: 16px;">
                  <div style="width: 120px;">
                    <label>До (баллов)</label>
                    <input type="number" v-model="editTest.results[i].max" required />
                  </div>
                  <div style="flex: 1;">
                    <label>Текст рекомендации (поддерживает HTML)</label>
                    <input type="text" v-model="editTest.results[i].text" required />
                  </div>
                </div>
              </div>

              <div class="form-actions" style="margin-top: 32px;">
                <button type="submit" class="btn btn-primary">Сохранить тест</button>
                <button type="button" class="btn btn-outline" @click="showPage('tests')">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

    <!-- Confirm Modal -->
    <div id="confirmModal" :class="{ open: pendingDeleteId }" @click="pendingDeleteId = null">
      <div class="modal-card" @click.stop>
        <h3>Удалить статью?</h3>
        <p>Это действие нельзя отменить. Статья будет удалена навсегда.</p>
        <div class="modal-actions">
          <button class="btn btn-danger" @click="confirmDelete">Да, удалить</button>
          <button class="btn btn-outline" @click="pendingDeleteId = null">Отмена</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div id="toast" :class="[toastType, { show: toastMessage }]">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useArticles } from '../composables/useArticles'
import { useSiteData } from '../composables/useSiteData'
import { useApplications } from '../composables/useApplications'

const { articles, saveArticle, deleteArticle } = useArticles()
const { siteData, saveSiteData } = useSiteData()
const { applications, saveApplication, deleteApplication } = useApplications()

const isAuthenticated = ref(false)
const password = ref('')
const authError = ref(false)
const ADMIN_PASSWORD = 'admin' // Simple password for now

const activePage = ref('dashboard')
const sidebarOpen = ref(false)
const pendingDeleteId = ref(null)
const editArticle = ref({})
const editTest = ref(null)

const toastMessage = ref('')
const toastType = ref('success')

const pageTitle = computed(() => {
  const titles = {
    dashboard: 'Дашборд',
    articles: 'Все статьи',
    editor: editArticle.value.id ? 'Редактировать статью' : 'Новая статья',
    applications: 'Заявки на курсы',
    tests: 'Тесты на сайте',
    testEditor: 'Редактирование теста'
  }
  return titles[activePage.value]
})

const categories = computed(() => {
  return [...new Set(articles.value.map(a => a.category).filter(Boolean))]
})

const showToast = (msg, type = 'success') => {
  toastMessage.value = msg
  toastType.value = type
  setTimeout(() => toastMessage.value = '', 3000)
}

const doLogin = () => {
  if (password.value === ADMIN_PASSWORD) {
    isAuthenticated.value = true
    sessionStorage.setItem('vt_admin_session', '1')
  } else {
    authError.value = true
    setTimeout(() => authError.value = false, 3500)
  }
}

const doLogout = () => {
  sessionStorage.removeItem('vt_admin_session')
  isAuthenticated.value = false
}

const showPage = (page, arg) => {
  activePage.value = page
  sidebarOpen.value = false // Close sidebar on page change (mobile)
  if (page === 'editor') {
    if (arg) {
      editArticle.value = JSON.parse(JSON.stringify(articles.value.find(a => a.id === arg)))
    } else {
      editArticle.value = { id: null, date: new Date().toISOString().split('T')[0] }
    }
  } else if (page === 'testEditor') {
    if (arg) {
      editTest.value = JSON.parse(JSON.stringify(siteData.tests.find(t => t.id === arg)))
      // Ensure backwards compatibility with old string questions
      editTest.value.questions = editTest.value.questions.map(q => {
        if (typeof q === 'string') {
          return { text: q, type: 'normal' }
        }
        return q
      })
    }
  }
}

const saveTest = () => {
    const index = siteData.tests.findIndex(t => t.id === editTest.value.id)
    if (index !== -1) {
        editTest.value.subtitle = `${editTest.value.questions.length} вопросов`
        siteData.tests[index] = editTest.value
        saveSiteData(siteData)
        showToast('✅ Тест сохранен', 'success')
        showPage('tests')
    }
}

const addTestQuestion = () => {
    editTest.value.questions.push({ text: '', type: 'normal' })
}

const removeTestQuestion = (index) => {
    if (confirm('Удалить этот вопрос?')) {
        editTest.value.questions.splice(index, 1)
    }
}

const addTestResult = () => {
    if (editTest.value.results.length < 5) {
        editTest.value.results.push({ max: 999, text: 'Новый результат' })
    }
}

const removeTestResult = (index) => {
    if (editTest.value.results.length > 1) {
        editTest.value.results.splice(index, 1)
    }
}

const submitArticle = () => {
  const article = { ...editArticle.value }
  if (!article.id) article.id = 'article-' + Date.now()
  saveArticle(article)
  showToast('✅ Статья сохранена', 'success')
  showPage('articles')
}

const askDelete = (id) => {
  pendingDeleteId.value = id
}

const confirmDelete = () => {
  deleteArticle(pendingDeleteId.value)
  pendingDeleteId.value = null
  showToast('🗑 Статья удалена', 'error')
}

const processApplication = (id) => {
  const app = applications.value.find(a => a.id === id)
  if (app) {
    app.status = 'processed'
    saveApplication(app)
    showToast('✅ Заявка обработана', 'success')
  }
}

const handleDeleteApplication = (id) => {
  if (confirm('Точно удалить эту заявку?')) {
    deleteApplication(id)
    showToast('🗑 Заявка удалена', 'error')
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

onMounted(() => {
  if (sessionStorage.getItem('vt_admin_session') === '1') {
    isAuthenticated.value = true
  }
})
</script>

<style scoped src="../assets/admin.css"></style>
<style>
/* Admin Variables and Layout Resets */
:root {
  --sidebar-w: 260px;
  --radius: 12px;
  --transition: 0.3s ease;
}

.admin-wrapper {
  background: var(--cream);
  min-height: 100vh;
  width: 100%;
  text-align: left;
  overflow-x: hidden;
  font-family: var(--font-body);
  color: var(--text-dark);
}

/* Ensure the admin app fills the wrapper */
#adminApp.active {
  display: flex;
}
</style>
