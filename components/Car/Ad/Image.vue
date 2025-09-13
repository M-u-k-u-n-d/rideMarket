<script setup>
const image = useState("carImage", () => ({
  preview: null,
  image: null,
}));

const emits = defineEmits(["changeInput"]);

const onImageUpload = (event) => {
  const input = event.target;
  if (input.files?.length) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value.preview = e.target.result;
    };
    image.value.image = input.files[0];
    reader.readAsDataURL(input.files[0]);
    emits("changeInput", input.files[0], "image");
  }
};

</script>

<template>
  <div class="mt-4 w-full max-w-sm space-y-3">
    <label class="block text-sm font-medium text-cyan-600">
      Upload Image*
    </label>

    <!-- File Input Styled -->
    <label
      class="flex w-full cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-cyan-400 bg-cyan-50 px-4 py-6 text-sm font-medium text-cyan-600 hover:bg-cyan-100 transition"
    >
      <input type="file" accept="image/*" class="hidden" @change="onImageUpload" />
      Click to browse file
    </label>

    <!-- Preview -->
    <div
      v-if="image.preview"
      class="rounded-2xl border border-gray-200 bg-white shadow-md p-2 w-48"
    >
      <img
        :src="image.preview"
        class="w-full h-auto rounded-xl object-cover"
      />
    </div>
  </div>
</template>
