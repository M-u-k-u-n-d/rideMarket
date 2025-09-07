<script setup>
const route = useRoute();
useHead({
    title : `${route.params.name ? route.params.name.toUpperCase() : "Car"} - Details`,
})

definePageMeta({
    layout: 'custom'
})

const { cars } = useCars()

// find the car by id
const car = computed(() => {
  return cars.find(c => c.id === Number(route.params.id))
}).value;

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
