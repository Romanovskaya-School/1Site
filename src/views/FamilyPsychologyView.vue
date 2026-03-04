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
                'family.title',
                'Семейная психология: поддержка пар и родителей'
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
              {{ getValue('family.kicker', 'Семейная психология') }}
            </span>
          </div>
          <h2 class="section-title">
            {{
              getValue(
                'family.overview.title',
                'С чем можно прийти по семейным вопросам'
              )
            }}
          </h2>
        </div>

        <div class="services-grid">
          <div>
            <h3 class="section-title" style="font-size: 20px; margin-bottom: 10px">
              {{
                getValue(
                  'family.couples.title',
                  'Для пар (семейная терапия)'
                )
              }}
            </h3>
            <div class="cards">
              <RouterLink
                class="card"
                id="family-couples-joint"
                :to="{ name: 'topic', params: { slug: 'family-couples-joint' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.couples.joint.title',
                          'Консультации для пар (совместно)'
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
                id="family-couples-conflicts"
                :to="{ name: 'topic', params: { slug: 'family-couples-conflicts' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.couples.conflicts.title',
                          'Конфликты в семье, кризисы в отношениях'
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
                id="family-couples-individual"
                :to="{ name: 'topic', params: { slug: 'family-couples-individual' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.couples.individual.title',
                          'Индивидуальные консультации для супругов (когда второй не готов)'
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
                  'family.parents.title',
                  'Детско‑родительские отношения'
                )
              }}
            </h3>
            <div class="cards">
              <RouterLink
                class="card"
                id="family-parents-consult"
                :to="{ name: 'topic', params: { slug: 'family-parents-consult' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.parents.consult.title',
                          'Консультации для родителей'
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
                id="family-parents-joint"
                :to="{ name: 'topic', params: { slug: 'family-parents-joint' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.parents.joint.title',
                          'Для родителей и детей (совместные сессии)'
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
                id="family-parents-teens"
                :to="{ name: 'topic', params: { slug: 'family-parents-teens' } }"
              >
                <header class="card-header">
                  <div>
                    <div class="card-title">
                      {{
                        getValue(
                          'family.parents.teens.title',
                          'Поддержка подростков'
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
      </div>
    </section>
  </SiteShell>
</template>

