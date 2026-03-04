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
                'rpp.title',
                'Помощь при расстройствах пищевого поведения (РПП)'
              )
            }}
          </h1>
          <p class="hero-subtitle">
            {{
              getValue(
                'rpp.subtitle',
                'Бережное сопровождение при анорексии, компульсивном переедании, эмоциональном заедании и других формах РПП.'
              )
            }}
          </p>
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
                  'rpp.kicker',
                  'Помощь при расстройствах пищевого поведения (РПП)'
                )
              }}
            </span>
          </div>
          <h2 class="section-title">
            {{
              getValue(
                'rpp.overview.title',
                'С чем именно можно прийти по теме РПП'
              )
            }}
          </h2>
          <p class="section-subtitle">
            {{
              getValue(
                'rpp.overview.subtitle',
                'Работа с РПП требует особой бережности. Мы внимательно исследуем причины, поддерживаемые вами привычки и шаги к более устойчивому отношению к еде и телу.'
              )
            }}
          </p>
        </div>

        <div class="cards">
          <RouterLink
            class="card"
            id="rpp-anorexia"
            :to="{ name: 'topic', params: { slug: 'rpp-anorexia' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.anorexia.title',
                      'Анорексия'
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
            id="rpp-what-is"
            :to="{ name: 'topic', params: { slug: 'rpp-what-is' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.what.title',
                      'Что такое РПП'
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
            id="rpp-symptoms"
            :to="{ name: 'topic', params: { slug: 'rpp-symptoms' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.symptoms.title',
                      'Симптомы РПП'
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
            id="rpp-compulsive"
            :to="{ name: 'topic', params: { slug: 'rpp-compulsive' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.compulsive.title',
                      'Компульсивное переедание'
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
            id="rpp-emotional"
            :to="{ name: 'topic', params: { slug: 'rpp-emotional' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.emotional.title',
                      'Эмоциональное заедание'
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
            id="rpp-analysis"
            :to="{ name: 'topic', params: { slug: 'rpp-analysis' } }"
          >
            <header class="card-header">
              <div>
                <div class="card-title">
                  {{
                    getValue(
                      'rpp.analysis.title',
                      'Анализ пищевого поведения'
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
    </section>
  </SiteShell>
</template>

