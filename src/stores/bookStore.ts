import { defineStore } from "pinia";
import type { Book, Preference } from "@/types";

export const useBookStore = defineStore("bookStore", {
  state: () => ({
    userInput: "",
    preferences: null as Preference | null,
    recBooks: [] as Book[],
    selectedBook: null as Book | null,
  }),

  actions: {
    setUserInput(input: string) {
      this.userInput = input;
    },

    setRecommendedBooks(books: Book[]) {
      this.recBooks = books;
    },

    setPreferences(preferences: Preference) {
      this.preferences = preferences;
    },

    setSelectedBook(book: Book) {
      this.selectedBook = book;
    },
  },
  persist: true,
});
