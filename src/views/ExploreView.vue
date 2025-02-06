<script setup lang="ts">
import { onMounted, ref } from "vue";

import { push } from "notivue";

import Button from "@/components/ui/Button.vue";
import BookList from "@/components/BookList.vue";

import { useBookStore } from "@/stores/bookStore";

import { analyzePreferences } from "@/utils/analyzePreference";
import { fetchBooks } from "@/utils/fetchBooks";

const isLoading = ref(false);
const hasFetched = ref(false);

const bookStore = useBookStore();

onMounted(() => {
  hasFetched.value = bookStore.recBooks.length > 0;
});

const submitPreferences = async () => {
  if (bookStore.userInput.trim()) {
    isLoading.value = true;
    hasFetched.value = true;

    try {
      const analysis = await analyzePreferences(bookStore.userInput);

      if (analysis.success && analysis.data) {
        bookStore.preferences = analysis.data;
        console.log("Extracted Preferences:", bookStore.preferences);

        // Ensure genre exists before calling fetchBooks
        if (bookStore.preferences?.genre) {
          const books = await fetchBooks(bookStore.preferences);
          console.log("Recommended Books:", books);
          bookStore.recBooks = books;
          localStorage.setItem("recommendedBooks", JSON.stringify(books));
          push.success("Here are some great reads for you! 📚");
        } else {
          push.error(`Oops! We couldn't determine the genre. Try again.`);
        }
      } else {
        push.error({ message: analysis.message });
      }
    } catch (error) {
      push.error(`Error: ${error}`);
      console.log("Error:", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    push.error("Please describe your reading preferences.");
    console.log("Error: something went wrong");
  }
};
</script>

<template>
  <div class="container mx-auto max-w-3xl mt-[7rem] px-5 sm:px-0">
    <h2 class="text-lg sm:text-xl text-white font-light mb-4">
      Describe Your Reading Preferences...
    </h2>
    <div class="mb-4">
      <textarea
        v-model="bookStore.userInput"
        class="w-full p-4 bg-gray-900 text-gray-300 rounded-xl resize-none focus:outline-none"
        rows="5"
        placeholder="Enter your thoughts (e.g., 'I want a mystery novel with strong female characters')"
      ></textarea>

      <p class="text-gray-400 text-sm">
        Hint: Click on the button again to fetch more books
      </p>
    </div>

    <Button
      color="violet"
      variant="solid"
      radius="2xl"
      class="cursor-pointer"
      @click="submitPreferences"
      :loading="isLoading"
    >
      {{ isLoading ? "Loading" : "What Should I Read?" }}
    </Button>

    <BookList
      :loading="isLoading"
      :books="bookStore.recBooks"
      :hasFetched="hasFetched"
    />
  </div>
</template>
