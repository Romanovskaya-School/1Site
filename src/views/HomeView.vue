<script setup>
import { ref, onMounted, nextTick } from 'vue'

const content = ref({})
const defaultFooterText1 =
  '© <span id="year"></span> Психолог Терёхина Виктория. Все права защищены.'

function setYear() {
  const yearEl = document.getElementById('year')
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString()
  }
}

function getValue(key, fallback = '') {
  return content.value?.[key]?.value ?? fallback
}

function getHtml(key, fallback = '') {
  return content.value?.[key]?.value ?? fallback
}

async function loadContent() {
  try {
    const res = await fetch('/api/content')
    if (!res.ok) return
    const data = await res.json()
    content.value = data || {}

    if (content.value['site.title']?.value) {
      document.title = content.value['site.title'].value
    }

    await nextTick()
    setYear()
  } catch {
    // если API недоступно — просто используем встроенные тексты
  }
}

onMounted(() => {
  setYear()
  loadContent()
})
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="container header-inner">
        <div class="logo">
          <div class="logo-mark" />
          <div>
            <div class="logo-text-main">
              {{ getValue('logo.main', 'Виктория Терёхина') }}
            </div>
            <div class="logo-text-sub">
              {{ getValue('logo.sub', 'интегративный семейный психолог') }}
            </div>
          </div>
        </div>
        <nav class="nav">
          <a href="#about">
            {{ getValue('nav.about', 'О психологе') }}
          </a>
          <a href="#services">
            {{ getValue('nav.services', 'Услуги и стоимость') }}
          </a>
          <a href="#articles">
            {{ getValue('nav.articles', 'Статьи') }}
          </a>
          <a href="#contact">
            {{ getValue('nav.contact', 'Контакты') }}
          </a>
          <button
            class="nav-cta"
            @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
            v-html="getHtml('nav.cta', 'Записаться <span>→</span>')"
          ></button>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <h1
              class="hero-title"
              v-html="
                getHtml(
                  'hero.title',
                  'Помогаю <span>найти опору</span><br />в себе и отношениях'
                )
              "
            ></h1>
            <div class="hero-cta-row">
              <button
                class="btn-primary"
                @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
                v-html="
                  getHtml(
                    'hero.cta.button',
                    'Записаться на консультацию <span>→</span>'
                  )
                "
              ></button>
            </div>
            <div
              class="hero-meta"
              v-html="
                getHtml(
                  'hero.meta',
                  '<strong>Формат:</strong> онлайн‑встреча в удобном для вас мессенджере. <br /><strong>Длительность:</strong> 60 или 120 минут.'
                )
              "
            ></div>
          </div>

          <aside class="hero-photo-card" aria-label="Информация о психологе">
            <div class="hero-float-tag">
              <span class="hero-float-dot" />
              <span>
                {{
                  getValue(
                    'hero.float.tag',
                    'Безопасное пространство для ваших чувств'
                  )
                }}
              </span>
            </div>
            <div class="hero-photo-main">
              <div class="hero-photo-main-inner">
                {{
                  getValue(
                    'hero.photo.placeholder',
                    'Здесь может быть ваше портретное фото в мягких пастельных тонах.'
                  )
                }}
              </div>
            </div>
            <div class="hero-photo-badge">
            </div>
          </aside>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="about">
        <div class="container">
          <div class="section-header">
            <div class="section-kicker">
              <span>
                {{ getValue('about.kicker', 'О психологе') }}
              </span>
            </div>
            <h2 class="section-title">
              {{
                getValue(
                  'about.title',
                  'Интегративный семейный психолог — с тёплым и реалистичным взглядом на жизнь'
                )
              }}
            </h2>
            <p class="section-subtitle">
              {{
                getValue(
                  'about.subtitle',
                  'Я верю, что у любой, даже очень сложной ситуации, есть другая сторона. Вы видите одну сторону медали — моя задача аккуратно показать вам другую, помочь найти в себе силу и опору.'
                )
              }}
            </p>
          </div>

          <div class="about-grid">
            <div class="about-text">
              <p>
                Меня зовут Виктория Терёхина. Я — интегративный семейный психолог, работаю с взрослыми и парами в
                онлайн‑формате.
              </p>
              <p>
                В своей работе я совмещаю разные подходы, подбирая инструменты под ваш запрос и особенности. Мой фокус —
                не только на трудностях, но и на ваших ресурсах: внутренней силе, ценностях, мечтах, которые иногда
                оказываются спрятаны глубоко под тревогой, обидами или усталостью.
              </p>
              <p>
                Я стараюсь «зарядить позитивом» каждого клиента, опираясь не на пустой оптимизм, а на реальные шаги и
                изменения, которые вы готовы делать. Оптимизм — это навык, который можно развивать, и я сопровождаю вас в
                этом процессе.
              </p>

              <div class="about-highlight">
                <strong>Как мы работаем вместе:</strong> я задаю вопросы, помогаю структурировать ваши переживания, мягко
                обозначаю закономерности и предлагаю новые точки зрения. Без оценок, сравнений и навязывания решений.
              </div>

              <ul class="about-list">
                <li>тревога, чувство вины и самокритика;</li>
                <li>сложности в отношениях с партнёром, родителями, детьми;</li>
                <li>ощущение тупика, выгорание, потеря вкуса к жизни;</li>
                <li>кризисы, расставания, переживание потерь и изменений.</li>
              </ul>
            </div>

            <aside class="about-meta-card">
              <div class="about-meta-row">
                <div class="about-meta-block">
                  <h4>Образование</h4>
                  <p>Диплом института Smart<br />интегративная семейная психология</p>
                </div>
                <div class="about-meta-block">
                  <h4>Формат работы</h4>
                  <p>Онлайн‑консультации<br />индивидуально и парами</p>
                </div>
              </div>
              <div class="about-meta-row">
                <div class="about-meta-block">
                  <h4>Подход</h4>
                  <p>бережное, уважительное сопровождение<br />без осуждения и ярлыков</p>
                </div>
                <div class="about-meta-block">
                  <h4>Клиенты</h4>
                  <p>взрослые, пары, семьи<br />при запросах на изменения в жизни и отношениях</p>
                </div>
              </div>
              <div class="about-meta-note">
                Ваши чувства важны. На консультации можно злиться, плакать, молчать, путаться в словах — здесь не нужно
                «держаться» или казаться сильнее, чем вы себя ощущаете.
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- Services & Pricing -->
      <section id="services" class="services">
        <div class="container">
          <div class="section-header">
            <div class="section-kicker">
              <span>
                {{ getValue('services.kicker', 'Услуги и стоимость') }}
              </span>
            </div>
            <h2 class="section-title">
              {{ getValue('services.title', 'Форматы работы и цены') }}
            </h2>
            <p class="section-subtitle">
              {{
                getValue(
                  'services.subtitle',
                  'Выбирайте формат, который подходит именно вам сейчас. При необходимости мы можем обсудить, с чего лучше начать, на первой консультации.'
                )
              }}
            </p>
          </div>

          <div class="services-grid">
            <div>
              <div class="cards">
                <article class="card">
                  <header class="card-header">
                    <div>
                      <div class="card-title">
                        {{ getValue('card1.title', 'Индивидуальная онлайн‑консультация') }}
                      </div>
                      <div class="card-duration">
                        {{ getValue('card1.duration', '60 минут') }}
                      </div>
                    </div>
                    <div
                      class="card-price"
                      v-html="getHtml('card1.price', '4&nbsp;000&nbsp;₽')"
                    ></div>
                  </header>
                  <div class="card-text">
                    {{
                      getValue(
                        'card1.text',
                        'Подходит, если вы чувствуете напряжение, тревогу, усталость, сложности в отношениях или просто хотите лучше понять себя и свои реакции.'
                      )
                    }}
                  </div>
                  <div class="card-footer">
                    <div class="card-note">
                      {{
                        getValue(
                          'card1.note',
                          'Мягкий вход в терапию, знакомство и первые шаги к изменениям.'
                        )
                      }}
                    </div>
                    <button
                      class="card-btn-link"
                      @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
                    >
                      Записаться
                    </button>
                  </div>
                </article>

                <article class="card">
                  <header class="card-header">
                    <div>
                      <div class="card-title">Первичная расширенная консультация</div>
                      <div class="card-duration">120 минут</div>
                    </div>
                    <div class="card-price">8&nbsp;000&nbsp;₽</div>
                  </header>
                  <div class="card-label">Для сложных запросов и пар</div>
                  <div class="card-text">
                    Углублённая встреча, чтобы внимательно рассмотреть ваш запрос, жизненную ситуацию и определить
                    приоритеты. Часто выбирают пары или клиенты в остром кризисе.
                  </div>
                  <div class="card-footer">
                    <div class="card-note">Помогает сформировать чёткий план дальнейшей работы.</div>
                    <button
                      class="card-btn-link"
                      @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
                    >
                      Записаться
                    </button>
                  </div>
                </article>

                <article class="card">
                  <header class="card-header">
                    <div>
                      <div class="card-title">Индивидуальная терапия</div>
                      <div class="card-duration">5 встреч по 60 минут</div>
                    </div>
                    <div class="card-price">17&nbsp;000&nbsp;₽</div>
                  </header>
                  <div class="card-text">
                    Небольшой, но важный цикл встреч для постепенных изменений: снижения тревоги, работы с самооценкой,
                    поиском новых опор и решений.
                  </div>
                  <div class="card-footer">
                    <div class="card-note">
                      Формат для тех, кто готов к более стабильной поддержке.
                    </div>
                    <button
                      class="card-btn-link"
                      @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
                    >
                      Оставить заявку
                    </button>
                  </div>
                </article>

                <article class="card">
                  <header class="card-header">
                    <div>
                      <div class="card-title">Парные консультации</div>
                      <div class="card-duration">пакет из 5 встреч</div>
                    </div>
                    <div class="card-price">36&nbsp;000&nbsp;₽</div>
                  </header>
                  <div class="card-text">
                    Работа с парой: учимся слышать друг друга, говорить о важном без обвинений, искать решения, которые
                    подходят обоим партнёрам.
                  </div>
                  <div class="card-footer">
                    <div class="card-note">Для тех, кто хочет улучшить качество отношений.</div>
                    <button
                      class="card-btn-link"
                      @click="document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })"
                    >
                      Записаться вдвоём
                    </button>
                  </div>
                </article>
              </div>

              <p
                class="pricing-note"
                v-html="
                  getHtml(
                    'pricing.note',
                    '<strong>Групповая терапия:</strong> формат подбирается индивидуально, по мере набора группы. Если вам интересна такая работа, напишите об этом в сообщении — я расскажу подробности.'
                  )
                "
              ></p>
            </div>

            <aside>
              <h3 class="section-title" style="font-size: 18px; margin-bottom: 10px">
                С чем вы можете прийти ко мне
              </h3>
              <ul class="bullet-list">
                <li>чувство, что вы «застряли» в одном и том же сценарии;</li>
                <li>ощущение одиночества даже в отношениях;</li>
                <li>регулярные конфликты с партнёром, родителями, детьми;</li>
                <li>страх перемен, сложности с принятием решений;</li>
                <li>повышенная тревога, самокритика, ощущение «я недостаточно хорош(а)»;</li>
                <li>периоды сильных перемен, потерь, переездов, расставаний;</li>
                <li>желание лучше понять себя, свои границы и желания.</li>
              </ul>
              <p class="pricing-note">
                Если вы не уверены, подходит ли ваш запрос для работы с психологом, вы можете написать мне: кратко
                опишите ситуацию, и я подскажу, чем могу быть полезна в рамках своей компетенции.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <!-- Articles -->
      <section id="articles" class="articles">
        <div class="container">
          <div class="section-header">
            <div class="section-kicker">
              <span>
                {{ getValue('articles.kicker', 'Статьи') }}
              </span>
            </div>
            <h2 class="section-title">
              {{
                getValue(
                  'articles.title',
                  'Немного о том, как проходит терапия и когда она может помочь'
                )
              }}
            </h2>
            <p class="section-subtitle">
              {{
                getValue(
                  'articles.subtitle',
                  'Здесь вы можете аккуратно познакомиться с моим подходом, прежде чем записываться на консультацию.'
                )
              }}
            </p>
          </div>

          <div class="articles-layout">
            <article class="article-featured">
              <div class="article-label">статья</div>
              <h3 class="article-title">Как проходит первая онлайн‑консультация с психологом: по шагам</h3>
              <div class="article-body">
                <p>
                  Многим страшно сделать первый шаг и записаться к психологу. Часто люди боятся, что их будут осуждать,
                  «читать лекции» или задавать слишком личные вопросы. Я это хорошо понимаю, и именно поэтому стараюсь
                  сделать первую встречу максимально бережной и понятной.
                </p>
                <p><strong>Что обычно происходит на первой консультации?</strong></p>
                <ol class="article-steps">
                  <li>
                    <strong>Знакомство и ваш запрос.</strong> Мы начинаем с того, что вы рассказываете, что привело вас на
                    консультацию. Можно волноваться и путаться в словах — это нормально.
                  </li>
                  <li>
                    <strong>Исследование ситуации.</strong> Я задаю вопросы, чтобы лучше понять, как долго вы живёте с этой
                    трудностью, как она проявляется и как влияет на вашу жизнь.
                  </li>
                  <li>
                    <strong>Обратная связь.</strong> Ближе к концу встречи я аккуратно подытоживаю: как вижу вашу ситуацию
                    как специалист, на что можно опереться уже сейчас.
                  </li>
                  <li>
                    <strong>План дальнейших шагов.</strong> Мы обсуждаем варианты: продолжить регулярную терапию, сделать
                    несколько поддерживающих встреч или взять паузу на размышления.
                  </li>
                </ol>
                <p>
                  На консультации нет «правильных» и «неправильных» чувств. Здесь можно злиться, плакать, молчать —
                  пространство создаётся для вас и ваших реальных переживаний.
                </p>
              </div>
              <div class="article-footer">
                <span>
                  Если вы давно думаете о том, чтобы обратиться за помощью, возможно, сейчас хорошее время сделать первый
                  шаг.
                </span>
              </div>
            </article>

            <aside>
              <p class="article-tagline">
                Ещё несколько тем, с которыми часто приходят клиенты и о которых я пишу:
              </p>
              <div class="article-list">
                <div class="article-list-item">
                  <div class="article-list-title">
                    Когда стоит обратиться к психологу: 7 признаков, что помощь уже нужна
                  </div>
                  <div>
                    О том, как распознать момент, когда «просто тяжело» превращается в состояние, которое важно не
                    игнорировать.
                  </div>
                </div>
                <div class="article-list-item">
                  <div class="article-list-title">
                    Границы в отношениях: как говорить «нет» без чувства вины
                  </div>
                  <div>
                    Про здоровые личные границы, уважение к себе и умение оставаться в контакте с важными людьми.
                  </div>
                </div>
                <div class="article-list-item">
                  <div class="article-list-title">
                    Оптимизм как навык: почему он не про «делать вид, что всё хорошо»
                  </div>
                  <div>
                    О том, как формировать реалистичный, поддерживающий взгляд на себя и свою жизнь.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section id="contact" class="contact">
        <div class="container contact-inner">
          <div>
            <div class="section-kicker">
              <span>
                {{ getValue('contact.kicker', 'Контакты') }}
              </span>
            </div>

            <div class="contact-card">
              <div class="contact-row">
                <div class="contact-label">Телефон</div>
                <div class="contact-value">
                  <a href="tel:+79854003000">+7&nbsp;(985)&nbsp;400‑30‑00</a>
                </div>
              </div>
              <div class="contact-row">
                <div class="contact-label">E‑mail</div>
                <div class="contact-value">
                  <a href="mailto:ddvv2009@gmail.com">ddvv2009@gmail.com</a>
                </div>
              </div>
              <div class="contact-small">
                Вся предоставленная вами информация остаётся конфиденциальной и не передаётся третьим лицам.
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-legal">
          <span
            v-html="getHtml('footer.text1', defaultFooterText1)"
          ></span>
          <span>
            {{
              getValue(
                'footer.text2',
                'Онлайн‑консультации. Индивидуальная и семейная психология.'
              )
            }}
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>

