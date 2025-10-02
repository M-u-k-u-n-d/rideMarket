<script setup>
const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page) || 1);
const limit = 6;

const { data: response, refresh } = await useFetchCars(
  route.params.city, 
  {
    minPrice: route.query.minPrice,
    maxPrice: route.query.maxPrice,
    make: route.params.make,
  },
  currentPage.value,
  limit
);

const cars = computed(() => response.value?.cars || []);
const pagination = computed(() => response.value?.pagination || {});

const handlePageChange = async (page) => {
  currentPage.value = page;
  
  router.push({
    query: {
      ...route.query,
      page
    }
  });
  
  await refresh();
};

watch(
  () => [route.params.city, route.params.make, route.query],
  async ([newCity, newMake, newQuery], [oldCity, oldMake, oldQuery]) => {
    if (newCity !== oldCity || newMake !== oldMake ||
        newQuery.minPrice !== oldQuery.minPrice || 
        newQuery.maxPrice !== oldQuery.maxPrice ||
        (newQuery.page !== oldQuery.page && newQuery.page)) {
      currentPage.value = parseInt(newQuery.page) || 1;
      await refresh();
    }
  }
);
</script>

<template>
  <!-- Car Cards -->
  <main class="lg:flex-1 min-w-0">
    <CarCards v-if="cars.length" :cars="cars" />
    
    <Pagination 
      v-if="pagination.totalPages > 1"
      :current-page="pagination.page"
      :total-pages="pagination.totalPages"
      :total="pagination.total"
      @page-change="handlePageChange"
    />
    
    <div v-if="!cars.length">
      <AllCar/>
    </div>
  </main>
  <!-- CARS PAGE -->
</template>
