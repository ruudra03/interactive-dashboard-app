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
            path: '/about',
            component: () => import('../views/About.vue')
        },

        // Error 404
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/Error404.vue')
        }
    ]

})

export default router