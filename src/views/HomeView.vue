<script setup lang="ts">
import AnimatedText from "@/components/AnimateText.vue";
import Button from "@/components/ui/Button.vue";
</script>

<template>
  <main
    class="flex justify-center items-center h-screen overflow-hidden flex-col"
  >
    <div class="flex gap-3 flex-col px-3 md:px-0">
      <h3 class="text-white text-3xl md:text-5xl font-bold text-center">
        Ink Your Thought,
      </h3>
      <div class="flex items-center">
        <AnimatedText
          :text="['Book.', 'Tale.', 'Read.']"
          effect="blur"
          :highlighterStyle="'wavy'"
        />
      </div>
    </div>
    <p
      class="text-gray-300 text-[14px] font-normal sm:text-lg text-center my-10 max-w-sm sm:max-w-xl"
    >
      <span class="text-violet-300">InkCurate</span>
      is your personal book discovery companion, curating tailored
      recommendations based on your thoughts and reading preferences.
    </p>

    <Button size="lg" color="violet" radius="2xl" to="/explore" variant="solid">
      Get Started! 🚀
    </Button>
  </main>
</template>
