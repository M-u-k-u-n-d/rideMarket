<script setup>
const route = useRoute();
const { data: cars, refresh } = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make,
});

watch(
  () => route.query,
  () => {
    window.location.reload(true);
  }
);
</script>

<template>
  <!-- Car Cards -->
  <main class="lg:flex-1 min-w-0">
    <CarCards v-if="cars.length" :cars="cars" />
    <div
      v-else
      class="flex flex-col items-center justify-center p-10 bg-gray-50 border border-dashed border-gray-300 rounded-2xl shadow-sm text-center max-w-md mx-auto"
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486745.png"
        alt="No cars"
        class="w-24 h-24 mb-4 opacity-80"
      />
      <h2 class="text-xl font-semibold text-gray-700 mb-2">No Cars Found</h2>
      <p class="text-gray-500 mb-4">
        We couldn’t find any cars matching your filters. Try adjusting your
        search criteria.
      </p>
    </div>
  </main>
  <!-- CARS PAGE -->
</template>
