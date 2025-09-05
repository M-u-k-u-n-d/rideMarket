<template>
  <div
    class="relative h-screen w-full bg-no-repeat bg-cover bg-bottom bg-[url('https://carconfigurator.ferrari.com/f167spider/d6762fc498b6eda0d582b93f01bb64176acee8d5bd23133e0ab1932caa37f045-Blackroom-Day-beautyshot_ext_frontleft-2d.jpg')]"
  >
    <!-- Overlay -->
    <div class="absolute w-full h-full bg-black opacity-50"></div>

    <!-- Content -->
    <div class="absolute inset-0 z-10 flex justify-center items-center px-4">
      <div class="text-center w-full max-w-3xl">
        <!-- Heading -->
        <h1 
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mb-6 sm:mb-10 text-white"
        >
          Find your drive
        </h1>
        <CarSearchBar/>
      </div>
    </div>
  </div>
</template>
