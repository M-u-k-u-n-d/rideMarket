<script setup>
const route = useRoute();

useHead({
  title: `${
    route.params.make ? route.params.make.toUpperCase() : "Cars"
  } in ${route.params.city?.toUpperCase() || ""}`,
});

definePageMeta({
  layout: "custom",
});

const goToCars = () => {  
  navigateTo("/");
};
</script>

<template>
  <!-- CARS PAGE -->
  <NuxtErrorBoundary>
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

    <!-- Error fallback -->
    <template #error="{ error }">
      <div class="text-center py-20">
        <h1 class="text-4xl font-bold mb-4">Error {{ error.statusCode }}</h1>
        <p class="text-lg text-gray-600">{{ error.statusMessage }}</p>

        <!-- Fixed button -->
        <button
          class="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          @click="goToCars"
        >
          Return to Cars
        </button>
      </div>
    </template>
  </NuxtErrorBoundary>
  <!-- CARS PAGE -->
</template>
