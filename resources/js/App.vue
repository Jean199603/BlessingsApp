<template>
    <v-app>
        <!-- NavBar siempre visible -->
        <nav-bar />

        <!-- Contenido -->
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()

onMounted(() => {
    // Verificar si el usuario ya está logueado (desde token guardado)
    authStore.checkAuth()
})
</script>

<style>
</style>
