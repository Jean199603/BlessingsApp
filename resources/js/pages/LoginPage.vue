<template>
    <v-container class="fill-height">
        <v-row align="center" justify="center" class="min-h-screen">
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-6">
                    <v-card-title class="text-center text-h4 mb-6">
                        Iniciar Sesión
                    </v-card-title>

                    <v-form @submit.prevent="handleLogin">
                        <!-- Email -->
                        <v-text-field
                            v-model="email"
                            label="Correo Electrónico"
                            type="email"
                            outlined
                            dense
                            class="mb-4"
                            required
                        ></v-text-field>

                        <!-- Password -->
                        <v-text-field
                            v-model="password"
                            label="Contraseña"
                            type="password"
                            outlined
                            dense
                            class="mb-4"
                            required
                        ></v-text-field>

                        <!-- Error message -->
                        <v-alert
                            v-if="error"
                            type="error"
                            class="mb-4"
                            dismissible
                            @click:close="error = ''"
                        >
                            {{ error }}
                        </v-alert>

                        <!-- Loading state -->
                        <v-btn
                            type="submit"
                            color="primary"
                            block
                            :loading="loading"
                            size="large"
                        >
                            Ingresar
                        </v-btn>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <p class="text-center">
                        ¿No tienes cuenta?
                        <a href="#" @click.prevent="goToRegister" class="text-primary font-weight-bold">
                            Crear una aquí
                        </a>
                    </p>

                    <p class="text-center mt-2">
                        <a href="#" @click.prevent="goToHome" class="text-secondary">
                            Volver al inicio
                        </a>
                    </p>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
    error.value = ''

    if (!email.value || !password.value) {
        error.value = 'Por favor completa todos los campos'
        return
    }

    loading.value = true

    try {
        const success = await authStore.login(email.value, password.value)
        if (success) {
            // Redirigir al dashboard con router
            router.push({ name: 'Dashboard' })
        } else {
            error.value = 'Credenciales inválidas'
        }
    } catch (err) {
        error.value = 'Error al iniciar sesión'
        console.error(err)
    } finally {
        loading.value = false
    }
}

const goToRegister = () => {
    router.push({ name: 'Register' })
}

const goToHome = () => {
    router.push({ name: 'Home' })
}
</script>

<style scoped>
.min-h-screen {
    min-height: 100vh;
}
</style>
