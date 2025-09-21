<script setup>
const message = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
});
const route = useRoute();
const disableButton = computed(() => {
  for(let key in message.value) {
    if(message.value[key].trim() === '') {
      return true;
    }
  }
  return false;
});

const errorMessage = ref('');
const successMessage = ref('');

const onSubmit = async () => {
  try {
    const response = await $fetch(`/api/car/listings/${route.params.id}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message.value),
    });
    message.value = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    successMessage.value = 'Message sent successfully!';
    errorMessage.value = '';
  } catch (err) {
    errorMessage.value = err.statusMessage;
    successMessage.value = '';
  }
};
</script>

<template>
  <!-- CAR CONTACT -->
  <div class="mt-10 sm:mt-12 max-w-2xl mx-auto px-3 sm:px-6 lg:px-8">
    <h2 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 sm:mb-6">
      Contact Seller
    </h2>

    <!-- Input Fields -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        type="text"
        class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none w-full text-base sm:text-lg"
        placeholder="Name"
        v-model="message.name"
      />
      <input
        type="email"
        class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none w-full text-base sm:text-lg"
        placeholder="Email"
        v-model="message.email"
      />
      <input
        type="tel"
        class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none w-full text-base sm:text-lg"
        placeholder="Phone"
        v-model="message.phone"
      />
    </div>

    <!-- Message Box -->
    <textarea
      class="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none w-full mt-4 text-base sm:text-lg"
      rows="4"
      placeholder="Message"
      v-model="message.message"
    ></textarea>

    <!-- Submit Button -->
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl mt-4 w-full sm:w-auto transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="onSubmit"
      :disabled="disableButton"
    >
      Submit
    </button>

    <!-- Response Messages -->
    <p
      v-if="errorMessage"
      class="text-red-600 text-sm sm:text-base font-medium mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-2 shadow-sm"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="successMessage"
      class="text-green-600 text-sm sm:text-base font-medium mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-2 shadow-sm"
    >
      {{ successMessage }}
    </p>
  </div>
  <!-- CAR CONTACT -->
</template>
