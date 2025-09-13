<script setup>
const props = defineProps({
  listing: Object,
});

const emits = defineEmits(['deleteClick']);
</script>

<template>
  <div class="shadow rounded overflow-hidden flex md:flex-row flex-col justify-between mb-4 ">
    <div class="flex md:flex-row flex-col">
      <img :src="listing.image" alt="" class="w-80 mr-3 h-44 object-cover" />
      <div class="p-3">
        <h1 class="text-2xl">{{ listing.name }}</h1>
        <p class="text-blue-400">${{ listing.price }}</p>
      </div>
    </div>
    <div class="p-3 flex">
      <NuxtLink
        class="text-blue-400 mr-4"
        :to="`/profile/listings/view/${listing.id}`"
        >View</NuxtLink
      >
      <p @click="emits('deleteClick',listing.id)" class="text-red-400 cursor-pointer">Delete</p>
    </div>
  </div>
</template>