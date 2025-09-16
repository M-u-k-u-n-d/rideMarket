<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

const client = useSupabaseClient()
const rows = ref([])
const errorMsg = ref('')
const loading = ref(false)

async function loadCities() {
  loading.value = true
  const { data, error } = await client.from('car').select('city')
  loading.value = false
  if (error) {
    console.error('Error fetching cities:', error)
    errorMsg.value = 'Could not load city suggestions'
    return
  }
  rows.value = data ?? []
}

onMounted(loadCities)

// helper: convert "new delhi" or "NEW DELHI" => "New Delhi"
function titleCase(s = '') {
  return s
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

// compute unique cities case-insensitively and return Title Case sorted list
const cities = computed(() => {
  const map = new Map()
  for (const r of rows.value) {
    const raw = (r?.city || '').trim()
    if (!raw) continue
    const key = raw.toLowerCase()
    if (!map.has(key)) {
      map.set(key, titleCase(raw))
    }
  }
  return Array.from(map.values()).sort((a, b) => a.localeCompare(b))
})
</script>

<template>
  <div class="p-4 max-w-xl mx-auto">
    <h2 class="text-lg font-semibold mb-3">Search these cities to find cars</h2>

    <div v-if="loading" class="text-sm text-slate-600">Loading suggestions...</div>
    <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>

    <div v-else class="flex flex-wrap gap-2">
      <button
        v-for="city in cities"
        :key="city"
        class="px-3 py-1 rounded-full text-sm bg-white border text-slate-700 hover:bg-sky-50"
        type="button"
        @click="$emit('select', city)"
        aria-label="Search city"
      >
        {{ city }}
      </button>

      <div v-if="cities.length === 0" class="text-sm text-slate-500">No city suggestions available</div>
    </div>
  </div>
</template>
