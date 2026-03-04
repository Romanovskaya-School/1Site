<script setup>
import SiteShell from '@/components/SiteShell.vue'
import { useContent } from '@/composables/useContent'

const { getValue } = useContent()
</script>

<template>
  <SiteShell>
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <h1 class="hero-title">
            {{
              getValue(
                'personal.title',
                'Личная терапия и самореализация'
              )
            }}
          </h1>
        </div>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <div class="section-header">
          <div class="section-kicker">
            <span>
              {{
                getValue(
                  'personal.kicker',
                  'Личная терапия и самореализация'
                )
              }}
            </span>
          </div>
          <h2 class="section-title">
            {{
              getValue(
                'personal.overview.title',
                'Темы, с которыми мы работаем на личной терапии'
              )
            }}
          </h2>
          <p class="section-subtitle">
            {{
              getValue(
                'personal.overview.subtitle',
                'Ниже собраны основные запросы: самооценка, поиск себя, эмоциональные состояния. Выберите то, что ближе всего к вашей ситуации.'
              )
            }}
          </p>
        </div>

        <div class="services-grid">
          <div>
            <h3 class="section-title" style="font-size: 18px; margin-bottom: 10px">
              {{
                getValue(
                  'personal.selfesteem.title',
                  'Работа с самооценкой'
                )
              }}
            </h3>
            <div class="cards">
              <RouterLink
                class="card"
                id="personal-selfesteem-confidence"
                :to="{ name: 'topic', params: { slug: 'personal-selfesteem-confidence' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.selfesteem.confidence.title',
                          'Повышение самооценки и уверенности'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>

              <RouterLink
                class="card"
                id="personal-selfesteem-acceptance"
                :to="{ name: 'topic', params: { slug: 'personal-selfesteem-acceptance' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.selfesteem.acceptance.title',
                          'Принятие себя (женская энергия, телесность)'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>

              <RouterLink
                class="card"
                id="personal-selfesteem-body"
                :to="{ name: 'topic', params: { slug: 'personal-selfesteem-body' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.selfesteem.body.title',
                          'Работа с телом и самооценкой'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>
            </div>
          </div>

          <aside>
            <h3 class="section-title" style="font-size: 20px; margin-bottom: 10px">
              {{
                getValue(
                  'personal.search.title',
                  'Поиск себя и мотивация'
                )
              }}
            </h3>
            <div class="cards">
              <RouterLink
                class="card"
                id="personal-search-dontknow"
                :to="{ name: 'topic', params: { slug: 'personal-search-dontknow' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.search.dontknow.title',
                          '«Я не знаю, чего хочу» (потеря ориентиров)'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>

              <RouterLink
                class="card"
                id="personal-search-motivation"
                :to="{ name: 'topic', params: { slug: 'personal-search-motivation' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.search.motivation.title',
                          'Как найти мотивацию и дисциплину (апатия, выгорание)'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>

              <RouterLink
                class="card"
                id="personal-search-procrastination"
                :to="{ name: 'topic', params: { slug: 'personal-search-procrastination' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'personal.search.procrastination.title',
                          'Как собраться и начать действовать (прокрастинация)'
                        )
                      }}
                    </div>
                  </div>
                </header>
                <div class="card-footer">
                  <span class="card-note">Описание · Статьи · Стоимость</span>
                </div>
              </RouterLink>
            </div>
          </aside>
        </div>

        <div style="margin-top: 32px">
          <h3 class="section-title" style="font-size: 20px; margin-bottom: 10px">
            {{
              getValue(
                'personal.emotions.title',
                'Эмоциональные состояния'
              )
            }}
          </h3>
          <div class="cards">
            <RouterLink
              class="card"
              id="personal-emotions-anxiety"
              :to="{ name: 'topic', params: { slug: 'personal-emotions-anxiety' } }"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'personal.emotions.anxiety.title',
                        'Тревога и стресс'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-footer">
                <span class="card-note">Описание · Статьи · Стоимость</span>
              </div>
            </RouterLink>

            <RouterLink
              class="card"
              id="personal-emotions-depression"
              :to="{ name: 'topic', params: { slug: 'personal-emotions-depression' } }"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'personal.emotions.depression.title',
                        'Депрессия'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-footer">
                <span class="card-note">Описание · Статьи · Стоимость</span>
              </div>
            </RouterLink>

            <RouterLink
              class="card"
              id="personal-emotions-apathy"
              :to="{ name: 'topic', params: { slug: 'personal-emotions-apathy' } }"
            >
              <header class="card-header">
                <div>
                  <div class="card-title">
                    {{
                      getValue(
                        'personal.emotions.apathy.title',
                        'Нет сил и энергии (апатия, упадок сил)'
                      )
                    }}
                  </div>
                </div>
              </header>
              <div class="card-footer">
                <span class="card-note">Описание · Статьи · Стоимость</span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </SiteShell>
</template>

