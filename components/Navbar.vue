<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.error(error)
  
  // Supabase composables auto-update `user`
  navigateTo("/")
}
</script>

<template>
  <header
    class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
  >
    <NuxtLink class="text-3xl font-mono" to="/">rideMarket</NuxtLink>

    <div v-if="user" class="flex">
      <NuxtLink to="/profile/listings" class="mr-5">
        {{ user.email.split("@")[0] }}
      </NuxtLink>
      <p class="cursor-pointer" @click="logout">Logout</p>
    </div>

    <div v-else>
      <NuxtLink to="/login" class="mr-5">Login</NuxtLink>
    </div>
  </header>
</template>
