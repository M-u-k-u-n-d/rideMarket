<script setup>
const route = useRoute();
useHead({
    title : `${route.params.name ? route.params.name.toUpperCase() : "Car"} - Details`,
})

definePageMeta({
    layout: 'custom'
})

const { data: car } = await useFetchCar(route.params.id);
</script>

<template>
  <div v-if="car">
    <!-- CAR DETAIL PAGE -->
      <CarDetailHero :car="car"/>
      <CarDetailAttributes :car="car" />
      <CarDetailDescription :car="car" />
      <CarDetailContact />
    <!-- CAR DETAIL PAGE -->
  </div>
  <div v-else>
    <CarNotFound />
  </div>
</template>
