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

console.log("Car in Hero => ", car)
</script>

<template>
  <div class="mt-10">
    <NuxtImg
      :src="car.image"
      class="w-full rounded-xl shadow-md"
      :alt="car.name"
    />

    <div class="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-start border-b pb-5">
      <div>
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">{{ car.name }}</h1>
        <div class="flex flex-wrap text-gray-500 text-lg mt-2 gap-x-4">
          <p>{{ car.numberOfSeats }} seats</p>
          <p>|</p>
          <p>{{ car.miles }} miles</p>
        </div>
      </div>

      <div class="mt-4 sm:mt-0">
        <p class="text-2xl sm:text-3xl font-semibold text-blue-600">
          {{ formatCurrency(car.price, 'INR', 'en-IN') }}
        </p>
      </div>
    </div>
  </div>
</template>
