<script setup>

const error = useError();
</script>

<template>
  <div class="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 min-w-screen ">
    <!-- Floating background circles -->
    <div class="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
    <div class="absolute w-96 h-96 bg-white/5 rounded-full bottom-20 right-10 animate-bounce"></div>

    <!-- Card -->
    <div
      class="relative z-10 text-center p-10 max-w-lg bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105"
    >
      <!-- Animated heading -->
      <h1 class="text-9xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
        {{ error.statusCode }}
      </h1>

      <h2
        class="mt-4 text-3xl font-bold text-gray-800 animate-fadeIn"
        style="animation-delay: 0.3s"
      >
        {{ error.message }}
      </h2>

      <p
        class="mt-2 text-gray-600 animate-fadeIn"
        style="animation-delay: 0.6s"
      >
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <!-- Button with hover animation -->
      <nuxt-link
        to="/"
        class="mt-6 inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-500 rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transform transition-all duration-300 animate-fadeIn"
        style="animation-delay: 0.9s"
      >
        Go Back Home
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}
</style>
