<template>
    <v-container class="py-8">
        <v-row>
            <v-col cols="12">
                <h1 class="text-h3 mb-6">Dashboard</h1>
            </v-col>
        </v-row>

        <!-- Información del usuario -->
        <v-row class="mb-8">
            <v-col cols="12" md="6">
                <v-card class="pa-6">
                    <v-card-title>Información del Usuario</v-card-title>
                    <v-card-text>
                        <p><strong>Nombre:</strong> {{ user?.name }}</p>
                        <p><strong>Email:</strong> {{ user?.email }}</p>
                        <p v-if="user?.role"><strong>Rol:</strong> {{ user?.role }}</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card class="pa-6">
                    <v-card-title>Acciones Rápidas</v-card-title>
                    <v-card-text>
                        <v-btn
                            color="primary"
                            block
                            class="mb-2"
                            @click="goToPermissions"
                        >
                            Gestionar Permisos
                        </v-btn>
                        <v-btn
                            color="secondary"
                            block
                            @click="goToRoles"
                        >
                            Gestionar Roles
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <!-- Estadísticas -->
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="pa-6">
                    <v-card-title class="text-center">
                        <v-icon size="48" color="primary" class="mb-2">
                            mdi-shield-account
                        </v-icon>
                    </v-card-title>
                    <v-card-title class="text-center">Roles</v-card-title>
                    <v-card-text class="text-center">
                        <p class="text-h4">0</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="pa-6">
                    <v-card-title class="text-center">
                        <v-icon size="48" color="success" class="mb-2">
                            mdi-lock-check
                        </v-icon>
                    </v-card-title>
                    <v-card-title class="text-center">Permisos</v-card-title>
                    <v-card-text class="text-center">
                        <p class="text-h4">0</p>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="4">
                <v-card class="pa-6">
                    <v-card-title class="text-center">
                        <v-icon size="48" color="warning" class="mb-2">
                            mdi-package
                        </v-icon>
                    </v-card-title>
                    <v-card-title class="text-center">Módulos</v-card-title>
                    <v-card-text class="text-center">
                        <p class="text-h4">0</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const goToPermissions = () => {
    console.log('Ir a gestionar permisos')
}

const goToRoles = () => {
    console.log('Ir a gestionar roles')
}
</script>

<style scoped>
</style>
