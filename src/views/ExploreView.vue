<template>
  <div class="container mx-auto max-w-3xl mt-[7rem] px-5 sm:px-0">
    <h2 class="text-lg sm:text-xl text-white font-light mb-4">
      Describe Your Reading Preferences...
    </h2>
    <textarea
      v-model="userInput"
      class="w-full p-4 mb-4 bg-gray-900 text-gray-300 rounded-xl resize-none focus:outline-none"
      rows="5"
      placeholder="Enter your thoughts (e.g., 'I want a mystery novel with strong female characters')"
    ></textarea>

    <Button
      color="violet"
      variant="solid"
      radius="2xl"
      class="cursor-pointer"
      @click="submitPreferences"
      :loading="isLoading"
    >
      What Should I Read?
    </Button>

    <BookList :loading="isLoading" :books="recBooks" :hasFetched="hasFetched" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/ui/Button.vue";
import BookList from "@/components/BookList.vue";
import { analyzePreferencesWithAI } from "@/utils/analyzePreference";
import { fetchBooks } from "@/utils/fetchBooks";
import type { Book, Preference } from "@/types";
import { toast } from "vue3-toastify";

const userInput = ref("");
const preferences = ref<Preference | null>(null);
const isLoading = ref(false);
const recBooks = ref<Book[]>([]);
const hasFetched = ref(false);

const submitPreferences = async () => {
  if (userInput.value.trim()) {
    isLoading.value = true;
    hasFetched.value = true;

    try {
      const analysis = await analyzePreferencesWithAI(userInput.value);

      if (analysis.success && analysis.data) {
        preferences.value = analysis.data;
        console.log("Extracted Preferences:", preferences.value);

        // Ensure genre exists before calling fetchBooks
        if (preferences.value?.genre) {
          const books = await fetchBooks(preferences.value);
          console.log("Recommended Books:", books);
          recBooks.value = books;
          toast.success("Here are some great reads for you! 📚");
        } else {
          toast.error(`Oops! We couldn't determine the genre. Try again.`);
        }
      } else {
        toast.error(analysis.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    toast.error("Please describe your reading preferences.");
  }
};
</script>
