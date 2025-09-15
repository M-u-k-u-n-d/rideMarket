<script setup>
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="even:bg-gray-100 p-4 sm:p-6">
    <h1 class="font-bold text-xl sm:text-2xl break-words">{{ message.name }}</h1>
    <p class="text-gray-700 mt-2 sm:mt-3 break-words">
      {{ message.message }}
    </p>
    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mt-3 sm:mt-4">
      <p class="text-green-700 break-words">{{ message.email }}</p>
      <p class="text-blue-500 break-words mt-1 sm:mt-0">{{ message.phone }}</p>
    </div>
  </div>
</template>
