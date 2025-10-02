<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-change']);

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page);
  }
};

const visiblePages = computed(() => {
  const pages = [];
  const current = props.currentPage;
  const total = props.totalPages;
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push('...');
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(total);
    }
  }
  
  return pages;
});
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-8 mb-4">
    <!-- Previous Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      :class="[
        'px-3 py-2 rounded-lg border font-medium transition-colors',
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500'
      ]"
    >
      Previous
    </button>

    <!-- Page Numbers -->
    <div class="flex gap-1">
      <button
        v-for="(page, index) in visiblePages"
        :key="index"
        @click="typeof page === 'number' && changePage(page)"
        :class="[
          'px-3 py-2 rounded-lg border font-medium transition-colors min-w-[40px]',
          page === currentPage
            ? 'bg-blue-500 text-white border-blue-500'
            : typeof page === 'number'
            ? 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500'
            : 'bg-white text-gray-400 cursor-default border-transparent'
        ]"
        :disabled="typeof page !== 'number'"
      >
        {{ page }}
      </button>
    </div>

    <!-- Next Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      :class="[
        'px-3 py-2 rounded-lg border font-medium transition-colors',
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-500'
      ]"
    >
      Next
    </button>
  </div>

  <!-- Results Info -->
  <div v-if="total > 0" class="text-center text-sm text-gray-600 mt-2">
    Page {{ currentPage }} of {{ totalPages }} ({{ total }} total results)
  </div>
</template>
