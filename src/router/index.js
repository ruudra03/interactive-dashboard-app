import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const alreadyLoggedIn = () => {
    if (localStorage.getItem('userLoggedIn')) {
        return localStorage.getItem('userLoggedIn')
    } else {
        return false
    }
}

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
            component: () => import('../views/Login.vue'),
            beforeEnter(to, from, next) {
                if (alreadyLoggedIn()) {
                    next('/')
                } else {
                    next()
                }
            }
        },
        {
            path: '/logout',
            component: () => import('../views/Logout.vue'),
            beforeEnter(to, from, next) {
                if (alreadyLoggedIn) {
                    next()
                } else {
                    next('/unauthorised')
                }
            }
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