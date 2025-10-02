<script setup>
import Car from "~/pages/city/[city]/car.vue";

definePageMeta({
  layout: "custom",
});

const user = useSupabaseUser();
const route = useRoute();
const router = useRouter();

const currentPage = ref(parseInt(route.query.page) || 1);
const limit = 6;

const { data: response, refresh } = await useFetch(
  `/api/car/listings/user/${user.value.id}`,
  {
    query: {
      page: currentPage,
      limit
    }
  }
);

const listings = computed(() => response.value?.listings || []);
const pagination = computed(() => response.value?.pagination || {});

const handleDelete = async (id) => {
  await $fetch(`/api/car/listings/${id}`, {
    method: "DELETE",
  });
  await refresh();
};

const handlePageChange = async (page) => {
  currentPage.value = page;
  
  router.push({
    query: {
      page
    }
  });
  
  await refresh();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(
  () => route.query.page,
  async (newPage) => {
    if (newPage) {
      currentPage.value = parseInt(newPage);
      await refresh();
    }
  }
);
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1
        class="text-4xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6"
      >
        My Listings
      </h1>

      <NuxtLink
        to="/profile/listings/create"
        class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
        >+</NuxtLink
      >
    </div>
    
    <div class="shadow rounded p-3 mt-5">
      <CarListingCard
        v-for="listing in listings"
        :key="listing.id"
        :listing="listing"
        @deleteClick="handleDelete"
      />
      
      <div v-if="!listings.length" class="text-center py-8 text-gray-500">
        No listings found. Create your first listing!
      </div>
    </div>

    <Pagination 
      v-if="pagination.totalPages > 1"
      :current-page="pagination.page"
      :total-pages="pagination.totalPages"
      :total="pagination.total"
      @page-change="handlePageChange"
      class="mt-6"
    />
  </div>
</template>
