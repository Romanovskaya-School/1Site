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
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/rpp', name: 'rpp', component: RppView },
    { path: '/personal', name: 'personal', component: PersonalTherapyView },
    { path: '/family', name: 'family', component: FamilyTherapyView },
    { path: '/articles', name: 'articles', component: ArticlesView },
    { path: '/admin', name: 'admin', component: AdminView }
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

export default router
