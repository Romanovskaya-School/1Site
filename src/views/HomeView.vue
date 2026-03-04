<script setup>
import SiteShell from '@/components/SiteShell.vue'
import RppQuiz from '@/components/RppQuiz.vue'
import { useContent } from '@/composables/useContent'

const { getValue, getHtml } = useContent()
</script>

<template>
  <SiteShell>
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

      <!-- Main sections shortcuts -->
      <section class="services">
        <div class="container">
          <div class="section-header">
            <div class="section-kicker">
              <span>
                {{
                  getValue(
                    'sections.kicker',
                    'Разделы сайта'
                  )
                }}
              </span>
            </div>
            <h2 class="section-title">
              {{
                getValue(
                  'sections.title',
                  'Выберите направление, которое ближе к вашему запросу'
                )
              }}
            </h2>
          </div>

          <div class="cards">
            <RouterLink
              to="/family"
              class="card"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'sections.family.title',
                        'Семейная психология'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-text">
                {{
                  getValue(
                    'sections.family.text',
                    'Для пар, родителей и подростков: совместные и индивидуальные встречи, работа с конфликтами и кризисами в семье.'
                  )
                }}
              </div>
            </RouterLink>

            <RouterLink
              to="/personal"
              class="card"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'sections.personal.title',
                        'Личная терапия и самореализация'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-text">
                {{
                  getValue(
                    'sections.personal.text',
                    'Самооценка, поиск себя, мотивация, тревога, выгорание и другие эмоциональные состояния.'
                  )
                }}
              </div>
            </RouterLink>

            <RouterLink
              to="/eating-disorders"
              class="card"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'sections.rpp.title',
                        'Помощь при РПП'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-text">
                {{
                  getValue(
                    'sections.rpp.text',
                    'Анорексия, компульсивное переедание, эмоциональное заедание и другие формы расстройств пищевого поведения.'
                  )
                }}
              </div>
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- About -->
      <section id="about" class="about">
        <div class="container">
          <div class="section-header">
            <div class="section-kicker">
              <span>
                {{ getValue('about.kicker', 'Обо мне') }}
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
          </div>

          <div class="about-grid">
            <div class="about-text">
              <p>
                {{
                  getValue(
                    'about.text1',
                    'Меня зовут Виктория Терёхина. Я — интегративный семейный психолог, работаю с взрослыми и парами в онлайн‑формате.'
                  )
                }}
              </p>
              <p>
                {{
                  getValue(
                    'about.text2',
                    'В своей работе я совмещаю разные подходы, подбирая инструменты под ваш запрос и особенности. Мой фокус — не только на трудностях, но и на ваших ресурсах: внутренней силе, ценностях, мечтах, которые иногда оказываются спрятаны глубоко под тревогой, обидами или усталостью.'
                  )
                }}
              </p>
              <p>
                {{
                  getValue(
                    'about.text3',
                    'Я стараюсь «зарядить позитивом» каждого клиента, опираясь не на пустой оптимизм, а на реальные шаги и изменения, которые вы готовы делать. Оптимизм — это навык, который можно развивать, и я сопровождаю вас в этом процессе.'
                  )
                }}
              </p>
            </div>

            <aside class="about-meta-card">
              <div class="about-meta-row">
                <div class="about-meta-block">
                  <h4>
                    {{
                      getValue(
                        'about.education.title',
                        'Образование'
                      )
                    }}
                  </h4>
                  <p v-html="getHtml('about.education.text', 'Диплом института Smart<br />интегративная семейная психология')"></p>
                </div>
                <div class="about-meta-block">
                  <h4>
                    {{
                      getValue(
                        'about.format.title',
                        'Формат работы'
                      )
                    }}
                  </h4>
                  <p v-html="getHtml('about.format.text', 'Онлайн‑консультации<br />индивидуально и парами')"></p>
                </div>
              </div>
              <div class="about-meta-row">
                <div class="about-meta-block">
                  <h4>
                    {{
                      getValue(
                        'about.approach.title',
                        'Подход'
                      )
                    }}
                  </h4>
                  <p v-html="getHtml('about.approach.text', 'бережное, уважительное сопровождение<br />без осуждения и ярлыков')"></p>
                </div>
                <div class="about-meta-block">
                  <h4>
                    {{
                      getValue(
                        'about.clients.title',
                        'Клиенты'
                      )
                    }}
                  </h4>
                  <p v-html="getHtml('about.clients.text', 'взрослые, пары, семьи<br />при запросах на изменения в жизни и отношениях')"></p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- Тест «Есть ли у вас РПП?» -->
      <RppQuiz />

<!--      &lt;!&ndash; Articles &ndash;&gt;
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
          </div>
        </div>
      </section>-->

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
                <div class="contact-label">
                  {{
                    getValue(
                      'contact.phone.label',
                      'Телефон'
                    )
                  }}
                </div>
                <div class="contact-value">
                  <a :href="getValue('contact.phone.href', 'tel:+79854003000')">
                    {{
                      getValue(
                        'contact.phone.display',
                        '+7\u00a0(985)\u00a0400‑30‑00'
                      )
                    }}
                  </a>
                </div>
              </div>
              <div class="contact-row">
                <div class="contact-label">
                  {{
                    getValue(
                      'contact.email.label',
                      'E‑mail'
                    )
                  }}
                </div>
                <div class="contact-value">
                  <a :href="getValue('contact.email.href', 'mailto:ddvv2009@gmail.com')">
                    {{
                      getValue(
                        'contact.email.display',
                        'ddvv2009@gmail.com'
                      )
                    }}
                  </a>
                </div>
              </div>
              <div class="contact-small">
                {{
                  getValue(
                    'contact.confidentiality',
                    'Вся предоставленная вами информация остаётся конфиденциальной и не передаётся третьим лицам.'
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </section>
  </SiteShell>
</template>