<script setup>
const route = useRoute();
useHead({
    title : `${route.params.name ? route.params.name.toUpperCase() : "Car"} - Details`,
})
</script>

<template>
  <div>
    <Navbar />

    <!-- CAR DETAIL PAGE -->
    <div class="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <CarDetailHero />
      <CarDetailAttributes />
      <CarDetailDescription />
      <CarDetailContact />
    </div>
    <!-- CAR DETAIL PAGE -->
  </div>
</template>
