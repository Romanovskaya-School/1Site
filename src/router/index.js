import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/articles',
        name: 'articles',
        component: () => import('../views/ArticlesView.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/AdminView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
                top: 80
            };
        }
        return savedPosition || { top: 0 };
    }
});

export default router;
