import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const alreadyLoggedIn = () => {
    if (localStorage.getItem('isUserLoggedIn')) {
        return true
    } else {
        return false
    }
}

const isAdmin = () => {
    if (localStorage.getItem('role') === 'admin') {
        return true
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
            path: '/login',
            component: () => import('../views/Login.vue'),
            beforeEnter(to, from, next) {
                if (alreadyLoggedIn()) {
                    next('/unauthorised')
                } else {
                    next()
                }
            }
        },
        {
            path: '/logout',
            component: () => import('../views/Logout.vue'),
            beforeEnter(to, from, next) {
                if (!alreadyLoggedIn()) {
                    next('/unauthorised')
                } else {
                    next()
                }
            }
        },
        {
            path: '/add-user',
            component: () => import('../views/AddUser.vue'),
            beforeEnter(to, from, next) {
                if (isAdmin()) {
                    next()
                } else {
                    next('/unauthorised')
                }
            }
        },

        // Unauthorised
        {
            path: '/unauthorised',
            component: () => import('../views/Unauthorised.vue')
        },

        // Error 404
        {
            path: '/:catchAll(.*)',
            component: () => import('../views/Error404.vue')
        }


    ]

})

export default router