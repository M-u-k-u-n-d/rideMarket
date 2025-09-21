<script setup>
import { NuxtImg } from '#components'
import { useUtilities } from '@/composables/useUtilities'

const { formatCurrency } = useUtilities()

// destructure directly
const { car } = defineProps({
  car: {
    type: Object,
    required: true
  }
})

// console.log("Car in Hero => ", car)
</script>

<template>
  <div class="mt-6 sm:mt-10 px-3 sm:px-6 lg:px-8">
    <!-- Car Image -->
    <NuxtImg
      :src="car.image"
      class="w-full max-h-[400px] sm:max-h-[500px] object-contain rounded-2xl shadow-md"
      :alt="car.name"
    />

    <!-- Car Info Section -->
    <div
      class="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-4 sm:pb-5"
    >
      <!-- Left Section: Car Name + Details -->
      <div>
        <h1 class="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
          {{ car.name }}
        </h1>
        <div
          class="flex flex-wrap items-center text-gray-600 text-sm sm:text-base lg:text-lg mt-2 gap-x-3 gap-y-1"
        >
          <p class="whitespace-nowrap">{{ car.numberOfSeats }} seats</p>
          <span class="hidden sm:inline">|</span>
          <p class="whitespace-nowrap">{{ car.miles }} miles</p>
        </div>
      </div>

      <!-- Right Section: Price -->
      <div class="mt-4 sm:mt-0 text-right">
        <p class="text-xl sm:text-3xl lg:text-4xl font-semibold text-blue-600">
          {{ formatCurrency(car.price, 'INR', 'en-IN') }}
        </p>
      </div>
    </div>
  </div>
</template>

