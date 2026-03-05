<template>
  <div class="admin-view">
    <!-- AUTH SCREEN -->
    <div v-if="!isAuthenticated" id="authScreen">
      <div class="auth-card">
        <div class="auth-logo">Виктория Терехова</div>
        <div class="auth-sub">Панель управления</div>
        <h2>Вход</h2>
        <p>Введите пароль для доступа к администрированию сайта</p>
        <div class="auth-error" :class="{ 'show': authError }">Неверный пароль. Попробуйте снова.</div>
        <form @submit.prevent="handleLogin">
          <div class="auth-input-group">
            <label for="authPassword">Пароль</label>
            <input type="password" v-model="password" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary auth-submit">Войти →</button>
        </form>
      </div>
    </div>

    <!-- ADMIN APP -->
    <div v-else id="adminApp" class="active">
      <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="logo-name">Виктория Терехова</div>
          <div class="logo-sub">Психолог · Онлайн</div>
          <div class="sidebar-admin-badge">⚙️ Админ</div>
        </div>
        <nav class="sidebar-nav">
          <button class="nav-item" :class="{ 'active': currentPage === 'dashboard' }" @click="currentPage = 'dashboard'">
            <span class="nav-icon">🏠</span> Дашборд
          </button>
          <button class="nav-item" :class="{ 'active': currentPage === 'articles' }" @click="currentPage = 'articles'">
            <span class="nav-icon">📝</span> Статьи
          </button>
          <button class="nav-item" @click="openEditor(null)">
            <span class="nav-icon">✏️</span> Новая статья
          </button>
        </nav>
        <div class="sidebar-footer">
          <router-link to="/">🌐 Открыть сайт</router-link>
          <a href="#" @click.prevent="handleLogout">🚪 Выйти</a>
        </div>
      </aside>

      <main class="admin-main">
        <div class="topbar">
          <div class="topbar-title">{{ pageTitle }}</div>
          <div class="topbar-actions">
            <button class="btn btn-primary btn-sm" @click="openEditor(null)">+ Новая статья</button>
          </div>
        </div>

        <!-- DASHBOARD -->
        <div v-if="currentPage === 'dashboard'" class="page active">
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-icon">📝</div>
              <div class="stat-content"><div class="stat-number">{{ articles.length }}</div><div class="stat-label">Всего статей</div></div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🏷️</div>
              <div class="stat-content"><div class="stat-number">{{ categories.length }}</div><div class="stat-label">Категорий</div></div>
            </div>
          </div>
          <div class="table-wrap">
            <div class="table-head"><h3>Последние статьи</h3></div>
            <table>
              <thead><tr><th>Заголовок</th><th>Категория</th><th>Дата</th><th>Действия</th></tr></thead>
              <tbody>
                <tr v-for="a in articles.slice(0, 5)" :key="a.id">
                  <td class="td-title">{{ a.title }}<small>{{ a.excerpt.slice(0, 60) }}...</small></td>
                  <td><span class="cat-badge">{{ a.category }}</span></td>
                  <td>{{ formatDate(a.date) }}</td>
                  <td class="td-actions">
                    <button class="btn btn-outline btn-sm" @click="openEditor(a)">✏️ Изменить</button>
                    <button class="btn btn-danger btn-sm" @click="confirmDelete(a.id)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ARTICLES LIST -->
        <div v-else-if="currentPage === 'articles'" class="page active">
           <div class="table-wrap">
            <div class="table-head"><h3>Все статьи</h3></div>
            <table>
              <thead><tr><th>Заголовок</th><th>Категория</th><th>Дата</th><th>Действия</th></tr></thead>
              <tbody>
                <tr v-for="a in articles" :key="a.id">
                  <td class="td-title">{{ a.title }}<small>{{ a.excerpt.slice(0, 60) }}...</small></td>
                  <td><span class="cat-badge">{{ a.category }}</span></td>
                  <td>{{ formatDate(a.date) }}</td>
                  <td class="td-actions">
                    <button class="btn btn-outline btn-sm" @click="openEditor(a)">✏️ Изменить</button>
                    <button class="btn btn-danger btn-sm" @click="confirmDelete(a.id)">🗑</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- EDITOR -->
        <div v-else-if="currentPage === 'editor'" class="page active">
          <div class="form-card">
            <form @submit.prevent="handleSubmitArticle">
              <div class="form-group"><label>Заголовок</label><input type="text" v-model="editForm.title" required /></div>
              <div class="form-row">
                <div class="form-group"><label>Категория</label><input type="text" v-model="editForm.category" required /></div>
                <div class="form-group"><label>Дата</label><input type="date" v-model="editForm.date" required /></div>
              </div>
              <div class="form-group"><label>Краткое описание</label><textarea v-model="editForm.excerpt" required></textarea></div>
              <div class="form-group"><label>Контент (HTML)</label><textarea v-model="editForm.content" rows="10" required></textarea></div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Сохранить</button>
                <button type="button" class="btn btn-outline" @click="currentPage = 'articles'">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

    <!-- Toast & Modal simplified for Vue -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getArticles, saveArticle, deleteArticle, generateId, getCategories } from '../utils/articles-data';

const isAuthenticated = ref(false);
const password = ref('');
const authError = ref(false);
const currentPage = ref('dashboard');
const articles = ref([]);
const editForm = ref({ id: null, title: '', category: '', date: '', excerpt: '', content: '', image: '/images/article-anxiety.png' });

const pageTitle = computed(() => {
  if (currentPage.value === 'dashboard') return 'Дашборд';
  if (currentPage.value === 'articles') return 'Все статьи';
  return editForm.value.id ? 'Редактировать статью' : 'Новая статья';
});

const categories = computed(() => getCategories());

const handleLogin = () => {
  if (password.value === 'admin123') {
    isAuthenticated.value = true;
    sessionStorage.setItem('vt_admin_session', '1');
    loadData();
  } else {
    authError.value = true;
    setTimeout(() => authError.value = false, 3000);
  }
};

const handleLogout = () => {
  isAuthenticated.value = false;
  sessionStorage.removeItem('vt_admin_session');
};

const loadData = () => {
  articles.value = getArticles();
};

const openEditor = (article) => {
  if (article) {
    editForm.value = { ...article };
  } else {
    editForm.value = { id: null, title: '', category: '', date: new Date().toISOString().split('T')[0], excerpt: '', content: '', image: '/images/article-anxiety.png' };
  }
  currentPage.value = 'editor';
};

const handleSubmitArticle = () => {
  const article = { ...editForm.value };
  if (!article.id) article.id = generateId();
  saveArticle(article);
  loadData();
  currentPage.value = 'articles';
};

const confirmDelete = (id) => {
  if (confirm('Удалить статью?')) {
    deleteArticle(id);
    loadData();
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ru-RU');
};

onMounted(() => {
  if (sessionStorage.getItem('vt_admin_session') === '1') {
    isAuthenticated.value = true;
    loadData();
  }
});
</script>

<style>
@import '../assets/css/admin.css';
.admin-view { min-height: 100vh; background: #f8fafc; }
</style>
