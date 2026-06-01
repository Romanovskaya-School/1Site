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
          <button class="nav-item" :class="{ active: activePage === 'settings' }" @click="showPage('settings')">
            <span class="nav-icon">⚙️</span> Настройки сайта
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
              <div class="form-group">
                <label>Изображение статьи</label>
                <div class="image-upload-wrap">
                  <img :src="editArticle.image" class="image-preview" :class="{ show: editArticle.image }" />
                  <label class="image-upload-btn">
                    <span>{{ editArticle.image ? 'Сменить картинку' : 'Загрузить картинку' }}</span>
                    <input type="file" accept="image/*" @change="onImageSelected" style="display: none;" />
                  </label>
                  <button v-if="editArticle.image" type="button" class="btn btn-danger btn-sm" @click="editArticle.image = ''">Удалить</button>
                </div>
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
              <button class="btn btn-primary btn-sm" @click="showPage('testEditor', 'new')">+ Добавить тест</button>
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
                    <button class="btn btn-danger btn-sm" @click="askDeleteTest(t.id)" style="margin-left: 8px;">🗑</button>
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

              <!-- Options section -->
              <div class="form-section-title">
                Варианты ответов
                <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addTestOption" v-if="editTest.options">+ Добавить</button>
                <button type="button" class="btn btn-outline btn-sm" style="margin-left: 12px; color: #e74c3c;" @click="editTest.options = null" v-if="editTest.options">Использовать стандартные варианты</button>
              </div>
              <div v-if="!editTest.options" style="margin-bottom: 16px;">
                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 8px;">Для этого теста используются стандартные варианты (Всегда, Часто, Иногда...). Хотите настроить свои варианты баллов?</p>
                <button type="button" class="btn btn-primary btn-sm" @click="enableCustomOptions">Активировать кастомные баллы</button>
              </div>
              <div v-else class="options-container" style="display:flex; flex-direction:column; gap:8px; margin-bottom: 24px;">
                <div v-for="(opt, idx) in editTest.options" :key="'opt'+idx" style="display:flex; gap:12px; align-items:center; background: var(--bg-alt); padding: 8px 12px; border-radius: 8px;">
                  <div style="flex:2">
                    <label style="font-size:0.8rem">Текст ответа</label>
                    <input type="text" v-model="editTest.options[idx].text" required style="padding:4px 8px"/>
                  </div>
                  <div style="flex:1">
                    <label style="font-size:0.8rem">Балл</label>
                    <input type="number" step="0.1" v-model="editTest.options[idx].value" required style="padding:4px 8px"/>
                  </div>
                  <div style="flex:1">
                    <label style="font-size:0.8rem">Реверс. балл</label>
                    <input type="number" step="0.1" v-model="editTest.options[idx].reverseValue" required style="padding:4px 8px"/>
                  </div>
                  <button type="button" class="btn btn-danger btn-sm" style="margin-top:20px" @click="removeTestOption(idx)">🗑</button>
                </div>
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
                      <option value="normal">Обычный (прямой балл)</option>
                      <option value="reverse">Обратный (реверс. балл)</option>
                      <option value="ignore">Не учитывается</option>
                    </select>
                  </div>
                </div>
                <button type="button" class="btn btn-danger btn-sm" @click="removeTestQuestion(i)">🗑</button>
              </div>

              <div class="form-section-title">
                Подсчет результатов
                <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="enableScales" v-if="!editTest.scales || editTest.scales.length === 0">Переключить на сложную шкалу</button>
              </div>

              <!-- Generic results -->
              <div v-if="!editTest.scales || editTest.scales.length === 0">
                <div style="display:flex; align-items:center; margin-bottom: 12px;">
                  <div style="font-weight: 600;">Пороги результатов ({{ editTest.results?.length || 0 }})</div>
                  <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addTestResult" v-if="editTest.results && editTest.results.length < 5">+ Добавить порог</button>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px;">Укажите максимальный балл, при достижении которого будет показана рекомендация. Пороги должны идти по возрастанию (например: 10, 20, 30, 999).</p>
                
                <div v-for="(r, i) in editTest.results" :key="'r'+i" class="form-group" style="background: var(--bg-alt); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border); position: relative;">
                  <button type="button" class="btn btn-danger btn-sm" style="position: absolute; top: 12px; right: 12px;" @click="removeTestResult(i)" v-if="editTest.results && editTest.results.length > 1">🗑</button>
                  <div style="font-weight: 600; margin-bottom: 8px;">Порог {{ i + 1 }}</div>
                  <div style="display: flex; gap: 16px;">
                    <div style="width: 120px;">
                      <label>До (баллов)</label>
                      <input type="number" step="0.1" v-model="editTest.results[i].max" required />
                    </div>
                    <div style="flex: 1;">
                      <label>Текст рекомендации (поддерживает HTML)</label>
                      <input type="text" v-model="editTest.results[i].text" required />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Scales -->
              <div v-else>
                <div style="display:flex; align-items:center; margin-bottom: 16px;">
                  <button type="button" class="btn btn-primary btn-sm" @click="addTestScale">+ Добавить шкалу</button>
                  <button type="button" class="btn btn-outline btn-sm" style="margin-left: auto;" @click="disableScales">Отключить сложные шкалы</button>
                </div>

                <div v-for="(scale, sIdx) in editTest.scales" :key="'scale'+sIdx" style="background: var(--bg-alt); padding: 16px; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 24px; position: relative;">
                  <button type="button" class="btn btn-danger btn-sm" style="position: absolute; top: 12px; right: 12px;" @click="removeTestScale(sIdx)">🗑 Удалить шкалу</button>
                  <h4 style="margin-bottom: 16px;">Шкала {{ sIdx + 1 }}</h4>
                  
                  <div style="display:flex; gap:16px; margin-bottom: 16px; flex-wrap:wrap;">
                    <div style="flex:2; min-width: 200px;">
                      <label>Название шкалы</label>
                      <input type="text" v-model="editTest.scales[sIdx].name" required />
                    </div>
                    <div style="flex:1; min-width: 100px;">
                      <label>Вопросы с №</label>
                      <input type="number" :value="(editTest.scales[sIdx].range?.[0] || 0) + 1" @input="updateScaleRange(sIdx, 0, $event.target.value)" required />
                    </div>
                    <div style="flex:1; min-width: 100px;">
                      <label>по №</label>
                      <input type="number" :value="(editTest.scales[sIdx].range?.[1] || 0) + 1" @input="updateScaleRange(sIdx, 1, $event.target.value)" required />
                    </div>
                    <div style="flex:1; min-width: 100px;">
                      <label>Делитель</label>
                      <input type="number" step="0.1" v-model="editTest.scales[sIdx].divider" required />
                    </div>
                  </div>

                  <div style="background: rgba(255,255,255,0.5); padding: 12px; border-radius: 8px;">
                    <div style="display:flex; align-items:center; margin-bottom: 12px;">
                      <div style="font-weight: 600; font-size:0.9rem">Пороги шкалы</div>
                      <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addScaleResult(sIdx)">+ Добавить порог</button>
                    </div>

                    <div v-for="(r, i) in editTest.scales[sIdx].results" :key="'sr'+i" style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                      <div style="width: 100px;">
                        <input type="number" step="0.1" v-model="editTest.scales[sIdx].results[i].max" placeholder="Макс. балл" required />
                      </div>
                      <div style="flex: 1;">
                        <input type="text" v-model="editTest.scales[sIdx].results[i].text" placeholder="Текст рекомендации" required />
                      </div>
                      <button type="button" class="btn btn-danger btn-sm" @click="removeScaleResult(sIdx, i)">🗑</button>
                    </div>
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

        <!-- Settings Page -->
        <div class="page" :class="{ active: activePage === 'settings' }">
          <div class="form-card">
            <h3>Настройки внешнего вида и контента</h3>
            
            <div class="form-section-title">Фотографии на сайте</div>
            
            <div class="form-group">
              <label>Главное фото на главном экране (Hero Image)</label>
              <div class="image-upload-wrap">
                <img :src="siteData.heroImage" class="image-preview" :class="{ show: siteData.heroImage }" style="width: 100px; height: 130px; object-fit: cover; border-radius: 8px;" />
                <label class="image-upload-btn">
                  <span>{{ siteData.heroImage ? 'Сменить фото' : 'Загрузить фото' }}</span>
                  <input type="file" accept="image/*" @change="onSiteImageSelected($event, 'heroImage')" style="display: none;" />
                </label>
                <button v-if="siteData.heroImage" type="button" class="btn btn-danger btn-sm" @click="siteData.heroImage = ''">Удалить</button>
              </div>
            </div>

            <div class="form-group">
              <label>Фото для страницы "Обо мне" (About Image)</label>
              <div class="image-upload-wrap">
                <img :src="siteData.aboutImage" class="image-preview" :class="{ show: siteData.aboutImage }" style="width: 100px; height: 130px; object-fit: cover; border-radius: 8px;" />
                <label class="image-upload-btn">
                  <span>{{ siteData.aboutImage ? 'Сменить фото' : 'Загрузить фото' }}</span>
                  <input type="file" accept="image/*" @change="onSiteImageSelected($event, 'aboutImage')" style="display: none;" />
                </label>
                <button v-if="siteData.aboutImage" type="button" class="btn btn-danger btn-sm" @click="siteData.aboutImage = ''">Удалить</button>
              </div>
            </div>

            <div class="form-group">
              <label>Фото для страницы "РПП" (RPP Image)</label>
              <div class="image-upload-wrap">
                <img :src="siteData.rppImage" class="image-preview" :class="{ show: siteData.rppImage }" style="width: 100px; height: 130px; object-fit: cover; border-radius: 8px;" />
                <label class="image-upload-btn">
                  <span>{{ siteData.rppImage ? 'Сменить фото' : 'Загрузить фото' }}</span>
                  <input type="file" accept="image/*" @change="onSiteImageSelected($event, 'rppImage')" style="display: none;" />
                </label>
                <button v-if="siteData.rppImage" type="button" class="btn btn-danger btn-sm" @click="siteData.rppImage = ''">Удалить</button>
              </div>
            </div>

            <div class="form-section-title">Текстовый контент и контакты</div>

            <div class="form-group">
              <label>Заголовок главного экрана (Hero Title - поддерживает HTML тег &lt;em&gt; для курсива)</label>
              <input type="text" v-model="siteData.heroTitle" placeholder="Бережная психологическая помощь <em>онлайн</em>" required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark);" />
            </div>

            <div class="form-group">
              <label>Описание главного экрана (Hero Description)</label>
              <textarea v-model="siteData.heroDesc" rows="3" placeholder="Описание деятельности психолога..." required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark); resize: vertical;"></textarea>
            </div>

            <div class="form-group">
              <label>Имя/Заголовок на странице "Обо мне"</label>
              <input type="text" v-model="siteData.aboutTitle" placeholder="Виктория Терехова" required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark);" />
            </div>

            <div class="form-group">
              <label>Абзац 1 страницы "Обо мне" (Приветствие)</label>
              <textarea v-model="siteData.aboutP1" rows="3" placeholder="Приветствие и общая информация..." required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark); resize: vertical;"></textarea>
            </div>

            <div class="form-group">
              <label>Абзац 2 страницы "Обо мне" (Подходы / Опыт)</label>
              <textarea v-model="siteData.aboutP2" rows="3" placeholder="Опыт, методы работы, принципы..." required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark); resize: vertical;"></textarea>
            </div>

            <div class="form-group">
              <label>Ссылка на Telegram (полная ссылка)</label>
              <input type="text" v-model="siteData.contactTg" placeholder="https://t.me/username" required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark);" />
            </div>

            <div class="form-group">
              <label>Ссылка на WhatsApp (полная ссылка)</label>
              <input type="text" v-model="siteData.contactWa" placeholder="https://wa.me/79991234567" required style="width: 100%; padding: 10px; border: 1.5px solid rgba(72, 164, 165, 0.22); border-radius: 8px; background: var(--cream); outline: none; font-family: inherit; font-size: 0.95rem; color: var(--text-dark);" />
            </div>

            <div class="form-section-title">
              Дипломы и сертификаты ({{ siteData.diplomas?.length || 0 }})
              <button type="button" class="btn btn-outline btn-sm" style="margin-left: 16px;" @click="addDiploma">+ Добавить диплом</button>
            </div>
            
            <div class="diplomas-container" style="display:flex; flex-direction:column; gap:16px; margin-bottom: 24px; margin-top: 16px;">
              <div v-for="(dip, idx) in siteData.diplomas" :key="idx" style="background: var(--cream); padding: 16px; border-radius: 12px; border: 1.5px solid rgba(72, 164, 165, 0.22);">
                <div style="display:flex; gap:16px; align-items:flex-start; flex-wrap:wrap;">
                  <div style="width: 120px;">
                    <img :src="dip.image" class="image-preview" :class="{ show: dip.image }" style="width: 100px; height: 130px; object-fit: cover; border-radius: 8px;" />
                    <label class="image-upload-btn btn-sm" style="margin-top: 8px; width: 100px; justify-content: center; padding: 6px; cursor: pointer;">
                      <span style="font-size: 0.75rem;">Загрузить</span>
                      <input type="file" accept="image/*" @change="onDiplomaImageSelected($event, idx)" style="display: none;" />
                    </label>
                  </div>
                  <div style="flex:1; display:flex; flex-direction:column; gap:8px;">
                    <label style="font-weight: 600; font-size: 0.85rem; color: var(--text-mid);">Описание диплома / сертификата</label>
                    <input type="text" v-model="siteData.diplomas[idx].title" placeholder="например: Специализация КПТ" required style="width:100%; padding:8px; border:1px solid rgba(72, 164, 165, 0.22); border-radius:6px; background:var(--cream); outline:none;" />
                  </div>
                  <button type="button" class="btn btn-danger btn-sm" @click="removeDiploma(idx)" style="align-self: center;">Удалить диплом</button>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-primary" @click="saveSettings">Сохранить изменения</button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Confirm Modal -->
    <div id="confirmModal" :class="{ open: pendingDeleteId || pendingDeleteTestId }" @click="pendingDeleteId = null; pendingDeleteTestId = null">
      <div class="modal-card" @click.stop>
        <h3 v-if="pendingDeleteId">Удалить статью?</h3>
        <h3 v-else>Удалить тест?</h3>
        <p>Это действие нельзя отменить. Запись будет удалена навсегда.</p>
        <div class="modal-actions">
          <button class="btn btn-danger" @click="pendingDeleteId ? confirmDelete() : confirmDeleteTest()">Да, удалить</button>
          <button class="btn btn-outline" @click="pendingDeleteId = null; pendingDeleteTestId = null">Отмена</button>
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
const pendingDeleteTestId = ref(null)
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
    if (arg && arg !== 'new') {
      editTest.value = JSON.parse(JSON.stringify(siteData.tests.find(t => t.id === arg)))
      // Ensure backwards compatibility with old string questions
      editTest.value.questions = editTest.value.questions.map(q => {
        if (typeof q === 'string') {
          return { text: q, type: 'normal' }
        }
        return q
      })
    } else {
      // Create new test
      editTest.value = {
        id: 'test-' + Date.now(),
        title: 'Новый тест',
        subtitle: '0 вопросов',
        questions: [],
        results: [{ max: 999, text: 'Результат по умолчанию' }]
      }
    }
  }
}

