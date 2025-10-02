import { ref, computed } from "vue";
import { useSupabaseClient } from "#imports";

export function useFetchAllCars(page = 1, limit = 6) {
  const client = useSupabaseClient();
  const cars = ref([]);
  const loading = ref(false);
  const errorMsg = ref("");
  const pagination = ref({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  });

  const fetchCars = async (currentPage = page, currentLimit = limit) => {
    loading.value = true;
    
    const from = (currentPage - 1) * currentLimit;
    const to = from + currentLimit - 1;
    
    const [dataResult, countResult] = await Promise.all([
      client.from("car").select("*").range(from, to),
      client.from("car").select("*", { count: 'exact', head: true })
    ]);
    
    loading.value = false;

    if (dataResult.error) {
      errorMsg.value = "Failed to load car data";
      console.error(dataResult.error);
      return;
    }

    // ✅ Normalize city and make
    cars.value = (dataResult.data || []).map((c) => ({
      ...c,
      city: titleCase(c.city),
      make: titleCase(c.make),
    }));
    
    pagination.value = {
      page: currentPage,
      limit: currentLimit,
      total: countResult.count || 0,
      totalPages: Math.ceil((countResult.count || 0) / currentLimit)
    };
  };

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

  return { cars, loading, errorMsg, fetchCars, cities, makesByCity, pagination };
}
