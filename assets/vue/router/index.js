import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/calendar',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login'),
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: () => import('../views/front/calendar'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
