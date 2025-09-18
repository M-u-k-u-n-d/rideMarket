<script setup>
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "#imports";

const client = useSupabaseClient();
const { formatCurrency } = useUtilities();
const cityMap = ref({});
const errorMsg = ref("");
const loading = ref(false);

onMounted(async () => {
  loading.value = true;

  const { data, error } = await client.from("car").select("city, make, price");
  loading.value = false;

  if (error) {
    console.error("Error fetching cars:", error);
    errorMsg.value = "Failed to load city data";
    return;
  }

  const mapObj = {};

  for (const row of data) {
    let rawCity = (row.city || "").trim();
    const make = (row.make || "").trim();
    const price = row.price || 0;
    if (!rawCity || !make || !price) continue;

    // ✅ Normalize city name (case-insensitive)
    const cityKey = rawCity.toLowerCase();
    const displayCity = titleCase(rawCity);

    if (!mapObj[cityKey]) {
      mapObj[cityKey] = {
        displayName: displayCity,
        makes: new Set(),
        minPrice: price,
        maxPrice: price,
      };
    }

    const cityData = mapObj[cityKey];
    cityData.makes.add(make);
    if (price < cityData.minPrice) cityData.minPrice = price;
    if (price > cityData.maxPrice) cityData.maxPrice = price;
  }

  // Convert sets to arrays for display
  for (const key in mapObj) {
    mapObj[key].makes = Array.from(mapObj[key].makes);
  }

  cityMap.value = mapObj;
});

function titleCase(s = "") {
  return s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function sortedCities() {
  return Object.keys(cityMap.value)
    .map((key) => cityMap.value[key])
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

function getCityData(cityObj) {
  return cityObj || { makes: [], minPrice: 0, maxPrice: 0 };
}
</script>

<template>
  <div class="p-4 max-w-xl ">
    <h2 class="text-lg font-semibold mb-3">Cities & Car Info</h2>

    <div v-if="loading" class="text-sm text-slate-600">Loading...</div>
    <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>

    <div v-else class="overflow-x-auto w-full">
      <div class="mt-4 p-3 bg-white rounded-lg shadow-md">
        <!-- 📱 Mobile View (Cards) -->
        <div class="space-y-3 sm:hidden">
          <div
            v-for="cityObj in sortedCities()"
            :key="cityObj.displayName"
            class="border rounded-lg p-3 shadow-sm bg-gray-50"
          >
            <h3 class="font-bold text-base mb-1">{{ cityObj.displayName }}</h3>
            <p class="text-sm">
              <strong>Makes:</strong> {{ cityObj.makes.join(", ") }}
            </p>
            <p class="text-sm">
              <strong>Price Range:</strong> ₹{{
                formatCurrency(cityObj.minPrice, "INR", "en-IN")
              }}
              - ₹{{ cityObj.maxPrice }}
            </p>
          </div>
        </div>

        <!-- 💻 Desktop View (Table) -->
        <div class="hidden sm:block overflow-x-auto">
          <table class="min-w-full border border-gray-50 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-3 py-2 border text-left whitespace-nowrap">
                  Location
                </th>
                <th class="px-3 py-2 border text-left">Makes</th>
                <th class="px-3 py-2 border text-left whitespace-nowrap">
                  Price Range
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cityObj in sortedCities()"
                :key="cityObj.displayName"
                class="hover:bg-gray-50"
              >
                <td class="px-3 py-2 border font-medium">
                  {{ cityObj.displayName }}
                </td>
                <td class="px-3 py-2 border">
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="make in cityObj.makes"
                      :key="make"
                      class="bg-gray-100 px-2 py-0.5 rounded text-xs"
                    >
                      {{ make }}
                    </span>
                  </div>
                </td>
                <td class="px-3 py-2 border whitespace-nowrap">
                  {{ formatCurrency(cityObj.minPrice, "INR", "en-IN") }} -
                  {{ formatCurrency(cityObj.maxPrice, "INR", "en-IN") }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="sortedCities().length === 0"
          class="text-center text-gray-500 mt-4 text-sm"
        >
          No city data available.
        </div>
      </div>
    </div>
  </div>
</template>
