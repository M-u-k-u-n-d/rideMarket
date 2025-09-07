<script setup>

const { car } = defineProps({
  car: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <!-- CAR DESCRIPTION -->
      <div class="mt-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <p class="text-gray-600 leading-relaxed text-lg">
          {{ car.description }}
        </p>
      </div>
      <!-- CAR DESCRIPTION -->
</template>