const saveTest = () => {
    const index = siteData.tests.findIndex(t => t.id === editTest.value.id)
    editTest.value.subtitle = `${editTest.value.questions.length} вопросов`
    if (index !== -1) {
        siteData.tests[index] = editTest.value
    } else {
        siteData.tests.push(editTest.value)
    }
    saveSiteData(siteData)
    showToast('✅ Тест сохранен', 'success')
    showPage('tests')
}

const askDeleteTest = (id) => {
    pendingDeleteTestId.value = id
}

const confirmDeleteTest = () => {
    const index = siteData.tests.findIndex(t => t.id === pendingDeleteTestId.value)
    if (index !== -1) {
        siteData.tests.splice(index, 1)
        saveSiteData(siteData)
        showToast('🗑 Тест удален', 'error')
    }
    pendingDeleteTestId.value = null
}

const addTestQuestion = () => {
    editTest.value.questions.push({ text: '', type: 'normal' })
}

const removeTestQuestion = (index) => {
    if (confirm('Удалить этот вопрос?')) {
        editTest.value.questions.splice(index, 1)
    }
}

const enableCustomOptions = () => {
    editTest.value.options = [
      { text: 'Всегда', value: 5, reverseValue: 0 },
      { text: 'Очень часто', value: 4, reverseValue: 1 },
      { text: 'Часто', value: 3, reverseValue: 2 },
      { text: 'Иногда', value: 2, reverseValue: 3 },
      { text: 'Редко', value: 1, reverseValue: 4 },
      { text: 'Никогда', value: 0, reverseValue: 5 }
    ]
}

