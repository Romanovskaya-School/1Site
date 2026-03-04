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
  { key: 'about.text1', label: 'Обо мне: абзац 1', section: 'about', long: true },
  { key: 'about.text2', label: 'Обо мне: абзац 2', section: 'about', long: true },
  { key: 'about.text3', label: 'Обо мне: абзац 3', section: 'about', long: true },
  { key: 'about.education.title', label: 'Обо мне: блок «Образование» — заголовок', section: 'about', long: false },
  { key: 'about.education.text', label: 'Обо мне: блок «Образование» — текст (можно <br />)', section: 'about', long: true, html: true },
  { key: 'about.format.title', label: 'Обо мне: блок «Формат работы» — заголовок', section: 'about', long: false },
  { key: 'about.format.text', label: 'Обо мне: блок «Формат работы» — текст (можно <br />)', section: 'about', long: true, html: true },
  { key: 'about.approach.title', label: 'Обо мне: блок «Подход» — заголовок', section: 'about', long: false },
  { key: 'about.approach.text', label: 'Обо мне: блок «Подход» — текст (можно <br />)', section: 'about', long: true, html: true },
  { key: 'about.clients.title', label: 'Обо мне: блок «Клиенты» — заголовок', section: 'about', long: false },
  { key: 'about.clients.text', label: 'Обо мне: блок «Клиенты» — текст (можно <br />)', section: 'about', long: true, html: true },
  { key: 'services.kicker', label: 'Маленький заголовок блока услуг', section: 'services', long: false },
  { key: 'services.title', label: 'Заголовок блока «Услуги и стоимость»', section: 'services', long: false },
  { key: 'services.subtitle', label: 'Подзаголовок блока услуг', section: 'services', long: true },
  { key: 'card1.title', label: 'Карточка 1: название (например: Индивидуальная консультация)', section: 'services', long: false },
  { key: 'card1.duration', label: 'Карточка 1: длительность (60 минут)', section: 'services', long: false },
  { key: 'card1.price', label: 'Карточка 1: цена (можно 4&nbsp;000&nbsp;₽)', section: 'services', long: false, html: true },
  { key: 'card1.text', label: 'Карточка 1: описание', section: 'services', long: true },
  { key: 'card1.note', label: 'Карточка 1: примечание под кнопкой', section: 'services', long: false },
  { key: 'card1.button', label: 'Карточка 1: текст кнопки', section: 'services', long: false },
  { key: 'card2.title', label: 'Карточка 2: название', section: 'services', long: false },
  { key: 'card2.duration', label: 'Карточка 2: длительность', section: 'services', long: false },
  { key: 'card2.price', label: 'Карточка 2: цена (можно 8&nbsp;000&nbsp;₽)', section: 'services', long: false, html: true },
  { key: 'card2.label', label: 'Карточка 2: маленький бейдж над описанием', section: 'services', long: false },
  { key: 'card2.text', label: 'Карточка 2: описание', section: 'services', long: true },
  { key: 'card2.note', label: 'Карточка 2: примечание под описанием', section: 'services', long: false },
  { key: 'card2.button', label: 'Карточка 2: текст кнопки', section: 'services', long: false },
  { key: 'card3.title', label: 'Карточка 3: название', section: 'services', long: false },
  { key: 'card3.duration', label: 'Карточка 3: длительность', section: 'services', long: false },
  { key: 'card3.price', label: 'Карточка 3: цена (можно 17&nbsp;000&nbsp;₽)', section: 'services', long: false, html: true },
  { key: 'card3.text', label: 'Карточка 3: описание', section: 'services', long: true },
  { key: 'card3.note', label: 'Карточка 3: примечание под описанием', section: 'services', long: false },
  { key: 'card3.button', label: 'Карточка 3: текст кнопки', section: 'services', long: false },
  { key: 'card4.title', label: 'Карточка 4: название', section: 'services', long: false },
  { key: 'card4.duration', label: 'Карточка 4: длительность', section: 'services', long: false },
  { key: 'card4.price', label: 'Карточка 4: цена (можно 36&nbsp;000&nbsp;₽)', section: 'services', long: false, html: true },
  { key: 'card4.text', label: 'Карточка 4: описание', section: 'services', long: true },
  { key: 'card4.note', label: 'Карточка 4: примечание под описанием', section: 'services', long: false },
  { key: 'card4.button', label: 'Карточка 4: текст кнопки', section: 'services', long: false },
  { key: 'home.come.title', label: 'Главная: заголовок блока «С чем вы можете прийти ко мне»', section: 'services', long: false },
  { key: 'home.come.item1', label: 'Главная: список «С чем вы можете прийти» — пункт 1', section: 'services', long: true },
  { key: 'home.come.item2', label: 'Главная: список «С чем вы можете прийти» — пункт 2', section: 'services', long: true },
  { key: 'home.come.item3', label: 'Главная: список «С чем вы можете прийти» — пункт 3', section: 'services', long: true },
  { key: 'home.come.item4', label: 'Главная: список «С чем вы можете прийти» — пункт 4', section: 'services', long: true },
  { key: 'home.come.item5', label: 'Главная: список «С чем вы можете прийти» — пункт 5', section: 'services', long: true },
  { key: 'home.come.item6', label: 'Главная: список «С чем вы можете прийти» — пункт 6', section: 'services', long: true },
  { key: 'home.come.item7', label: 'Главная: список «С чем вы можете прийти» — пункт 7', section: 'services', long: true },
  { key: 'home.come.note', label: 'Главная: текст‑пояснение под списком «С чем вы можете прийти»', section: 'services', long: true },
  { key: 'pricing.note', label: 'Общее примечание к ценам (можно <strong>, <br />)', section: 'services', long: true, html: true },
  { key: 'articles.kicker', label: 'Маленький заголовок блока статей', section: 'articles', long: false },
  { key: 'articles.title', label: 'Заголовок блока «Статьи»', section: 'articles', long: false },
  { key: 'articles.subtitle', label: 'Подзаголовок блока статей', section: 'articles', long: true },
  { key: 'contact.kicker', label: 'Маленький заголовок блока контактов', section: 'contact', long: false },
  { key: 'contact.title', label: 'Заголовок блока «Контакты»', section: 'contact', long: false },
  { key: 'contact.subtitle', label: 'Подзаголовок (как записаться)', section: 'contact', long: true },
  { key: 'contact.phone.label', label: 'Контакты: подпись «Телефон»', section: 'contact', long: false },
  { key: 'contact.phone.href', label: 'Контакты: ссылка телефона (tel:+...)', section: 'contact', long: false },
  { key: 'contact.phone.display', label: 'Контакты: отображаемый номер телефона', section: 'contact', long: false },
  { key: 'contact.email.label', label: 'Контакты: подпись «E‑mail»', section: 'contact', long: false },
  { key: 'contact.email.href', label: 'Контакты: ссылка почты (mailto:...)', section: 'contact', long: false },
  { key: 'contact.email.display', label: 'Контакты: отображаемый e‑mail', section: 'contact', long: false },
  { key: 'contact.confidentiality', label: 'Контакты: текст о конфиденциальности', section: 'contact', long: true },
  { key: 'footer.text1', label: 'Подвал: первая строка (можно © <span id=\"year\"></span> …)', section: 'footer', long: false, html: true },
  { key: 'footer.text2', label: 'Подвал: вторая строка', section: 'footer', long: false },
  // Главная: блок с тремя основными разделами
  { key: 'sections.kicker', label: 'Главная: подпись над блоком разделов', section: 'sections', long: false },
  { key: 'sections.title', label: 'Главная: заголовок блока разделов', section: 'sections', long: false },
  { key: 'sections.family.title', label: 'Главная: карточка раздела 1 — заголовок', section: 'sections', long: false },
  { key: 'sections.family.text', label: 'Главная: карточка раздела 1 — описание', section: 'sections', long: true },
  { key: 'sections.personal.title', label: 'Главная: карточка раздела 2 — заголовок', section: 'sections', long: false },
  { key: 'sections.personal.text', label: 'Главная: карточка раздела 2 — описание', section: 'sections', long: true },
  { key: 'sections.rpp.title', label: 'Главная: карточка раздела 3 — заголовок', section: 'sections', long: false },
  { key: 'sections.rpp.text', label: 'Главная: карточка раздела 3 — описание', section: 'sections', long: true },
  // Главная: тест «Есть ли у вас РПП?»
  { key: 'rppQuiz.kicker', label: 'Тест РПП: маленький заголовок', section: 'quiz', long: false },
  { key: 'rppQuiz.title', label: 'Тест РПП: заголовок блока', section: 'quiz', long: false },
  { key: 'rppQuiz.subtitle', label: 'Тест РПП: подзаголовок', section: 'quiz', long: true },
  { key: 'rppQuiz.threshold', label: 'Тест РПП: порог количества «Да» для рекомендации (число)', section: 'quiz', long: false },
  { key: 'rppQuiz.q1', label: 'Тест РПП: вопрос 1', section: 'quiz', long: true },
  { key: 'rppQuiz.q2', label: 'Тест РПП: вопрос 2', section: 'quiz', long: true },
  { key: 'rppQuiz.q3', label: 'Тест РПП: вопрос 3', section: 'quiz', long: true },
  { key: 'rppQuiz.q4', label: 'Тест РПП: вопрос 4', section: 'quiz', long: true },
  { key: 'rppQuiz.q5', label: 'Тест РПП: вопрос 5', section: 'quiz', long: true },
  { key: 'rppQuiz.q6', label: 'Тест РПП: вопрос 6', section: 'quiz', long: true },
  { key: 'rppQuiz.q7', label: 'Тест РПП: вопрос 7', section: 'quiz', long: true },
  { key: 'rppQuiz.q8', label: 'Тест РПП: вопрос 8', section: 'quiz', long: true },
  { key: 'rppQuiz.q9', label: 'Тест РПП: вопрос 9', section: 'quiz', long: true },
  { key: 'rppQuiz.q10', label: 'Тест РПП: вопрос 10', section: 'quiz', long: true },
  // Семейная психология
  { key: 'family.title', label: 'Семейная психология: заголовок страницы', section: 'family', long: false },
  { key: 'family.subtitle', label: 'Семейная психология: подзаголовок страницы', section: 'family', long: true },
  { key: 'family.kicker', label: 'Семейная психология: маленький заголовок', section: 'family', long: false },
  { key: 'family.overview.title', label: 'Семейная психология: заголовок блока «С чем можно прийти»', section: 'family', long: false },
  { key: 'family.couples.title', label: 'Семейная психология: Подраздел 1.1 — Для пар — заголовок', section: 'family', long: false },
  { key: 'family.couples.joint.title', label: 'Для пар: Консультации для пар — заголовок', section: 'family', long: false },
  { key: 'family.couples.joint.text', label: 'Для пар: Консультации для пар — описание', section: 'family', long: true },
  { key: 'family.couples.conflicts.title', label: 'Для пар: Конфликты в семье — заголовок', section: 'family', long: false },
  { key: 'family.couples.conflicts.text', label: 'Для пар: Конфликты в семье — описание', section: 'family', long: true },
  { key: 'family.couples.individual.title', label: 'Для пар: Индивидуальные консультации супругов — заголовок', section: 'family', long: false },
  { key: 'family.couples.individual.text', label: 'Для пар: Индивидуальные консультации супругов — описание', section: 'family', long: true },
  { key: 'family.parents.title', label: 'Семейная психология: Подраздел 1.2 — Детско‑родительские отношения — заголовок', section: 'family', long: false },
  { key: 'family.parents.consult.title', label: 'Детско‑родительские: Консультации для родителей — заголовок', section: 'family', long: false },
  { key: 'family.parents.consult.text', label: 'Детско‑родительские: Консультации для родителей — описание', section: 'family', long: true },
  { key: 'family.parents.joint.title', label: 'Детско‑родительские: Для родителей и детей — заголовок', section: 'family', long: false },
  { key: 'family.parents.joint.text', label: 'Детско‑родительские: Для родителей и детей — описание', section: 'family', long: true },
  { key: 'family.parents.teens.title', label: 'Детско‑родительские: Поддержка подростков — заголовок', section: 'family', long: false },
  { key: 'family.parents.teens.text', label: 'Детско‑родительские: Поддержка подростков — описание', section: 'family', long: true },
  // Личная терапия и самореализация
  { key: 'personal.title', label: 'Личная терапия: заголовок страницы', section: 'personal', long: false },
  { key: 'personal.kicker', label: 'Личная терапия: маленький заголовок', section: 'personal', long: false },
  { key: 'personal.overview.title', label: 'Личная терапия: заголовок блока «Темы»', section: 'personal', long: false },
  { key: 'personal.overview.subtitle', label: 'Личная терапия: подзаголовок блока «Темы»', section: 'personal', long: true },
  { key: 'personal.selfesteem.title', label: 'Подраздел 2.1 — Работа с самооценкой — заголовок', section: 'personal', long: false },
  { key: 'personal.selfesteem.confidence.title', label: 'Самооценка: Повышение самооценки — заголовок', section: 'personal', long: false },
  { key: 'personal.selfesteem.confidence.text', label: 'Самооценка: Повышение самооценки — описание', section: 'personal', long: true },
  { key: 'personal.selfesteem.acceptance.title', label: 'Самооценка: Принятие себя — заголовок', section: 'personal', long: false },
  { key: 'personal.selfesteem.acceptance.text', label: 'Самооценка: Принятие себя — описание', section: 'personal', long: true },
  { key: 'personal.selfesteem.body.title', label: 'Самооценка: Работа с телом — заголовок', section: 'personal', long: false },
  { key: 'personal.selfesteem.body.text', label: 'Самооценка: Работа с телом — описание', section: 'personal', long: true },
  { key: 'personal.search.title', label: 'Подраздел 2.2 — Поиск себя и мотивация — заголовок', section: 'personal', long: false },
  { key: 'personal.search.dontknow.title', label: 'Поиск себя: «Я не знаю, чего хочу» — заголовок', section: 'personal', long: false },
  { key: 'personal.search.dontknow.text', label: 'Поиск себя: «Я не знаю, чего хочу» — описание', section: 'personal', long: true },
  { key: 'personal.search.motivation.title', label: 'Поиск себя: Мотивация и дисциплина — заголовок', section: 'personal', long: false },
  { key: 'personal.search.motivation.text', label: 'Поиск себя: Мотивация и дисциплина — описание', section: 'personal', long: true },
  { key: 'personal.search.procrastination.title', label: 'Поиск себя: Прокрастинация — заголовок', section: 'personal', long: false },
  { key: 'personal.search.procrastination.text', label: 'Поиск себя: Прокрастинация — описание', section: 'personal', long: true },
  { key: 'personal.emotions.title', label: 'Подраздел 2.3 — Эмоциональные состояния — заголовок', section: 'personal', long: false },
  { key: 'personal.emotions.anxiety.title', label: 'Эмоции: Тревога и стресс — заголовок', section: 'personal', long: false },
  { key: 'personal.emotions.anxiety.text', label: 'Эмоции: Тревога и стресс — описание', section: 'personal', long: true },
  { key: 'personal.emotions.depression.title', label: 'Эмоции: Депрессия — заголовок', section: 'personal', long: false },
  { key: 'personal.emotions.depression.text', label: 'Эмоции: Депрессия — описание', section: 'personal', long: true },
  { key: 'personal.emotions.apathy.title', label: 'Эмоции: Нет сил и энергии — заголовок', section: 'personal', long: false },
  { key: 'personal.emotions.apathy.text', label: 'Эмоции: Нет сил и энергии — описание', section: 'personal', long: true },
  // РПП
  { key: 'rpp.title', label: 'РПП: заголовок страницы', section: 'rpp', long: false },
  { key: 'rpp.subtitle', label: 'РПП: подзаголовок страницы', section: 'rpp', long: true },
  { key: 'rpp.kicker', label: 'РПП: маленький заголовок', section: 'rpp', long: false },
  { key: 'rpp.overview.title', label: 'РПП: заголовок блока «С чем можно прийти»', section: 'rpp', long: false },
  { key: 'rpp.overview.subtitle', label: 'РПП: подзаголовок блока «С чем можно прийти»', section: 'rpp', long: true },
  { key: 'rpp.anorexia.title', label: 'РПП: Подраздел 2.1 — Анорексия — заголовок', section: 'rpp', long: false },
  { key: 'rpp.anorexia.text', label: 'РПП: Подраздел 2.1 — Анорексия — описание', section: 'rpp', long: true },
  { key: 'rpp.what.title', label: 'РПП: Подраздел 2.2 — Что такое РПП — заголовок', section: 'rpp', long: false },
  { key: 'rpp.what.text', label: 'РПП: Подраздел 2.2 — Что такое РПП — описание', section: 'rpp', long: true },
  { key: 'rpp.symptoms.title', label: 'РПП: Подраздел 2.3 — Симптомы РПП — заголовок', section: 'rpp', long: false },
  { key: 'rpp.symptoms.text', label: 'РПП: Подраздел 2.3 — Симптомы РПП — описание', section: 'rpp', long: true },
  { key: 'rpp.compulsive.title', label: 'РПП: Подраздел 2.4 — Компульсивное переедание — заголовок', section: 'rpp', long: false },
  { key: 'rpp.compulsive.text', label: 'РПП: Подраздел 2.4 — Компульсивное переедание — описание', section: 'rpp', long: true },
  { key: 'rpp.emotional.title', label: 'РПП: Подраздел 2.5 — Эмоциональное заедание — заголовок', section: 'rpp', long: false },
  { key: 'rpp.emotional.text', label: 'РПП: Подраздел 2.5 — Эмоциональное заедание — описание', section: 'rpp', long: true },
  { key: 'rpp.analysis.title', label: 'РПП: Подраздел 2.6 — Анализ пищевого поведения — заголовок', section: 'rpp', long: false },
  { key: 'rpp.analysis.text', label: 'РПП: Подраздел 2.6 — Анализ пищевого поведения — описание', section: 'rpp', long: true },
  // Детальные страницы тем — семейная психология
  { key: 'topic.family-couples-joint.description', label: '[Семейная] Консультации для пар: краткое описание на странице', section: 'family', long: true },
  { key: 'topic.family-couples-joint.details', label: '[Семейная] Консультации для пар: как выглядит проблема в жизни', section: 'family', long: true },
  { key: 'topic.family-couples-joint.help', label: '[Семейная] Консультации для пар: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-couples-joint.pricing', label: '[Семейная] Консультации для пар: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-couples-joint.articles', label: '[Семейная] Консультации для пар: статьи по теме', section: 'family', long: true },
  { key: 'topic.family-couples-conflicts.description', label: '[Семейная] Конфликты и кризисы: краткое описание на странице', section: 'family', long: true },
  { key: 'topic.family-couples-conflicts.details', label: '[Семейная] Конфликты и кризисы: как выглядит проблема в жизни', section: 'family', long: true },
  { key: 'topic.family-couples-conflicts.help', label: '[Семейная] Конфликты и кризисы: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-couples-conflicts.pricing', label: '[Семейная] Конфликты и кризисы: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-couples-conflicts.articles', label: '[Семейная] Конфликты и кризисы: статьи по теме', section: 'family', long: true },
  { key: 'topic.family-couples-individual.description', label: '[Семейная] Индивидуальные консультации супругов: краткое описание', section: 'family', long: true },
  { key: 'topic.family-couples-individual.details', label: '[Семейная] Индивидуальные консультации супругов: как выглядит запрос', section: 'family', long: true },
  { key: 'topic.family-couples-individual.help', label: '[Семейная] Индивидуальные консультации супругов: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-couples-individual.pricing', label: '[Семейная] Индивидуальные консультации супругов: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-couples-individual.articles', label: '[Семейная] Индивидуальные консультации супругов: статьи по теме', section: 'family', long: true },
  { key: 'topic.family-parents-consult.description', label: '[Семейная] Консультации для родителей: краткое описание', section: 'family', long: true },
  { key: 'topic.family-parents-consult.details', label: '[Семейная] Консультации для родителей: как выглядит запрос', section: 'family', long: true },
  { key: 'topic.family-parents-consult.help', label: '[Семейная] Консультации для родителей: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-parents-consult.pricing', label: '[Семейная] Консультации для родителей: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-parents-consult.articles', label: '[Семейная] Консультации для родителей: статьи по теме', section: 'family', long: true },
  { key: 'topic.family-parents-joint.description', label: '[Семейная] Родители и дети: краткое описание', section: 'family', long: true },
  { key: 'topic.family-parents-joint.details', label: '[Семейная] Родители и дети: как выглядит запрос', section: 'family', long: true },
  { key: 'topic.family-parents-joint.help', label: '[Семейная] Родители и дети: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-parents-joint.pricing', label: '[Семейная] Родители и дети: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-parents-joint.articles', label: '[Семейная] Родители и дети: статьи по теме', section: 'family', long: true },
  { key: 'topic.family-parents-teens.description', label: '[Семейная] Поддержка подростков: краткое описание', section: 'family', long: true },
  { key: 'topic.family-parents-teens.details', label: '[Семейная] Поддержка подростков: как выглядит запрос', section: 'family', long: true },
  { key: 'topic.family-parents-teens.help', label: '[Семейная] Поддержка подростков: как помогает терапия', section: 'family', long: true },
  { key: 'topic.family-parents-teens.pricing', label: '[Семейная] Поддержка подростков: формат и стоимость', section: 'family', long: true },
  { key: 'topic.family-parents-teens.articles', label: '[Семейная] Поддержка подростков: статьи по теме', section: 'family', long: true },
  // Детальные страницы тем — личная терапия
  { key: 'topic.personal-selfesteem-confidence.description', label: '[Личная] Самооценка и уверенность: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-confidence.details', label: '[Личная] Самооценка и уверенность: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-confidence.help', label: '[Личная] Самооценка и уверенность: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-confidence.pricing', label: '[Личная] Самооценка и уверенность: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-confidence.articles', label: '[Личная] Самооценка и уверенность: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-acceptance.description', label: '[Личная] Принятие себя: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-acceptance.details', label: '[Личная] Принятие себя: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-acceptance.help', label: '[Личная] Принятие себя: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-acceptance.pricing', label: '[Личная] Принятие себя: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-acceptance.articles', label: '[Личная] Принятие себя: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-body.description', label: '[Личная] Тело и самооценка: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-body.details', label: '[Личная] Тело и самооценка: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-body.help', label: '[Личная] Тело и самооценка: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-body.pricing', label: '[Личная] Тело и самооценка: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-selfesteem-body.articles', label: '[Личная] Тело и самооценка: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-search-dontknow.description', label: '[Личная] «Я не знаю, чего хочу»: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-search-dontknow.details', label: '[Личная] «Я не знаю, чего хочу»: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-search-dontknow.help', label: '[Личная] «Я не знаю, чего хочу»: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-search-dontknow.pricing', label: '[Личная] «Я не знаю, чего хочу»: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-search-dontknow.articles', label: '[Личная] «Я не знаю, чего хочу»: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-search-motivation.description', label: '[Личная] Мотивация и дисциплина: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-search-motivation.details', label: '[Личная] Мотивация и дисциплина: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-search-motivation.help', label: '[Личная] Мотивация и дисциплина: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-search-motivation.pricing', label: '[Личная] Мотивация и дисциплина: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-search-motivation.articles', label: '[Личная] Мотивация и дисциплина: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-search-procrastination.description', label: '[Личная] Прокрастинация: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-search-procrastination.details', label: '[Личная] Прокрастинация: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-search-procrastination.help', label: '[Личная] Прокрастинация: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-search-procrastination.pricing', label: '[Личная] Прокрастинация: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-search-procrastination.articles', label: '[Личная] Прокрастинация: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-emotions-anxiety.description', label: '[Личная] Тревога и стресс: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-emotions-anxiety.details', label: '[Личная] Тревога и стресс: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-emotions-anxiety.help', label: '[Личная] Тревога и стресс: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-emotions-anxiety.pricing', label: '[Личная] Тревога и стресс: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-emotions-anxiety.articles', label: '[Личная] Тревога и стресс: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-emotions-depression.description', label: '[Личная] Депрессия: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-emotions-depression.details', label: '[Личная] Депрессия: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-emotions-depression.help', label: '[Личная] Депрессия: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-emotions-depression.pricing', label: '[Личная] Депрессия: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-emotions-depression.articles', label: '[Личная] Депрессия: статьи по теме', section: 'personal', long: true },
  { key: 'topic.personal-emotions-apathy.description', label: '[Личная] Нет сил и энергии: краткое описание', section: 'personal', long: true },
  { key: 'topic.personal-emotions-apathy.details', label: '[Личная] Нет сил и энергии: как выглядит запрос', section: 'personal', long: true },
  { key: 'topic.personal-emotions-apathy.help', label: '[Личная] Нет сил и энергии: как помогает терапия', section: 'personal', long: true },
  { key: 'topic.personal-emotions-apathy.pricing', label: '[Личная] Нет сил и энергии: формат и стоимость', section: 'personal', long: true },
  { key: 'topic.personal-emotions-apathy.articles', label: '[Личная] Нет сил и энергии: статьи по теме', section: 'personal', long: true },
  // Детальные страницы тем — РПП
  { key: 'topic.rpp-anorexia.description', label: '[РПП] Анорексия: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-anorexia.details', label: '[РПП] Анорексия: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-anorexia.help', label: '[РПП] Анорексия: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-anorexia.pricing', label: '[РПП] Анорексия: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-anorexia.articles', label: '[РПП] Анорексия: статьи по теме', section: 'rpp', long: true },
  { key: 'topic.rpp-what-is.description', label: '[РПП] Что такое РПП: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-what-is.details', label: '[РПП] Что такое РПП: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-what-is.help', label: '[РПП] Что такое РПП: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-what-is.pricing', label: '[РПП] Что такое РПП: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-what-is.articles', label: '[РПП] Что такое РПП: статьи по теме', section: 'rpp', long: true },
  { key: 'topic.rpp-symptoms.description', label: '[РПП] Симптомы РПП: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-symptoms.details', label: '[РПП] Симптомы РПП: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-symptoms.help', label: '[РПП] Симптомы РПП: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-symptoms.pricing', label: '[РПП] Симптомы РПП: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-symptoms.articles', label: '[РПП] Симптомы РПП: статьи по теме', section: 'rpp', long: true },
  { key: 'topic.rpp-compulsive.description', label: '[РПП] Компульсивное переедание: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-compulsive.details', label: '[РПП] Компульсивное переедание: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-compulsive.help', label: '[РПП] Компульсивное переедание: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-compulsive.pricing', label: '[РПП] Компульсивное переедание: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-compulsive.articles', label: '[РПП] Компульсивное переедание: статьи по теме', section: 'rpp', long: true },
  { key: 'topic.rpp-emotional.description', label: '[РПП] Эмоциональное заедание: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-emotional.details', label: '[РПП] Эмоциональное заедание: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-emotional.help', label: '[РПП] Эмоциональное заедание: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-emotional.pricing', label: '[РПП] Эмоциональное заедание: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-emotional.articles', label: '[РПП] Эмоциональное заедание: статьи по теме', section: 'rpp', long: true },
  { key: 'topic.rpp-analysis.description', label: '[РПП] Анализ пищевого поведения: краткое описание', section: 'rpp', long: true },
  { key: 'topic.rpp-analysis.details', label: '[РПП] Анализ пищевого поведения: как выглядит запрос', section: 'rpp', long: true },
  { key: 'topic.rpp-analysis.help', label: '[РПП] Анализ пищевого поведения: как помогает терапия', section: 'rpp', long: true },
  { key: 'topic.rpp-analysis.pricing', label: '[РПП] Анализ пищевого поведения: формат и стоимость', section: 'rpp', long: true },
  { key: 'topic.rpp-analysis.articles', label: '[РПП] Анализ пищевого поведения: статьи по теме', section: 'rpp', long: true },
]

