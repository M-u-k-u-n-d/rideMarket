<script setup>
const route = useRoute();
useHead({
    title : `${route.params.name ? route.params.name.toUpperCase() : "Car"} - Details`,
})

definePageMeta({
    layout: 'custom'
})

</script>

<template>
  <div>
    <!-- CAR DETAIL PAGE -->
      <CarDetailHero />
      <CarDetailAttributes />
      <CarDetailDescription />
      <CarDetailContact />
    <!-- CAR DETAIL PAGE -->
  </div>
</template>
