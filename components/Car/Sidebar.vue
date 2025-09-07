<script setup>
const modal = ref({
  make: false,
  location: false,
  price: false,
});

const updateModal = (type) => {
  modal.value[type] = !modal.value[type];
};
const city = ref();
const route = useRoute();
const onChangeLocation = () => {
  if (!city.value) return;
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid city format!!",
    });
  }
  updateModal("location");
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
  city.value = "";
};
</script>

<template>
  <!-- CAR SIDE BAR -->
  <div class="shadow border w-full rounded-lg bg-white relative">
    <!-- Location -->
    <div class="p-5 flex justify-between items-center border-b relative">
      <h3 class="font-medium text-gray-700">Location</h3>
      <h3
        @click="updateModal('location')"
        class="text-blue-500 capitalize font-semibold cursor-pointer"
      >
        {{ route.params.city }}
      </h3>

      <!-- Dropdown -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="modal.location"
          class="absolute right-5 top-full mt-2 w-64 border shadow-lg rounded-lg bg-white p-4 z-10"
        >
          <input
            type="text"
            placeholder="Enter location"
            class="border p-2 rounded w-full"
            v-model="city"
          />
          <button
            class="bg-blue-500 w-full mt-3 rounded text-white p-2 font-medium hover:bg-blue-600 transition"
            @click="onChangeLocation"
          >
            Apply
          </button>
        </div>
      </transition>
    </div>

    <!-- Make -->
    <div class="p-5 flex justify-between items-center border-b">
      <h3 class="font-medium text-gray-700">Make</h3>
      <h3 class="text-blue-500 capitalize font-semibold">Toyota</h3>
    </div>

    <!-- Price -->
    <div class="p-5 flex justify-between items-center border-b">
      <h3 class="font-medium text-gray-700">Price</h3>
      <h3 class="text-blue-500 capitalize font-semibold">—</h3>
    </div>
  </div>
  <!-- CAR SIDE BAR -->
</template>
