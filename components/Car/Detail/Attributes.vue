<script setup>
const { car } = defineProps({
  car: {
    type: Object,
    required: true
  }
})
</script>

<template>
     <!-- CAR ATTRIBUTES -->
      <div class="mt-6 border-b pb-5">
        <div class="flex  text-lg text-gray-700 space-x-2" 
         v-for="feature in car.features">
          <span class="text-green-600 text-xl">✔</span>
          <span>{{ feature }}</span>
        </div>
      </div>
      <!-- CAR ATTRIBUTES -->
</template>