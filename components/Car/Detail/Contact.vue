<template>
    <!-- CAR CONTACT -->
      <div class="mt-10 max-w-2xl">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Contact Seller
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Email"
          />
          <input
            type="tel"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Phone"
          />
        </div>
        <textarea
          class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none w-full mt-4"
          rows="4"
          placeholder="Message"
        ></textarea>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4 w-full sm:w-auto transition"
        >
          Submit
        </button>
      </div>
      <!-- CAR CONTACT -->
</template>