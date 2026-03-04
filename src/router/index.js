import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AdminView from '@/views/AdminView.vue'
import FamilyPsychologyView from '@/views/FamilyPsychologyView.vue'
import PersonalTherapyView from '@/views/PersonalTherapyView.vue'
import EatingDisordersView from '@/views/EatingDisordersView.vue'
import TopicDetailView from '@/views/TopicDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/family',
    name: 'family',
    component: FamilyPsychologyView,
  },
  {
    path: '/personal',
    name: 'personal',
    component: PersonalTherapyView,
  },
  {
    path: '/eating-disorders',
    name: 'eating',
    component: EatingDisordersView,
  },
  {
    path: '/topics/:slug',
    name: 'topic',
    component: TopicDetailView,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

