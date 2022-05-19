import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/auth/login'),
    },
    {
        path: '/vente',
        name: 'front',
        redirect: '/vente/articles',
        component: () => import('../layout/front'),
        children: [
            {
                path: '/vente/articles',
                component: () => import('../views/front'),
                name: 'home'
            },
            {
                path: '/vente/articles/slug',
                component: () => import('../views/front/detail'),
                name: 'detail'
            },
        ]
    },
    {
        path: '/app',
        name: 'dashboard',
        component: () => import('../layout/back'),
        children: [
            {
                path: '/app/dashboard',
                component: () => import('../views/back/dashboard'),
                name: 'dashboard',
                meta: { requiresAuth: true }
            },
            {
                path: '/app/exo1',
                component: () => import('../views/back/exo1'),
                name: 'exo1',
                meta: { requiresAuth: true }
            }
            ,{
                path: '/app/exo2',
                component: () => import('../views/back/exo2'),
                name: 'exo2',
                meta: { requiresAuth: true }
            }
            ,{
                path: '/app/exo3',
                component: () => import('../views/back/exo3'),
                name: 'exo3',
                meta: { requiresAuth: true }
            }
        ]
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
