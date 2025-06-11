<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getItems,} from '@/libs/fetchUtilsOur';

const router = useRouter()

const navigateToProducts = () => {
  router.push('/sale-items')
}
const navigateToList = () => {
  router.push('/sale-items/list')
}

const goToPhoneDetails = (id) => {
  router.push(`/sale-items/${id}`)
}

// Refs for scrolling to sections
const featuredProducts = ref(null)
const categories = ref(null)
const contact = ref(null) // Added for consistency, though not explicit in the image's main focus

const scrollTo = (target) => {
  target?.scrollIntoView({ behavior: 'smooth' })
}

// Intersection Observer for scroll-based animations
onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  }

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // observer.unobserve(entry.target); // Uncomment to animate only once per element
      } else {
        entry.target.classList.remove('is-visible') // Optional: to re-animate on scroll out and back in
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })
})
const saleItems = ref([]) // Ref to store fetched sale items
const backendError = ref(null) // Ref to store any fetching errors
const isLoading = ref(true) // Ref to indicate loading state

const fetchSaleItems = async () => {
  isLoading.value = true;
  backendError.value = null;
  try {
    const response = await fetch('http://localhost:8080/itb-mshop/v1/sale-items');
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data = await response.json();
    saleItems.value = data; // Assuming data is an array of items
  } catch (error) {
    console.error("Failed to fetch sale items:", error);
    backendError.value = error.message;
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchSaleItems(); // Fetch data when the component is mounted
  // Intersection Observer for scroll-based animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
  }

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove('is-visible')
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-white to-gray-50 text-gray-800 font-sans relative overflow-hidden">
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      <div class="absolute w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob top-10 left-1/4 transform -translate-x-1/2"></div>
      <div class="absolute w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1/2"></div>
      <div class="absolute w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 bottom-20 right-1/4 transform translate-x-1/2"></div>
    </div>

    <header class="bg-white px-6 md:px-20 py-4 flex justify-between items-center shadow-sm relative z-10 animate-fade-in-down">
      <div class="text-3xl font-extrabold text-gray-900 tracking-wider">ITB MSHOP</div>
      <nav class="flex items-center space-x-6">
        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg">
          <span class="hidden md:inline">COMPARE</span><span class="md:hidden">⚖️</span>
        </a>
        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg">
          <span class="hidden md:inline">WISHLIST</span><span class="md:hidden">❤️</span>
        </a>
        <a href="#" class="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-lg">
          <span class="hidden md:inline">ACCOUNT</span><span class="md:hidden">👤</span>
        </a>
      </nav>
    </header>

    <section class="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-24 gap-10 min-h-[calc(100vh-80px)]">
      <div class="text-center md:text-left max-w-2xl space-y-6 animate-fade-in-up">
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-gray-900">
          Smartphone
        </h1>
        <p class="text-2xl md:text-3xl font-semibold text-gray-700">Explore the future of mobile.</p>
        <p class="text-lg md:text-xl text-gray-600 max-w-xl">
          Dive into a world where innovation meets everyday life. Discover the latest advancements in mobile technology,
          from powerful processors to stunning camera systems, designed to enhance your digital experience.
        </p>
        <div class="pt-6 flex flex-col sm:flex-row justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            @click="navigateToProducts"
            class="px-10 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg w-full sm:w-auto"
          >
            Shop Now
          </button>
          <button
            @click="navigateToList"
            class="px-10 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg border border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-lg w-full sm:w-auto"
          >
            Seller
          </button>
        </div>
      </div>

      <div class="relative w-full md:w-1/2 lg:w-2/5 flex justify-center items-center h-96 md:h-auto animate-float">
        <img
          src="/phone/3dphone.png"
          alt="Modern Smartphone 3D Render"
          class="w-64 md:w-80 lg:w-96 h-auto object-contain rounded-3xl shadow-2xl transition duration-500 hover:scale-105"
        />
        <div class="absolute w-72 h-72 lg:w-96 lg:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 -z-10 bottom-0 right-0 transform translate-x-1/3 translate-y-1/3"></div>
      </div>
    </section>

    <section ref="featuredProducts" class="relative z-10 px-6 md:px-20 py-20 bg-white animate-on-scroll">
      <h2 class="text-4xl font-bold text-center mb-16 text-gray-900">Featured Devices</h2>

      <div v-if="isLoading" class="text-center text-gray-600 text-xl py-10">
        Loading products...
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mt-4"></div>
      </div>

      <div v-else-if="backendError" class="text-center text-red-600 text-xl py-10">
        Error loading products: {{ backendError }}
        <p class="text-sm text-gray-500 mt-2">Please ensure the backend server is running.</p>
      </div>

      <div v-else-if="saleItems.length === 0" class="text-center text-gray-600 text-xl py-10">
        No featured products found.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div v-for="(item, index) in saleItems.slice(0, 3)" :key="item.id" class="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
          <div class="relative w-48 h-48 mb-6 flex items-center justify-center">
            <img :src="item.imageUrl || '/phone/3dphone1.png'" :alt="item.name" class="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            <div :class="[
              'absolute rounded-full mix-blend-multiply filter blur-xl opacity-60',
              {'bg-purple-200 w-24 h-24 -top-4 -right-4': index === 0},
              {'bg-blue-200 w-28 h-28 -bottom-4 -left-4': index === 1},
              {'bg-pink-200 w-20 h-20 top-0 left-0': index === 2},
            ]"></div>
          </div>
          <h3 class="text-2xl font-semibold mb-2 text-gray-800">{{ item.model }}</h3>
          <p class="text-gray-600 mb-4">{{ item.ramGb }} GB / {{ item.storageGb }} GB</p>
          <span class="text-blue-600 text-3xl font-bold mb-4">${{ item.price.toFixed(2) }}</span>
          <button @click="goToPhoneDetails(item.id)" class="px-8 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition transform hover:scale-105">View Details</button>
        </div>
      </div>
    </section>

    <section ref="categories" class="relative z-10 px-6 md:px-20 py-20 bg-gradient-to-br from-gray-50 to-white animate-on-scroll">
      <h2 class="text-4xl font-bold text-center mb-16 text-gray-900">Browse by Category</h2>
      <div class="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
        <div class="category-card p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Flagship</h3>
          <p class="text-gray-600 text-sm">Premium performance & features.</p>
        </div>
        <div class="category-card p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Mid-Range</h3>
          <p class="text-gray-600 text-sm">Best value for everyday use.</p>
        </div>
        <div class="category-card p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Gaming</h3>
          <p class="text-gray-600 text-sm">Optimized for high-performance games.</p>
        </div>
        <div class="category-card p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-100">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Budget-Friendly</h3>
          <p class="text-gray-600 text-sm">Quality phones at affordable prices.</p>
        </div>
      </div>
    </section>

    <section ref="contact" class="relative z-10 px-6 md:px-20 py-24 text-center bg-blue-600 text-white animate-on-scroll">
      <h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to find your next phone?</h2>
      <p class="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
        Our team is ready to assist you. Explore our collection or get in touch for personalized recommendations.
      </p>
      <button class="px-12 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 text-xl">
        Contact Us
      </button>
    </section>
  </div>
</template>

<style scoped>
/* Keyframe Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* NEW: Keyframe for header animation */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px); /* Starts slightly above its final position */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% { transform: translateY(0px) rotateX(0deg); }
  50% { transform: translateY(-10px) rotateX(2deg); } /* Subtle rotation for 3D feel */
  100% { transform: translateY(0px) rotateX(0deg); }
}

@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

/* Animation Delays for Multiple Blobs */
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

/* Utility Classes for Animations */
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}

/* NEW: Utility class for header animation */
.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards; /* Shorter duration for quick appearance */
  animation-delay: 0.1s; /* Slight delay after page load */
  opacity: 0; /* Ensures it starts invisible */
}

.animate-float {
  animation: float 4s ease-in-out infinite; /* Slightly longer duration for subtler effect */
}

.animate-blob {
  animation: blob 7s infinite; /* Longer duration for background blobs */
}

/* Intersection Observer Base Styles */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}
</style>