<script setup>
import { ref } from "vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const isMenuOpen = ref(false);

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error(error);
  navigateTo("/");
  isMenuOpen.value = false;
};
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white border-b p-4 shadow-md flex items-center justify-between"
  >
    <!-- Logo -->
    <NuxtLink to="/" class="text-3xl font-mono">rideMarket</NuxtLink>

    <!-- Desktop Menu -->
    <div class="hidden sm:flex sm:items-center sm:space-x-5">
      <template v-if="user">
        <NuxtLink to="/profile/listings">{{ user.email.split('@')[0] }}</NuxtLink>
        <p class="cursor-pointer" @click="logout">Logout</p>
      </template>
      <template v-else>
        <NuxtLink to="/login">Login</NuxtLink>
      </template>
    </div>

    <!-- Mobile Hamburger -->
    <div class="sm:hidden">
      <button
        @click="isMenuOpen = !isMenuOpen"
        class="relative w-8 h-8 flex flex-col justify-between items-center"
      >
        <span
          :class="['block h-1 w-full bg-black transition-transform duration-300', isMenuOpen ? 'rotate-45 translate-y-3' : '']"
        ></span>
        <span
          :class="['block h-1 w-full bg-black transition-opacity duration-300', isMenuOpen ? 'opacity-0' : '']"
        ></span>
        <span
          :class="['block h-1 w-full bg-black transition-transform duration-300', isMenuOpen ? '-rotate-45 -translate-y-3' : '']"
        ></span>
      </button>
    </div>
  </header>

  <!-- Mobile Slide Menu -->
  <transition name="slide-fade">
    <div
      v-if="isMenuOpen"
      class="sm:hidden fixed top-16 right-0 w-3/4 h-full bg-white shadow-lg p-6 flex flex-col space-y-5 z-50"
    >
      <template v-if="user">
        <NuxtLink @click="isMenuOpen = false" to="/profile/listings">{{ user.email.split('@')[0] }}</NuxtLink>
        <p class="cursor-pointer" @click="logout">Logout</p>
      </template>
      <template v-else>
        <NuxtLink @click="isMenuOpen = false" to="/login">Login</NuxtLink>
      </template>
    </div>
  </transition>
</template>

<style>
/* Smooth slide + fade animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
