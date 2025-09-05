<template>
  <!-- CAR CARD -->
  <div
    class="shadow border w-full overflow-hidden mb-5 cursor-pointer h-auto sm:h-[220px] rounded-xl bg-white"
  >
    <div class="flex flex-col sm:flex-row h-full">
      <!-- Image -->
      <img
        src="https://carwow-uk-wp-3.imgix.net/Volvo-XC40-white-scaled.jpg"
        alt="Volvo XC40"
        class="w-full sm:w-[280px] h-[200px] sm:h-full object-full"
      />

      <!-- Content -->
      <div class="p-4 flex flex-col flex-1">
        <div class="flex-1">
          <!-- Heading -->
          <h1
            class="text-xl sm:text-2xl font-semibold text-gray-900 leading-snug mb-2 line-clamp-2"
          >
            Volvo XC40
          </h1>

          <!-- Paragraph -->
          <p
            class="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3"
          >
            A premium compact SUV offering modern design, advanced safety
            features, and an efficient driving experience that fits both city
            and highway needs.
          </p>
        </div>

        <!-- Price -->
        <h2
          class="mt-4 sm:mt-auto text-lg sm:text-xl font-bold text-blue-700"
        >
          $39,555
        </h2>
      </div>
    </div>
  </div>
  <!-- CAR CARD -->
</template>