const addTestOption = () => {
    editTest.value.options.push({ text: 'Новый вариант', value: 0, reverseValue: 0 })
}

const removeTestOption = (idx) => {
    editTest.value.options.splice(idx, 1)
}

const addTestResult = () => {
    if (!editTest.value.results) editTest.value.results = []
    if (editTest.value.results.length < 5) {
        editTest.value.results.push({ max: 999, text: 'Новый результат' })
    }
}

const removeTestResult = (index) => {
    if (editTest.value.results && editTest.value.results.length > 1) {
        editTest.value.results.splice(index, 1)
    }
}

const enableScales = () => {
    editTest.value.scales = [
        {
            name: 'Новая шкала',
            range: [0, Math.max(0, editTest.value.questions.length - 1)],
            divider: 1,
            results: [{ max: 999, text: 'Результат шкалы' }]
        }
    ]
}

const disableScales = () => {
    if (confirm('Вы уверены? Это удалит все настроенные сложные шкалы.')) {
        editTest.value.scales = []
        if (!editTest.value.results || editTest.value.results.length === 0) {
            editTest.value.results = [{ max: 999, text: 'Общий результат' }]
        }
    }
}

const addTestScale = () => {
    editTest.value.scales.push({
        name: 'Новая шкала',
        range: [0, 0],
        divider: 1,
        results: [{ max: 999, text: 'Результат шкалы' }]
    })
}

