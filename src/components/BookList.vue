<script setup lang="ts">
import type { Book } from "@/types";

defineProps<{
  books: Book[];
  loading: boolean;
  hasFetched: boolean; // Add this prop to track if fetching has been initiated
}>();
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
        class="bg-gray-900 p-4 rounded-xl flex space-x-4"
      >
        <img
          :src="book.thumbnail || '/placeholder.png'"
          :alt="book.title"
          class="w-24 h-32 object-cover rounded-lg flex-shrink-0"
        />

        <div class="flex flex-col justify-between">
          <div>
            <h3 class="text-white text-lg font-semibold">{{ book.title }}</h3>
            <p class="text-gray-400 text-sm">{{ book.authors.join(", ") }}</p>
            <p class="text-gray-300 text-xs mt-2 line-clamp-3">
              {{ book.description }}
            </p>
          </div>

          <a
            :href="book.link"
            target="_blank"
            class="text-violet-400 text-sm mt-3 hover:underline"
          >
            View Book →
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Show "No books found" only after fetching has been initiated -->
  <p v-else-if="hasFetched" class="text-gray-400 text-center mt-6">
    No books found. Try refining your preferences.
  </p>
</template>
