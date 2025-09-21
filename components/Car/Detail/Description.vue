<script setup>
const { car } = defineProps({
  car: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- CAR DESCRIPTION -->
  <div class="mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
    <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
      Description
    </h2>
    <p class="text-gray-700 leading-relaxed text-base sm:text-lg lg:text-xl">
      {{ car.description }}
    </p>
  </div>
  <!-- CAR DESCRIPTION -->
</template>
