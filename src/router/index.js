import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/website-data',
            component: () => import('../views/WebsiteData.vue')
        },
        {
            path: '/about',
            component: () => import('../views/About.vue')
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue')
        },
        {
            path: '/settings',
            component: () => import('../views/Settings.vue')
        },

        // Error 404
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/Error404.vue')
        }
    ]

})

export default router