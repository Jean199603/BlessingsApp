<template>
    <div class="landing-page">
        <!-- Hero Section con galería -->
        <div class="hero-section-full">
            <v-carousel
                :show-arrows="false"
                :show-dots="false"
                height="500"
                cycle
            >
                <v-carousel-item
                    v-for="(image, i) in heroImages"
                    :key="i"
                    :src="image"
                    cover
                ></v-carousel-item>
            </v-carousel>

            <div class="hero-overlay">
                <div class="text-center">
                    <h1 class="text-h2 font-weight-bold mb-4 text-white">
                        Camisetas de Calidad Premium
                    </h1>
                    <p class="text-h6 text-white mb-6">
                        Descubre nuestra colección exclusiva de camisetas diseñadas para ti.
                        Comodidad, estilo y durabilidad en cada prenda.
                    </p>
                </div>
            </div>
        </div>

        <!-- Categorías - Full Width -->
        <div class="categories-section py-16">
            <v-container>
                <v-row justify="center" class="mb-8">
                    <v-col cols="12" class="text-center">
                        <h2 class="text-h4 font-weight-bold mb-2">Categorías</h2>
                        <p class="text-body1 text-grey">Explora nuestras colecciones</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        v-for="category in categories"
                        :key="category.id"
                        cols="12"
                        md="4"
                        class="mb-4"
                    >
                        <v-card
                            class="category-card h-100"
                            @click="selectCategory(category)"
                            style="cursor: pointer; transition: transform 0.3s;"
                            @mouseenter="hoveredCategory = category.id"
                            @mouseleave="hoveredCategory = null"
                            :elevation="hoveredCategory === category.id ? 8 : 2"
                        >
                            <v-img
                                :src="category.image"
                                height="250"
                                cover
                            ></v-img>
                            <v-card-title class="text-center">
                                {{ category.name }}
                            </v-card-title>
                            <v-card-text class="text-center">
                                <p class="text-body2">{{ category.count }} productos</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <!-- Productos destacados - Full Width -->
        <div class="products-section py-16">
            <v-container>
                <v-row justify="center" class="mb-8">
                    <v-col cols="12" class="text-center">
                        <h2 class="text-h4 font-weight-bold mb-2">Productos Destacados</h2>
                        <p class="text-body1 text-grey">Lo más popular de la temporada</p>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col
                        v-for="product in featuredProducts"
                        :key="product.id"
                        cols="12"
                        md="3"
                        class="mb-4"
                    >
                        <v-card class="product-card h-100">
                            <v-img
                                :src="product.image"
                                height="250"
                                cover
                            ></v-img>
                            <v-card-title>{{ product.name }}</v-card-title>
                            <v-card-text>
                                <p class="text-body2 mb-2">{{ product.description }}</p>
                                <div class="d-flex justify-space-between align-center">
                  <span class="text-h6 font-weight-bold text-primary">
                    ${{ product.price }}
                  </span>
                                    <v-rating
                                        :model-value="product.rating"
                                        readonly
                                        size="small"
                                        color="warning"
                                    ></v-rating>
                                </div>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn color="primary" block>
                                    Ver Detalles
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <!-- Sección de descripción -->
        <v-container class="description-section py-16">
            <v-row align="center">
                <v-col cols="12" md="6">
                    <v-img
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
                        height="400"
                        cover
                    ></v-img>
                </v-col>
                <v-col cols="12" md="6" class="pl-8">
                    <h2 class="text-h4 font-weight-bold mb-4">¿Por qué elegir nuestras camisetas?</h2>
                    <p class="text-body1 mb-4">
                        Nuestras camisetas están confeccionadas con los mejores materiales del mercado.
                        Cada prenda es diseñada cuidadosamente para garantizar comodidad, durabilidad y estilo.
                    </p>
                    <p class="text-body1 mb-4">
                        Contamos con un equipo de diseñadores expertos que se mantienen a la vanguardia
                        de las tendencias de moda. Nuestras colecciones se actualizan constantemente
                        para ofrecerte las opciones más modernas.
                    </p>
                    <p class="text-body1 mb-6">
                        Además, ofrecemos envíos rápidos y seguros a todo el país, con garantía de satisfacción.
                        Si no estás completamente satisfecho, tenemos una política de devolución sin complicaciones.
                    </p>
                    <v-btn color="primary" size="large">
                        Ver Catálogo Completo
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>

        <!-- CTA Section - Full Width -->
        <div class="cta-section py-16">
            <v-container>
                <v-row align="center" justify="center">
                    <v-col cols="12" md="8" class="text-center">
                        <h2 class="text-h4 font-weight-bold mb-4 text-white">¿Listo para comprar?</h2>
                        <p class="text-body1 mb-6 text-white">
                            Crea una cuenta para acceder a ofertas exclusivas y seguimiento de pedidos
                        </p>
                        <v-row justify="center" class="gap-4">
                            <v-col cols="auto">
                                <v-btn
                                    color="white"
                                    variant="outlined"
                                    size="large"
                                    @click="goToRegister"
                                >
                                    Crear Cuenta
                                </v-btn>
                            </v-col>
                            <v-col cols="auto">
                                <v-btn
                                    color="secondary"
                                    size="large"
                                    @click="goToLogin"
                                >
                                    Iniciar Sesión
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hoveredCategory = ref(null)

const heroImages = [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1503341960993-e79066d404b1?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1554849908-47a821994e57?w=800&h=400&fit=crop',
]

const categories = [
    {
        id: 1,
        name: 'Casual',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
        count: 45,
    },
    {
        id: 2,
        name: 'Deportivo',
        image: 'https://images.unsplash.com/photo-1503341960993-e79066d404b1?w=400&h=300&fit=crop',
        count: 32,
    },
    {
        id: 3,
        name: 'Formal',
        image: 'https://images.unsplash.com/photo-1554849908-47a821994e57?w=400&h=300&fit=crop',
        count: 28,
    },
]

const featuredProducts = [
    {
        id: 1,
        name: 'Camiseta Básica Azul',
        description: 'Cómoda y versátil',
        price: '29.99',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 5,
    },
    {
        id: 2,
        name: 'Camiseta Deportiva',
        description: 'Ideal para entrenamientos',
        price: '39.99',
        image: 'https://images.unsplash.com/photo-1503341960993-e79066d404b1?w=300&h=300&fit=crop',
        rating: 4,
    },
    {
        id: 3,
        name: 'Camiseta Premium Negro',
        description: 'Elegancia y comodidad',
        price: '49.99',
        image: 'https://images.unsplash.com/photo-1554849908-47a821994e57?w=300&h=300&fit=crop',
        rating: 5,
    },
    {
        id: 4,
        name: 'Camiseta Estampada',
        description: 'Diseño exclusivo',
        price: '34.99',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 4,
    },
]

const goToLogin = () => {
    router.push({ name: 'Login' })
}

const goToRegister = () => {
    router.push({ name: 'Register' })
}

const selectCategory = (category) => {
    console.log('Categoría seleccionada:', category.name)
}
</script>

<style scoped>
.landing-page {
    width: 100%;
}

.hero-section-full {
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
}

.hero-section-full .v-carousel {
    height: 100% !important;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.categories-section {
    background-color: #f5f5f5;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}

.products-section {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    background-color: #f5f5f5;
}

.description-section {
    background-color: white;
}

.cta-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 300px;
    display: flex;
    align-items: center;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}

.bg-light {
    background-color: #f5f5f5;
}

.gap-4 {
    gap: 1rem;
}

.category-card:hover {
    transform: translateY(-8px);
}

.product-card {
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-4px);
}
</style>
