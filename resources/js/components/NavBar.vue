<template>
    <v-app-bar color="primary" dark>
        <v-app-bar-title @click="goToHome" style="cursor: pointer">
            Mi App
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Si NO está logueado: mostrar Login y Register -->
        <div v-if="!isLoggedIn" class="d-flex gap-2">
            <v-btn
                text
                @click="goToLogin"
                class="text-white"
            >
                Iniciar Sesión
            </v-btn>
            <v-btn
                color="secondary"
                variant="outlined"
                @click="goToRegister"
            >
                Crear Cuenta
            </v-btn>
        </div>

        <!-- Si está logueado: mostrar menú de usuario -->
        <v-menu v-else offset-y>
            <template v-slot:activator="{ props: menu }">
                <v-btn
                    v-bind="menu"
                    variant="text"
                    color="white"
                    class="mr-2"
                >
                    {{ userInitials }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="goToDashboard">
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToProfile">
                    <v-list-item-title>Mi Perfil</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToPermissions">
                    <v-list-item-title>Gestionar Permisos</v-list-item-title>
                </v-list-item>
                <v-list-item @click="goToRoles">
                    <v-list-item-title>Gestionar Roles</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="logout">
                    <v-list-item-title>Cerrar Sesión</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isLoggedIn)

const userInitials = computed(() => {
    if (authStore.user?.name) {
        return authStore.user.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
    }
    return 'U'
})

const goToHome = () => {
    router.push({ name: 'Home' })
}

const goToLogin = () => {
    router.push({ name: 'Login' })
}

const goToRegister = () => {
    router.push({ name: 'Register' })
}

const goToDashboard = () => {
    router.push({ name: 'Dashboard' })
}

const goToProfile = () => {
    console.log('Ir a perfil')
}

const goToPermissions = () => {
    console.log('Ir a gestionar permisos')
}

const goToRoles = () => {
    console.log('Ir a gestionar roles')
}

const logout = async () => {
    await authStore.logout()
    router.push({ name: 'Home' })
}
</script>

<style scoped>
.d-flex {
    display: flex;
}

.gap-2 {
    gap: 8px;
}

.text-white {
    color: white !important;
}
</style>
