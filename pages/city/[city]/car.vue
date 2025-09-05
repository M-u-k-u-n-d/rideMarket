<script setup>

const route = useRoute();
useHead({
    title : `${route.params.make ? route.params.make.toUpperCase() : "Cars"} in ${route.params.city.toUpperCase()}`,
})

definePageMeta({
    layout: 'custom'
})
</script>

<template>
  <!-- CARS PAGE -->
    <div class="mt-0 flex flex-col lg:flex-row gap-6"> 
      <!-- Sidebar -->
      <aside class="w-full lg:basis-1/4 lg:max-w-xs shrink-0">
        <CarSidebar />
      </aside>

      <!-- Car Cards -->
      <main class="w-full lg:flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>
  <!-- CARS PAGE -->
</template>
