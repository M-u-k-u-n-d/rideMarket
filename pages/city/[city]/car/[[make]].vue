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
      <AllCar/>
    </div>
  </main>
  <!-- CARS PAGE -->
</template>
