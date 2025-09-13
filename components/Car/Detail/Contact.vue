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
      <div class="mt-10 max-w-2xl">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Contact Seller
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="text"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Name"
            v-model="message.name"
          />
          <input
            type="email"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Email"
            v-model="message.email"
          />
          <input
            type="tel"
            class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            placeholder="Phone"
            v-model="message.phone"
          />
        </div>
        <textarea
          class="border p-3 rounded-lg focus:ring focus:ring-blue-200 outline-none w-full mt-4"
          rows="4"
          placeholder="Message"
          v-model="message.message"
        ></textarea>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-4 w-full sm:w-auto transition"
          @click="onSubmit"
          :disabled="disableButton"
        >
          Submit
        </button>
        <p
          v-if="errorMessage"
          class="text-red-500 text-sm font-medium mt-3 ml-4 bg-red-50 border border-red-300 rounded px-3 py-1 shadow-sm"
        >
          {{ errorMessage }}
        </p>
        <p
          v-if="successMessage"
          class="text-green-500 text-sm font-medium mt-3 ml-4 bg-red-50 border border-red-300 rounded px-3 py-1 shadow-sm"
        >
          {{ successMessage }}
        </p>
      </div>
      <!-- CAR CONTACT -->
</template>