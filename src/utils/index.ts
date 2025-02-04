import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);


export const colorMap = {
  gray: {
    solid: "bg-gray-900 hover:bg-gray-800 text-white",
    faded: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    bordered: "border border-gray-400 text-gray-400",
    light: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    flat: "text-gray-900 hover:bg-gray-100",
    ghost: "text-gray-900 hover:bg-gray-100",
    shadow:
      "bg-gray-900 text-white shadow-lg hover:bg-gray-800 hover:shadow-xl",
  },
  red: {
    solid: "bg-red-500 hover:bg-red-600 text-white",
    faded: "bg-red-100 text-red-900 hover:bg-red-200",
    bordered: "border border-red-500 text-red-500 hover:bg-red-50",
    light: "bg-red-50 text-red-500 hover:bg-red-100",
    flat: "text-red-500 hover:bg-red-50",
    ghost: "text-red-500 hover:bg-red-50",
    shadow:
      "bg-red-500 text-white shadow-lg hover:bg-red-600 hover:shadow-xl",
  },
  violet: {
    solid: "bg-violet-500 hover:bg-violet-600 text-white",
    faded: "bg-violet-100 text-violet-900 hover:bg-violet-200",
    bordered: "border border-violet-500 text-violet-500 hover:bg-violet-50",
    light: "bg-violet-50 text-violet-500 hover:bg-violet-100",
    flat: "text-violet-500 hover:bg-violet-50",
    ghost: "text-violet-500 hover:bg-violet-50",
    shadow:
      "bg-violet-500 text-white shadow-lg hover:bg-violet-600 hover:shadow-xl",
  },
  // Add more colors as needed
};