const SECTIONS = [
  { id: 'general', title: 'Общее' },
  { id: 'header', title: 'Шапка и меню' },
  { id: 'hero', title: 'Главный экран' },
  { id: 'about', title: 'Обо мне' },
  { id: 'services', title: 'Услуги и цены' },
  { id: 'articles', title: 'Статьи' },
  { id: 'contact', title: 'Контакты' },
  { id: 'footer', title: 'Подвал' },
  { id: 'sections', title: 'Главная: блок разделов' },
  { id: 'quiz', title: 'Главная — тест «Есть ли у вас РПП?»' },
  { id: 'family', title: 'Раздел 1 — Семейная психология' },
  { id: 'personal', title: 'Раздел 2 — Личная терапия и самореализация' },
  { id: 'rpp', title: 'Раздел 3 — РПП' },
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
  font-size: 1rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
}
.cms-link:hover {
  text-decoration: underline;
}

.cms-desc {
  margin: 0 0 12px;
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
}

.cms-status {
  font-size: 0.95rem;
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
  font-size: 0.95rem;
  font-weight: 500;
  color: #374151;
  line-height: 1.4;
}

.cms-hint {
  display: block;
  font-size: 0.85rem;
  font-weight: 400;
  color: #6b7280;
  margin-top: 2px;
}

.cms-input {
  width: 100%;
  font-size: 1rem;
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
