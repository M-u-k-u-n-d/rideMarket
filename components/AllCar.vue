<script setup>
import { useRoute } from "vue-router";
import { useFetchAllCars } from "@/composables/useFetchAllCars";

const route = useRoute();
const { cars, loading, errorMsg } = useFetchAllCars();

// Normalize city for comparison
const selectedCity = route.params.city?.toLowerCase() || "";

// Check if there are any cars for this location
const noCarsForCity = computed(() => {
  if (!selectedCity) return false;
  return !cars.value.some(c => c.city.toLowerCase() === selectedCity);
});
</script>

<template>
  <div class="space-y-4">
    <!-- Message if no cars for selected city -->
    <div
      v-if="noCarsForCity && cars.length"
      class="flex flex-col sm:flex-row items-center justify-center bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-lg shadow-sm text-center gap-2"
    >
      <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.366-.446.957-.57 1.45-.284a1 1 0 01.293 1.53L8.794 6.62a1 1 0 01-1.587-1.262l.05-.052zM10 12a1 1 0 100 2 1 1 0 000-2zm-7 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
      </svg>
      <span>
        No cars available for 
        <strong class="text-blue-600">{{ route.params.city }}</strong>. 
        Showing all cars instead. Use filters to select another location.
      </span>
    </div>

    <!-- Cars list -->
    <CarCards v-if="cars.length" :cars="cars" />

    <!-- Loading -->
    <div v-else-if="loading" class="text-sm text-slate-600 p-4 text-center">
      Loading...
    </div>

    <!-- Error -->
    <p v-else-if="errorMsg" class="text-sm text-red-500 p-4 text-center">
      {{ errorMsg }}
    </p>

    <!-- No cars at all -->
    <p v-else class="text-center text-gray-500 mt-4 text-sm">
      No cars available.
    </p>
  </div>
</template>

