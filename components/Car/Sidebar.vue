<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFetchAllCars } from "@/composables/useFetchAllCars";

const route = useRoute();
const router = useRouter();
const { cities, makesByCity } = useFetchAllCars();

const modal = ref({ make: false, location: false });
const city = ref(route.params.city || "");

// Refs for dropdowns
const locationDropdown = ref(null);
const makeDropdown = ref(null);

// Filtered makes based on selected city
const filteredMakes = computed(() => (city.value ? makesByCity(city.value) : []));

// Toggle modal
const updateModal = (type, event) => {
  event.stopPropagation();
  modal.value[type] = !modal.value[type];
};

// Actions
const onChangeLocation = () => {
  modal.value.location = false;

  // Reset Make to "Any" when location changes
  router.push({ params: { city: city.value, make: "" } });
};

const onChangeMake = (make) => {
  modal.value.make = false;
  router.push({ params: { city: city.value, make } });
};

// Click outside handler
const handleClickOutside = (event) => {
  if (modal.value.location && locationDropdown.value && !locationDropdown.value.contains(event.target)) {
    modal.value.location = false;
  }
  if (modal.value.make && makeDropdown.value && !makeDropdown.value.contains(event.target)) {
    modal.value.make = false;
  }
};

onMounted(() => document.addEventListener("mousedown", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("mousedown", handleClickOutside));
</script>

<template>
<div class="shadow border w-full rounded-lg bg-white relative">
  <!-- Location -->
  <div class="p-5 flex justify-between items-center border-b relative">
    <h3 class="font-medium text-gray-700">Location</h3>
    <h3
      @click="(e) => updateModal('location', e)"
      class="text-blue-500 cursor-pointer font-semibold capitalize"
    >
      {{ city || "Any" }}
    </h3>

    <transition>
      <div
        v-if="modal.location"
        ref="locationDropdown"
        @click.stop
        class="absolute right-5 top-full mt-2 w-64 border shadow-lg rounded-lg bg-white p-4 z-10"
      >
        <select v-model="city" class="w-full border p-2 rounded">
          <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
        </select>
        <button
          class="bg-blue-500 w-full mt-3 rounded text-white p-2 font-medium hover:bg-blue-600"
          @click="onChangeLocation"
        >
          Apply
        </button>
      </div>
    </transition>
  </div>

  <!-- Make -->
  <div class="p-5 flex justify-between items-center border-b relative">
    <h3 class="font-medium text-gray-700">Make</h3>
    <h3
      @click="(e) => updateModal('make', e)"
      :class="{
        'text-blue-500 cursor-pointer font-semibold capitalize': city,
        'text-gray-400 cursor-not-allowed': !city
      }"
    >
      {{ route.params.make || "Any" }}
    </h3>

    <!-- Make dropdown without transition when city not selected -->
    <div
      v-if="modal.make && city"
      ref="makeDropdown"
      @click.stop
      class="absolute z-30 border shadow left-0 top-full p-5 w-full flex flex-wrap bg-white cursor-pointer"
    >
      <h4
        v-for="make in filteredMakes"
        :key="make"
        class="w-1/3 hover:bg-gray-100 p-1 rounded text-center"
        @click="onChangeMake(make)"
      >
        {{ make }}
      </h4>
      <h4
        class="w-1/3 hover:bg-gray-100 p-1 rounded text-center"
        @click="onChangeMake('')"
      >
        Any
      </h4>
    </div>
  </div>
</div>
</template>
