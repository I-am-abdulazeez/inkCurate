<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";

import { useBookStore } from "@/stores/bookStore";

const bookStore = useBookStore();
const router = useRouter();

onMounted(() => {
  if (!bookStore.selectedBook) {
    console.warn("No book selected, redirecting...");
    router.push("/explore");
  }
});
</script>

<template>
  <div
    v-if="bookStore.selectedBook"
    class="container mx-auto mt-[8rem] py-5 px-5"
  >
    <RouterLink :to="'/explore'" class="text-sm font-semibold text-violet-200">
      Go back
    </RouterLink>
    <h1 class="text-white text-3xl font-semibold mt-4">
      {{ bookStore.selectedBook.title }}
    </h1>
    <p class="text-gray-400 mt-2">
      Author: {{ bookStore.selectedBook.authors.join(", ") }}
    </p>
    <img
      :src="bookStore.selectedBook.thumbnail!"
      :alt="bookStore.selectedBook.title"
      class="w-48 h-64 object-cover mt-4"
    />
    <p class="text-gray-300 text-base sm:text-lg my-4">
      {{ bookStore.selectedBook.description }}
    </p>

    <a
      :href="bookStore.selectedBook.link"
      target="_blank"
      class="text-sm font-semibold text-violet-200"
      >View Book</a
    >
  </div>

  <div v-else class="text-gray-400 text-center mt-10">
    No book selected. Please go back and choose a book.
  </div>
</template>
