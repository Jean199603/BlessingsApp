<template>
    <v-container class="fill-height">
        <v-row align="center" justify="center" class="min-h-screen">
            <v-col cols="12" md="5" lg="4">
                <v-card class="pa-6">
                    <v-card-title class="text-center text-h4 mb-6">
                        Crear Cuenta
                    </v-card-title>

                    <v-form @submit.prevent="handleRegister">
                        <!-- Name -->
                        <v-text-field
                            v-model="name"
                            label="Nombre Completo"
                            outlined
                            dense
                            class="mb-4"
                            required
                        ></v-text-field>

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

                        <!-- Confirm Password -->
                        <v-text-field
                            v-model="passwordConfirmation"
                            label="Confirmar Contraseña"
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

                        <!-- Success message -->
                        <v-alert
                            v-if="success"
                            type="success"
                            class="mb-4"
                        >
                            {{ success }}
                        </v-alert>

                        <!-- Loading state -->
                        <v-btn
                            type="submit"
                            color="primary"
                            block
                            :loading="loading"
                            size="large"
                        >
                            Registrarse
                        </v-btn>
                    </v-form>

                    <v-divider class="my-4"></v-divider>

                    <p class="text-center">
                        ¿Ya tienes cuenta?
                        <a href="#" @click.prevent="goToLogin" class="text-primary font-weight-bold">
                            Inicia sesión aquí
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
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
    error.value = ''
    success.value = ''

    // Validaciones
    if (!name.value || !email.value || !password.value || !passwordConfirmation.value) {
        error.value = 'Por favor completa todos los campos'
        return
    }

    if (password.value !== passwordConfirmation.value) {
        error.value = 'Las contraseñas no coinciden'
        return
    }

    if (password.value.length < 6) {
        error.value = 'La contraseña debe tener al menos 6 caracteres'
        return
    }

    loading.value = true

    try {
        const result = await authStore.register(
            name.value,
            email.value,
            password.value,
            passwordConfirmation.value
        )

        if (result) {
            success.value = 'Cuenta creada exitosamente. Redirigiendo...'
            setTimeout(() => {
                window.location.href = '/dashboard'
            }, 2000)
        } else {
            error.value = 'Error al crear la cuenta. Intenta de nuevo.'
        }
    } catch (err) {
        error.value = 'Error al crear la cuenta'
        console.error(err)
    } finally {
        loading.value = false
    }
}

const goToLogin = () => {
    window.location.href = '/login'
}

const goToHome = () => {
    window.location.href = '/'
}
</script>

<style scoped>
.min-h-screen {
    min-height: 100vh;
}
</style>
