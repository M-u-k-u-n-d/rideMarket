<script setup>
definePageMeta({
  layout: "custom",
});

const { makes } = useCars();
const user = useSupabaseUser();

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
    image: "randomStringForImage",
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
  const body = {
    ...info.value,
    city: info.value.city.trim().toLowerCase(),
    features: info.value.features.split(",").map((f) => f.trim()),
    numberOfSeats: parseInt(info.value.seats),
    year: parseInt(info.value.year),
    miles: parseInt(info.value.miles),
    price: parseFloat(info.value.price),
    name: `${info.value.make} ${info.value.model}`,
    listerId: user.value.id, // Replace with actual user ID
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhISEhEWEBUXFRcWFhUXFRUYFhgXFRUWFhYVGhgYHSogGBolGxUVITEhJSkrLi4uGB8zODMtNyotLisBCgoKDg0OFQ8PFSsZFxktMCsrNy0rLSstLjctKys3MSstNystLS0tNy0tLTgrKzctKzc3KystLSs3KysrKys3K//AABEIALcBEwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQIDCAH/xABGEAACAQIDAwkFAwgIBwAAAAABAgADEQQSIQUxQQYHEzJRYXGBkSKhscHwUnLRFEJDRGKCg7IjJDNUkqLC0hUWF0WTlOH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAEQEC/9oADAMBAAIRAxEAPwC8YiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiYe0tpU6C3c68FG8wMtmA1JsJocbyywNIkHEKxG/Ldv5QZDNucoq2Lc0aSlxxUGyKO1m4+fkJiYDkbTGtdzUP2VJVB59Y+7wgSjEc5WCXcWPgj/AOoCa2pztYUblqnwpr86krLlvicOtbocMgVadw7ZmOZ+I1J0Xd437JHbNYHz3wLsPOrhz+biB4U6PzecDzoYU/pcUn8HDn8ZTLucty1vaC21vqG193vmKHvAu1ucLCn/ALliqfjhaRHuoGbzk9yiTE5ug2g2IKC7ZqKplB3XvSXsPoZUmz9k4M01Z3sbAnNVtvG8DSSTk8Fwexq2JAytiXZkB39HcrSU8bFQT/EhE0xfODhqJy1MQhPeAPS7C/jOFHnPwLAnpLgbzpb4mU7sXZlOsWNSmGYktmu9zrre7b9Z0UtkGlUq0teNu8EZkv8A5R+8YV6AwHLbBVupWU+fzOk31Guri6kGUJh9iYWpRSpTIpORuzaZhoR7R01E2PI/la+FqdBWY5AbAm90ubX1/N7Rw3wLviYeBxoqDv39xHaO6ZkBERAREQEREBERAREQEREBERARE+EwPsTFq4+mv51/CYtTav2Uv4mBtJ8Y2B4zStjqx3WXwFz75j10duvUZgfzb6egsIStfjOVr02Id6Kki607HMo4M7FvdbXu3yKVK1TG1GJqZaYNnqXF245U4fIX4yajCAWstrbtT2W4dxn1sNeQrRYVsPRUIjU0UftLcntJJuT3mazlJympUaFRqdVHq2siqwY5m0DWHAb/ACkt/I/rWff+HEg7wPEj33grzZSszr0jZVLDO2pNr6ntJtebHHV0ao5QgqWJXhodwsd1t09BnBDi3xM4NgqfFQ3iq/OCvOdbXQb79onStM3noupsTDt1sNRb71Kmf9Mx25MYHjg6HlSUfCCqCw+EatUp0V69R1RfFyFB8NZbnLWir1MFs2iVUBQoHABVst7br5VkjwOwMHRcVKWFpI4uQ4Rcwv2Hh2aTXbV5GricSMUa1ZHWwUIQoGUae0Pa7eI3wNFheSTqCOlVbXF1DE3BsRcd4tNJyowLYdqZzmqzhuBzDIF8z1h6Sf4XAIHNOuCW4MzMQe423+c2uHwWHpdRFHguvqYKo+psuvUA6OhUa99ynuPzmVhuTW06lRWfDta2Uk5AbWtrrr59kuVNq0icq3J17dwNidBa2k5Pje5RBWk5F0sXRp9FiFsEP9E4YEhfsnjpqB3b5Mk2v2r47x8RI5iNp1Ayqqgg2FwBpc6nyEyqrOBfMT2wJVh64dQw+u6dsj3JvEMXdSb6X8wbfOSGVSIiAiIgIiICIiAiIgIiIHXiawRGc7lUsbamwFzYcZX78vqLVOjrpVwraaOAbZgCLlCbaEb+3WSXlw1Q4SqlFDVdsgKDeULr0lhx9nNu7ZWNfkfiFrrWFJlpGojNmqqzBBUJsRe5spA8oRMsVylwVA2r4inTb7JbUeIHGda8u9mf3yl6n8J58205qVnqtqajM/qT+E7KdPBkatXQ9602W/ZdbH3QR6HTlns86LjKXr/8mRR5QYNuriaZ/fX5zzlSweEIObENfhlosf5rfV5i4ijR/Rl3++irp3WZvlBHqehiEfqOr/dZT8J2Ffq0o3mcov8AlbMpIppTYsATlJYgLpuvvN+49snfLLar3WghK5hdmsbWvYDwNj6cb2kEyfFonWemneXA+M6G2rhz+s0j/EU/AyqMIoLDMKy3IIC08QotpqciDt4DhOe1MXVoIUQlSwLCpevcan2Tn9oMBYkWBsTpulhFmnbuE1/rNOy2DWYaE3sO7cfQzJoVlcKyEMrahlNwe+/GRDYQtSas6FhpkzHO7E2W2Zhc+1YDeNRJHgFFNVS4JVQDl1GY6sdO0kyDZ1aoAsPMzV1sct+t8TIRzlcsmw4FCgbVGFyxHUXUXsd7XBtfTQk8L1LiFrVD0rVGqPvzMxL+RO6CPSdLFeHjOTYnvJ0+vjK15r+UT1w9CsxZ6YBVj1im6x7SD8ZP8316QGLOYaDUbp8FZiBw0nxmnWzQjr6BQSwUBjx46z60+MZwZoGTg0u3hIHyy5y3w9dqWGpLVWm2Wo75rFh1kXKRYjdmN9bi2msv2hj+gw1etxVGI8bWUetpWez+Ti1sOSxbpXUspN7FiyWBF9Qys7EkcOEKtvkJtpcWaVen7K1KZuv2WFsynvBBk7lPcxNBhRF93SVreFlX4gy4YxSIiUIiICIiAiIgIiICIiBHNo4sjEOAbWVRbyv85j46uXRl7fxnTtJl6etc5WzDv0CgL7rHznSX75GXnXaNBlYqwsV9kg7wQddOH15YVvr6+vnc23uQGFxNRqoZ6LsbsVIKknecrDt7CJHa/Na1/YxYt2NSPxDfKVqq8H19fX48pPBzXVtP61T/AMDn5zOwPNeoINbElxe5VEy37sxY2gSDmj2WKWENVhrWbN+4vsqPDrHzliLiVt1b+k0OFy01VEAVVAVQNwA0AmQK0jLbflK/Z+ExqwpHejacA7qum72VNpiqxM7RSY8IHF6qLYrSUEbmPtML77E6jeZjVq+RHc8AW9BeZFXDkb5oOV2JanhKrJq4AIFjqQwNrDXU6Sa1zLlVhtTaqVaVfGImWsKiAllVjlPsW9sHJb2Tpb1vNn/w+liFwlJ6eXFV1uGRQrXy5tRoGsDqDp2azJwOzqeJVqzUnQVMjVEva5U5sxJ1N2uCLcB2mYO08fVpVKj06FWvXdWp9IKdTo6dNvzKdhe1jqeJvu3CjH5G0GobTVHIDWembG6uCtwQRoRoDf8ACWt0kqvaRqUhs/FPTNFg2U6EXCNcHXt9vT9qWtRwTt3Cw+cJrqapOsvM04Omv9pWVfMTia+GXcHq94U29TCMFnnIUXO5T6TIO0gOpRVPvNf+WY+I2ywBJqBABc2AUAduY8IEb5zcSaWDSkdDUqKCO5QX+Kia/Z9VqaUEBQhlILs4BCFcpZV3sbcRewPbYjQc423qeIq0Vp1elFNWLMGzC7lbC40uAv8Amko2eqvh8K4pDKw1pnLkshyh9d2qbuN9+kNYnXNVgwMOaiiwNSuF7/6xUJPuUScyPcgKdsBhza3SB6wFrWFeo9YC3hUEkMoREQEREBERAREQEREBERArXnA5M1K+J6WlXp0myr7NRXs1hbNmX08hITtjkltLKqUq6VFGpIxIBLHeBnIyqNABfXUnha+sS6Ae3a3eLyt+cTDpUUVMHi/yWsgIKWPRVRvsRYhXHBrdx4EQVgeTW206qVj93EUanoBUM4HD7ep3vTxg7xRZh36qpE1WJ5UbSpsc2JqKR3Jb+W050OcDHr+mVvvU0+QEo2B23tinvXE9+fD1B/pE4/8APG0U6xCj9umw+JE7cFzkbQJF3pKvE5Wv5AOLmbirzm1hudiO9nHweBgbO5zKqsOmCOt9chCsB2gG4PhcSWbR5VV6dNMRRpJisM/VrKzrZuKOljkbuuZGjzo1ONIP4uT/ADKZkpzqUgCDQIvqwFLDEE9u4X8TCNngecJmDk01p5RexqG7WBNhpv0t5zO2Zy8erlHRVFLMFCjOxuTYaLuHf3yOnnRof3c/+vhvxnL/AKrUtB0T9gtTpLb0OkgsGlji4ubg7iCb+h4iablSaz0gmHANRnUXJICgXYsSCLAZfhIrW5ylP6KofEr+M1uL5atXZQA1BQGBYEFwWFgwG666m3G8CT4KmGp1S1ZXal0S1GKdZ6oJDkHQKCQCN41vedK7XqVgyYbF1MLUo+zUwtRVynKLWU29jdwzDwmBsahWo7PxdKm9LE1MTlCOjZmyqbag2ZWBa5vu75s8Tsmgtb8oxlQ4cIidIi6NUYC1lI1JsAL33Ab4VoeVGCZaWEFbKK1V2Z8rAqFuFBvr9pt5O63CS7aXLHBJ18SptwFRnPpT/CVdyo2l+UVXZEKKxsiXLZU7CTvPf3maWns9jwlFk4vnLwqE9FSqVD25VQHzJze6aPG85mJb+zo00+8Wc+ug900WF2BUfchPgJJNl83WKq2tRI7zBGBQ5xcepvlpN96mrD0ItNg/OptJ6T0WpUWpujI6dEACrAqw9nuJkx2VzPObGq4Tukv2ZzYYOnbMDUPugebaGEqtotKo3gpJ+Em3JnY+1KiCiuGrCkSM1xkGU9YBjqL67p6EwOwcNR/s6Kr5C82IFt2kDA2I1Xo1FWitCwACK1wABYCbCIgIiICIiAiIgIiICIiAiIgcKtIMLEXmsxPJ3DvvSbaIEQxnN7hKnAj0mjxfNBhm6r2/dEsuIFO4nmRU9Wuo8VPymsr8x1b82vTPmw+UvWIHnutzI43816Z/f/ETCq8y20huFNv4i/OekYgeY6nM7tYbqCN/Fp/jMd+afa4/U83hVo/N56kiB5WHNftgfqDf+Sj/AL52U+bnbA/UKn+Oj/vnqWIHmfC8h9sqfZwNVT2ipSX39JN3szmr2niCDiiMOP2qi1H8PZJA9TL9iBV+A5nqC26SqW8B+MkeB5u8DTt/R5vGS2IGBhNjYen1KSr5CZyqBuFp9iAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiB//9k=",
  };
  delete body.seats;

  try {
    const response = await $fetch("/api/car/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    navigateTo(`/profile/listings`);
  } catch (err) {
    errorMessage.value = err.statusMessage;
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
