import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

// Importar páginas
import LandingPage from '../pages/LandingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterPage,
        meta: { requiresAuth: false }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Guard para proteger rutas
let authChecked = false

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore()

    // Verificar autenticación una sola vez al cargar
    if (!authChecked) {
        await authStore.checkAuth()
        authChecked = true
    }

    // Verificar autenticación si es necesario
    if (to.meta.requiresAuth) {
        if (!authStore.isLoggedIn) {
            // Si no está logueado y la ruta requiere autenticación, redirigir a login
            next({ name: 'Login' })
        } else {
            next()
        }
    } else {
        // Si está logueado y quiere ir a login/register, redirigir a dashboard
        if (authStore.isLoggedIn && (to.name === 'Login' || to.name === 'Register')) {
            next({ name: 'Dashboard' })
        } else {
            next()
        }
    }
})

export default router
