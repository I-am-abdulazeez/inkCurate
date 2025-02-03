<script setup lang="ts">
import AnimatedText from "@/components/AnimateText.vue";
</script>

<template>
  <main class="flex justify-center items-center h-[85vh] flex-col">
    <div class="flex gap-3 flex-col">
      <h3 class="text-white text-5xl font-bold text-center">
        Type Your Thoughts,
      </h3>
      <div class="flex items-center">
        <AnimatedText
          :text="['Book.', 'Tale.', 'Read.']"
          effect="blur"
          :highlighterStyle="'wavy'"
        />
      </div>
    </div>
    <p class="text-gray-300 text-lg text-center my-10 max-w-xl">
      <span>Ink Insights</span> is your personal book recommendation assistant,
      offering tailored suggestions based on your thoughts and preferences.
    </p>

    <RouterLink
      to="/explore"
      class="bg-violet-500 rounded-2xl font-semibold text-white px-6 py-3 hover:bg-violet-700 transition-colors"
    >
      Get Started! 🚀
    </RouterLink>
  </main>
</template>
