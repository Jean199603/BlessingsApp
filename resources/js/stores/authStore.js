import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token') || null)
    const loading = ref(false)

    // Computed
    const isLoggedIn = computed(() => !!token.value && !!user.value)

    // Actions
    const login = async (email, password) => {
        loading.value = true
        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password
            })

            token.value = response.data.token
            user.value = response.data.user
            localStorage.setItem('token', token.value)

            // Configurar header de autorización
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

            return true
        } catch (error) {
            console.error('Error en login:', error)
            return false
        } finally {
            loading.value = false
        }
    }

    const register = async (name, email, password, passwordConfirmation) => {
        loading.value = true
        try {
            const response = await axios.post('/api/auth/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            })

            token.value = response.data.token
            user.value = response.data.user
            localStorage.setItem('token', token.value)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

            return true
        } catch (error) {
            console.error('Error en registro:', error)
            return false
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout')
        } catch (error) {
            console.error('Error en logout:', error)
        } finally {
            token.value = null
            user.value = null
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    }

    const checkAuth = async () => {
        if (token.value) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
            try {
                const response = await axios.get('/api/auth/user')
                user.value = response.data
                return true
            } catch (error) {
                console.error('Error verificando autenticación:', error)
                token.value = null
                user.value = null
                localStorage.removeItem('token')
                return false
            }
        }
        return false
    }

    return {
        user,
        token,
        loading,
        isLoggedIn,
        login,
        register,
        logout,
        checkAuth
    }
})
