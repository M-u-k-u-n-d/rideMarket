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
const priceRange = ref({
  min: null,
  max: null,
});
const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;
  if (minPrice && maxPrice) {
    return `$${minPrice} - $${maxPrice}`;
  } else if (minPrice) {
    return `>= $${minPrice}`;
  } else if (maxPrice) {
    return `<= $${maxPrice}`;
  } else {
    return "Any";
  }
});
const route = useRoute();
const router = useRouter();
const { makes } = useCars();
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

const onChangeMake = (make) => {
  updateModal("make");
  navigateTo(`/city/${route.params.city}/car/${make}`);
};
const onChangePrice = () => {
  updateModal("price");

  if(priceRange.value.min && priceRange.value.max) {
    if(priceRange.value.min > priceRange.value.max) {
      return;
    }
    router.push({
      query: {
        minPrice: priceRange.value.min,
        maxPrice: priceRange.value.max,
      },
    });
  }

}
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
      <h3
        class="text-blue-500 capitalize font-semibold cursor-pointer"
        @click="updateModal('make')"
      >
        {{ route.params.make || "Any" }}
      </h3>
      <div
        class="absolute z-30 border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white cursor-pointer"
        v-if="modal.make"
      >
        <h4
          v-for="make in makes"
          :key="make"
          class="w-1/3 hover:bg-gray-100 p-1 rounded text-center"
          @click="onChangeMake(make)"
        >
          {{ make }}
        </h4>
      </div>
    </div>

    <!-- Price -->
    <div class="p-5 flex justify-between items-center border-b">
      <h3 class="font-medium text-gray-700">Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">{{priceRangeText}}</h3>
      <div
        class="absolute z-30 border bg-white left-56 p-5 top-1 -m-1"
        v-if="modal.price"
      >
        <input
          class="border p-1 rounded mb-2"
          type="number"
          placeholder="Min"
          v-model="priceRange.min"
        />
        <input
          class="border p-1 rounded"
          type="number"
          placeholder="Max"
          v-model="priceRange.max"
        />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1"
        @click="onChangePrice">
          Apply
        </button>
      </div>
    </div>
  </div>
  <!-- CAR SIDE BAR -->
</template>
