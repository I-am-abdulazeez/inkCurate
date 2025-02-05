<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const navigationLinks = [
  { name: "About", path: "/about" },
  { name: "Explore", path: "/explore" },
];

const route = useRoute();

const isActiveRoute = computed(() => (path: string) => {
  return route.path === path;
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-gray-950 backdrop-blur-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <RouterLink
          to="/"
          class="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src="../assets/logo-ink.svg"
            alt="InkCurate Logo"
            class="w-7 h-7 sm:w-8 sm:h-8"
          />
          <span class="text-white sm:text-lg font-semibold mt-2">
            InkCurate.
          </span>
        </RouterLink>

        <!-- Navigation Links -->
        <div class="flex items-center gap-8">
          <RouterLink
            v-for="link in navigationLinks"
            :key="link.path"
            :to="link.path"
            class="text-gray-200 mt-2 transition-colors text-sm font-medium px-1 py-2"
            :class="{
              'text-violet-300  font-semibold': isActiveRoute(link.path),
            }"
          >
            {{ link.name }}
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>
