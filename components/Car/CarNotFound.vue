<template>
  <div
    class="flex flex-col items-center justify-center min-h-[60vh] text-center px-6"
  >
    <!-- Animated Background Glow -->
    <div class="relative">
      <div
        class="absolute inset-0 w-72 h-72 bg-pink-500/30 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute inset-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-bounce"
      ></div>

      <!-- Main Content -->
      <div
        class="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-lg"
      >
        <!-- Icon Animation -->
        <div
          class="text-6xl mb-4 animate-bounce text-red-500"
        >
          🚘❌
        </div>

        <!-- Title -->
        <h1
          class="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 animate-fadeIn"
        >
          Car Not Found
        </h1>

        <!-- Subtitle -->
        <p
          class="text-gray-600 text-lg mb-6 animate-fadeIn"
          style="animation-delay: 0.3s"
        >
          Oops! We couldn’t find any details for the car you searched.
        </p>

        <!-- Button -->
        <nuxt-link
          to="/"
          class="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-pink-500 rounded-xl shadow-lg hover:shadow-2xl hover:scale-110 transform transition-all duration-300 animate-fadeIn"
          style="animation-delay: 0.6s"
        >
          🔙 Go Back Home
        </nuxt-link>
      </div>
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
