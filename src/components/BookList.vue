<script setup lang="ts">
import type { Book } from "@/types";
import { useRouter } from "vue-router";

import bookPlaceholder from "@/assets/book.jpg";
import { useBookStore } from "@/stores/bookStore";

defineProps<{
  books: Book[];
  loading: boolean;
  hasFetched: boolean;
}>();

const router = useRouter();
const bookStore = useBookStore();

const goToBookDetails = (book: Book) => {
  bookStore.setSelectedBook(book);
  router.push(`/explore/${encodeURIComponent(book.title)}`);
};
</script>

<template>
  <div v-if="loading" class="text-gray-400 mt-6 sm:text-sm">
    Fetching recommendations...
  </div>

  <div v-else-if="books.length" class="mt-12 mb-20">
    <h2 class="text-xl sm:text-2xl text-white font-semibold">
      Recommended Reads
    </h2>

    <div class="w-16 h-1 bg-violet-300 mt-2 mb-6 rounded-full"></div>

    <div class="grid sm:grid-cols-2 gap-6">
      <div
        v-for="book in books"
        :key="book.link"
        class="bg-gray-900 p-4 rounded-xl flex space-x-4 cursor-pointer overflow-hidden"
        @click="goToBookDetails(book)"
      >
        <img
          :src="book.thumbnail || bookPlaceholder"
          :alt="book.title"
          class="w-24 h-28 object-cover rounded-xl flex-shrink-0"
        />
        <div class="flex flex-col justify-between overflow-hidden">
          <div class="overflow-hidden">
            <h3 class="text-white text-lg font-semibold truncate">
              {{ book.title }}
            </h3>
            <p class="text-gray-400 text-sm truncate">
              {{ book.authors.join(", ") }}
            </p>
            <p
              class="text-gray-300 text-xs mt-2 max-h-[3rem] overflow-hidden text-ellipsis"
            >
              {{ book.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Show "No books found" only after fetching has been initiated -->
  <p v-else-if="hasFetched" class="text-gray-400 mt-6">
    No books found. Try refining your preferences.
  </p>
</template>
