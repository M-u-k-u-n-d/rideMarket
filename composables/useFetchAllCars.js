import { ref, computed, onMounted } from "vue";
import { useSupabaseClient } from "#imports";

export function useFetchAllCars() {
  const client = useSupabaseClient();
  const cars = ref([]);
  const loading = ref(false);
  const errorMsg = ref("");

  const fetchCars = async () => {
    loading.value = true;
    const { data, error } = await client.from("car").select("*");
    loading.value = false;

    if (error) {
      errorMsg.value = "Failed to load car data";
      console.error(error);
      return;
    }

    // ✅ Normalize city and make
    cars.value = (data || []).map((c) => ({
      ...c,
      city: titleCase(c.city),
      make: titleCase(c.make),
    }));
  };

  onMounted(fetchCars);

  // ✅ Get unique cities (case-insensitive)
  const cities = computed(() => {
    const set = new Set();
    cars.value.forEach((c) => {
      if (c.city) set.add(c.city.toLowerCase());
    });
    return [...set].map((c) => titleCase(c));
  });

  // ✅ Get unique makes for a given city (case-insensitive)
  const makesByCity = (city) => {
    if (!city) return [];
    const cityLower = city.toLowerCase();
    const set = new Set();
    cars.value.forEach((c) => {
      if (c.city.toLowerCase() === cityLower && c.make) set.add(c.make.toLowerCase());
    });
    return [...set].map((m) => titleCase(m));
  };

  function titleCase(str = "") {
    return str
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return { cars, loading, errorMsg, fetchCars, cities, makesByCity };
}
