<script setup>
const { car } = defineProps({
  car: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- CAR ATTRIBUTES -->
  <div class="mt-6 sm:mt-8 border-b pb-4 sm:pb-6 px-3 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
      Features
    </h2>
    <div class="flex flex-wrap gap-3">
      <div
        v-for="feature in car.features"
        :key="feature"
        class="flex items-center gap-2 bg-green-50 text-green-700 text-sm sm:text-base px-3 py-1.5 rounded-full shadow-sm"
      >
        <span class="text-green-600 text-lg sm:text-xl">✔</span>
        <span>{{ feature }}</span>
      </div>
    </div>
  </div>
  <!-- CAR ATTRIBUTES -->
</template>
