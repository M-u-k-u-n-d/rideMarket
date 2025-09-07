<script setup>
const { cars } = useCars();
</script>

<template>
   <!-- CAR CARDS -->
    <div class="w-full">
      <CarCard v-for="car in cars" :key="car.id" :car="car"/>
    </div>
    <!-- CAR CARDS -->
</template>