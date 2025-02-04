import axios from "axios";
import type { Book, GoogleBooksAPIResponse, Preference } from "@/types";
import { toast } from "vue3-toastify";

const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes";

let lastSearchQuery = "";
let startIndex = 0;

/**
 * Fetches books from Google Books API based on extracted preferences.
 */
export const fetchBooks = async (preferences: Preference): Promise<Book[]> => {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API;
    if (!apiKey) {
      throw new Error("Google Books API key is missing. Check your .env file.");
    }

    if (!preferences || Object.keys(preferences).length === 0) {
      toast.error("Enter your preferences..", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return [];
    }

    // Construct search query
    const searchTerms = [
      preferences.genre || "",
      ...(Array.isArray(preferences.themes) ? preferences.themes : []),
      ...(Array.isArray(preferences.character_traits) ? preferences.character_traits : []),
      preferences.time_period || "",
    ]
      .map(term => String(term))
      .filter(term => term.trim().length > 0)
      .join(" ");


    if (!searchTerms.trim()) {
      throw new Error("No valid search terms provided.");
    }

    // Check if user enters the same input again
    if (searchTerms === lastSearchQuery) {
      startIndex += 10; // Move to the next page of results
    } else {
      lastSearchQuery = searchTerms;
      startIndex = 0; // Reset, if the query is different
    }

    const url = `${GOOGLE_BOOKS_URL}?q=${encodeURIComponent(searchTerms)}&key=${apiKey}&maxResults=10&startIndex=${startIndex}`;

    const response = await axios.get<GoogleBooksAPIResponse>(url);

    if (!response.data.items || response.data.items.length === 0) {
      console.warn("No books found for:", searchTerms);
      return [];
    }

    return response.data.items.map((item) => ({
      title: item.volumeInfo.title || "Untitled",
      authors: item.volumeInfo.authors || ["Unknown Author"],
      description: item.volumeInfo.description || "No description available.",
      thumbnail: item.volumeInfo.imageLinks?.thumbnail || null,
      link: item.volumeInfo.infoLink || "#",
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
