import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import RppView from '../views/RppView.vue'
import PersonalTherapyView from '../views/PersonalTherapyView.vue'
import FamilyTherapyView from '../views/FamilyTherapyView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import AdminView from '../views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView,
      meta: { 
        title: 'Виктория Терехова — Практикующий психолог онлайн', 
        desc: 'Бережная психологическая помощь онлайн. Помогу справиться с тревогой, выгоранием, выстроить личные границы и наладить отношения.' 
      }
    },
    { 
      path: '/about', 
      name: 'about', 
      component: AboutView,
      meta: { 
        title: 'О психологе | Виктория Терехова', 
        desc: 'Дипломированный психолог-консультант Виктория Терехова. Мое образование, методы работы (КПТ, Гештальт) и терапевтические принципы.' 
      }
    },
    { 
      path: '/rpp', 
      name: 'rpp', 
      component: RppView,
      meta: { 
        title: 'Лечение РПП онлайн | Виктория Терехова', 
        desc: 'Бережная психологическая помощь при расстройствах пищевого поведения. Верните здоровые отношения с едой и своим телом.' 
      }
    },
    { 
      path: '/personal', 
      name: 'personal', 
      component: PersonalTherapyView,
      meta: { 
        title: 'Индивидуальная консультация психолога | Личная терапия', 
        desc: 'Индивидуальная психологическая помощь онлайн. Безопасное пространство для работы со стрессом, самооценкой и сложными состояниями.' 
      }
    },
    { 
      path: '/family', 
      name: 'family', 
      component: FamilyTherapyView,
      meta: { 
        title: 'Семейная терапия онлайн | Консультация семейного психолога', 
        desc: 'Психологическая помощь парам и семьям. Восстановление близости, доверия и конструктивного диалога онлайн.' 
      }
    },
    { 
      path: '/articles', 
      name: 'articles', 
      component: ArticlesView,
      meta: { 
        title: 'Статьи о психологии и саморазвитии | Блог психолога', 
        desc: 'Полезные статьи о ментальном здоровье, отношениях, тревоге и личных границах простым языком.' 
      }
    },
    { 
      path: '/admin', 
      name: 'admin', 
      component: AdminView,
      meta: { 
        title: 'Панель управления сайтом' 
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach((to) => {
  const defaultTitle = 'Виктория Терехова — Психолог | Онлайн-консультации'
  document.title = to.meta.title || defaultTitle
  
  let metaDesc = document.querySelector('meta[name="description"]')
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.setAttribute('name', 'description')
    document.head.appendChild(metaDesc)
  }
  metaDesc.setAttribute('content', to.meta.desc || 'Бережная психологическая помощь онлайн.')
})

export default router
