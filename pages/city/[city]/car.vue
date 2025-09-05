<script setup>

const route = useRoute();
useHead({
    title : `${route.params.make ? route.params.make.toUpperCase() : "Cars"} in ${route.params.city.toUpperCase()}`,
})
</script>

<template>
  <Navbar />
  <!-- CARS PAGE -->
  <div class="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
    <div class="mt-32 flex flex-col lg:flex-row gap-6"> 
      <!-- Sidebar -->
      <aside class="w-full lg:basis-1/4 lg:max-w-xs shrink-0">
        <CarSidebar />
      </aside>

      <!-- Car Cards -->
      <main class="w-full lg:flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>
  </div>
  <!-- CARS PAGE -->
</template>
