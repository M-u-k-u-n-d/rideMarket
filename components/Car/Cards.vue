<script setup>
const props = defineProps({
  cars: {
    type: Array,
    required: true,
  },
});

const favourite = ref(useLocalStorage('favourite', {}));
const handleFavourite = (id) => {
  if (id in favourite.value) {
    delete favourite.value[id];
  } else {
    favourite.value[id] =true;
  }
}; 
console.log("Here is the Car => ",props.cars)
</script>

<template>
   <!-- CAR CARDS -->
    <ClientOnly>
    <div class="w-full">
      <CarCard v-for="car in cars" :key="car.id" :car="car" @favor="handleFavourite"
      :favored="car.id in favourite"/>
    </div>
    </ClientOnly>
    <!-- CAR CARDS -->
</template>