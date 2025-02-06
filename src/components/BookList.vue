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
  <div v-if="loading" class="text-gray-400 mt-6">
    Fetching recommendations....
  </div>

  <div v-else-if="books.length" class="mt-12 mb-20">
    <!-- Section Title -->
    <h2 class="text-xl sm:text-2xl text-white font-semibold">
      Recommended Reads
    </h2>

    <!-- Divider -->
    <div class="w-16 h-1 bg-violet-300 mt-2 mb-6 rounded-full"></div>

    <!-- Book Grid -->
    <div class="grid sm:grid-cols-2 gap-6">
      <div
        v-for="book in books"
        :key="book.link"
        class="bg-gray-900 p-4 rounded-xl flex space-x-4 cursor-pointer"
        @click="goToBookDetails(book)"
      >
        <img
          :src="book.thumbnail || bookPlaceholder"
          :alt="book.title"
          class="w-24 h-32 object-cover rounded-lg flex-shrink-0"
        />

        <div class="flex flex-col justify-between">
          <div>
            <h3 class="text-white text-lg font-semibold line-clamp-1">
              {{ book.title }}
            </h3>
            <p class="text-gray-400 text-sm line-clamp-1">
              {{ book.authors.join(", ") }}
            </p>
            <p class="text-gray-300 text-xs mt-2 line-clamp-3">
              {{ book.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Show "No books found" only after fetching has been initiated -->
  <p v-else-if="hasFetched" class="text-gray-400 text-center mt-6">
    No books found. Try refining your preferences.
  </p>
</template>
