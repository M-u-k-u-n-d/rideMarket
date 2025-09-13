<script setup>
definePageMeta({
  layout: "custom",
});

const { makes } = useCars();
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const info = useState("adInfo", () => {
  return {
    make: "",
    model: "",
    year: "",
    miles: "",
    price: "",
    city: "",
    seats: "",
    features: "",
    description: "",
    image: null,
  };
});

const errorMessage = ref("");

const onChangeInput = (data, name) => {
  info.value[name] = data;
};

const inputs = [
  {
    id: 1,
    title: "Model *",
    name: "model",
    placeholder: "Civic",
  },
  {
    id: 2,
    title: "Year *",
    name: "year",
    placeholder: "2019",
  },
  {
    id: 3,
    title: "Price *",
    name: "price",
    placeholder: "10000",
  },
  {
    id: 4,
    title: "Miles *",
    name: "miles",
    placeholder: "10000",
  },
  {
    id: 5,
    title: "City *",
    name: "city",
    placeholder: "Austin",
  },
  {
    id: 6,
    title: "Number of Seats *",
    name: "seats",
    placeholder: "5",
  },
  {
    id: 7,
    title: "Features *",
    name: "features",
    placeholder: "Leather Interior, No Accidents",
  },
];

const isButtonDisabled = computed(() => {
  for (const key in info.value) {
    if (!info.value[key]) {
      return true;
    }
  }
  return false;
});


const handleSubmit = async () => {
  const fileName = `${Date.now()}-${info.value.image.name}`;
  const { data, error } = await supabase.storage
    .from("images")
    .upload("public/" + fileName, info.value.image);

  if (error) {
    return (errorMessage.value = "Cannot upload image");
  }

  // ✅ Get public URL for the uploaded image
  const { data: publicUrlData } = supabase.storage
    .from("images")
    .getPublicUrl("public/" + fileName);

  const body = {
    ...info.value,
    city: info.value.city.trim().toLowerCase(),
    features: info.value.features.split(",").map((f) => f.trim()),
    numberOfSeats: parseInt(info.value.seats),
    year: parseInt(info.value.year),
    miles: parseInt(info.value.miles),
    price: parseFloat(info.value.price),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id,
    image: publicUrlData.publicUrl, // ✅ Pass full URL
  };
  delete body.seats;

  try {
    await $fetch("/api/car/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    navigateTo(`/profile/listings`);
  } catch (err) {
    errorMessage.value = err.statusMessage;
    await supabase.storage.from("images").remove([data.path]);
  }
};

</script>

<template>
  <div>
    <div class="mt-24">
      <h1 class="text-6xl">Create a New Listing</h1>
    </div>
    <div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
      <CarAdSelect
        title="Make *"
        :options="makes"
        name="make"
        @change-input="onChangeInput"
      />
      <CarAdInput
        v-for="input in inputs"
        :key="input.id"
        :title="input.title"
        :name="input.name"
        :placeholder="input.placeholder"
        @change-input="onChangeInput"
      />
      <CarAdTextarea
        title="Description *"
        name="description"
        placeholder=""
        @change-input="onChangeInput"
      />
      <CarAdImage @change-input="onChangeInput" />
      <div class="w-full flex justify-between items-center">
        <button
          @click="handleSubmit"
          :disabled="isButtonDisabled"
          :class="[
            'rounded py-2 px-7 mt-3 transition-all duration-200',
            isButtonDisabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
              : 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer',
          ]"
        >
          Submit
        </button>

        <p
          v-if="errorMessage"
          class="text-red-500 text-sm font-medium mt-3 ml-4 bg-red-50 border border-red-300 rounded px-3 py-1 shadow-sm"
        >
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
