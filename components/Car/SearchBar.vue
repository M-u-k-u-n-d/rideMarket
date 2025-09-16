<script setup>
  const city = ref("");
  const router = useRouter();
  const cityError = ref(false);

  const handleSearch = () => {
    if(city.value.trim() === "") return cityError.value = true;
    router.push(`/city/${city.value.trim()}/car`);
  }
</script>

<template>
            <!-- Search Bar -->
        <div
          class="font-serif w-full max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl rounded-full bg-white flex overflow-hidden drop-shadow-2xl mx-auto"
        >
          <input
            type="text"
            class="py-2 sm:py-3 px-4 sm:px-5 w-full text-base sm:text-lg md:text-xl lg:text-2xl focus:outline-none"
            :class="cityError ? 'border-2 border-red-500 rounded-l-full' : ''"
            placeholder="Search by city..."
            v-model="city"
            @keydown.enter="handleSearch" 
          />
          <button
            class="bg-sky-500 px-4 sm:px-6 md:px-8 lg:px-10 text-white text-sm sm:text-base md:text-lg"
            @click="handleSearch"
          >
            Search
          </button>
        </div>
</template>