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
    >
      <AllCar/>
    </div>
  </main>
  <!-- CARS PAGE -->
</template>