const removeTestScale = (sIdx) => {
    editTest.value.scales.splice(sIdx, 1)
}

const updateScaleRange = (sIdx, boundIndex, value) => {
    const val = parseInt(value, 10) - 1
    if (!isNaN(val)) {
        if (!editTest.value.scales[sIdx].range) editTest.value.scales[sIdx].range = [0, 0]
        editTest.value.scales[sIdx].range[boundIndex] = val
    }
}

const addScaleResult = (sIdx) => {
    editTest.value.scales[sIdx].results.push({ max: 999, text: 'Рекомендация' })
}

const removeScaleResult = (sIdx, rIdx) => {
    editTest.value.scales[sIdx].results.splice(rIdx, 1)
}

const compressImage = (file, callback) => {
  const reader = new FileReader()
  reader.onload = (event) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      const MAX_WIDTH = 800
      const MAX_HEIGHT = 600
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75)
      callback(compressedDataUrl)
    }
    img.src = event.target.result
  }
  reader.readAsDataURL(file)
}

const onImageSelected = (e) => {
  const file = e.target.files[0]
  if (!file) return
  compressImage(file, (dataUrl) => {
    editArticle.value.image = dataUrl
  })
}

const onSiteImageSelected = (e, field) => {
  const file = e.target.files[0]
  if (!file) return
  compressImage(file, (dataUrl) => {
    siteData[field] = dataUrl
  })
}

const onDiplomaImageSelected = (e, idx) => {
  const file = e.target.files[0]
  if (!file) return
  compressImage(file, (dataUrl) => {
    siteData.diplomas[idx].image = dataUrl
  })
}

const addDiploma = () => {
  if (!siteData.diplomas) {
    siteData.diplomas = []
  }
  siteData.diplomas.push({ title: 'Новый диплом', image: '' })
}

const removeDiploma = (idx) => {
  if (confirm('Удалить этот диплом?')) {
    siteData.diplomas.splice(idx, 1)
  }
}

const saveSettings = () => {
  saveSiteData(siteData)
  showToast('✅ Настройки сохранены', 'success')
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
  if (!siteData.diplomas) {
    siteData.diplomas = [
      { title: 'Высшее профильное образование', image: '' },
      { title: 'Специализация КПТ', image: '' },
      { title: 'Специализация Гештальт', image: '' }
    ]
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
