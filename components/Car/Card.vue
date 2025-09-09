<script setup>
import { useUtilities } from "@/composables/useUtilities";
import heartFilled from "@/assets/heartFilled.png";
import heartOutline from "@/assets/heartOutline.png";
// get utility function
// accept props from parent
const props = defineProps({
  car: {
    type: Object,
    required: true,
  },
  favored: Boolean,
});

const emit = defineEmits("favor");

const { formatCurrency } = useUtilities();
</script>
<template>
  <!-- CAR CARD -->
  <div
    class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-auto sm:h-[220px] rounded-xl bg-white"
  >
    <!-- Heart Icon -->
    <img
      class="absolute top-2 right-2 w-5 sm:w-6 md:w-7 z-20"
      :src="props.favored ? heartFilled : heartOutline"
      alt="Favorite"
      @click="emit('favor', car.id)"
    />

    <div
      class="flex flex-col sm:flex-row h-full"
      @click="navigateTo(`/car/${car.name}-${car.id}`)"
    >
      <!-- Image -->
      <NuxtImg
        :src="car.url"
        :alt="car.name"
        class="w-full sm:w-[280px] h-[200px] sm:h-full object-cover"
      />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1">
        <div class="flex-1">
          <!-- Heading -->
          <h1
            class="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug mb-2 line-clamp-2"
          >
            {{ car.name }}
          </h1>

          <!-- Paragraph -->
          <p
            class="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3"
          >
            {{ car.description }}
          </p>
        </div>

        <!-- Price -->
        <h2 class="mt-4 sm:mt-auto text-lg sm:text-xl font-bold text-blue-700">
          {{ formatCurrency(car.price, "USD", "en-IN") }}
        </h2>
      </div>
    </div>
  </div>
  <!-- CAR CARD -->
</template>
