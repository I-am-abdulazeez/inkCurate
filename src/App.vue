<script setup lang="ts">
import { computed } from "vue";

import { RouterView, useRoute } from "vue-router";
import INavbar from "@/components/INavbar.vue";
// import IFooter from "@/components/IFooter.vue";

const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<template>
  <INavbar />
  <main
    :class="{ 'overflow-hidden': isHome, 'min-h-screen': !isHome }"
    class="flex flex-col"
  >
    <RouterView class="flex-grow" />
  </main>
  <!-- <IFooter /> -->
</template>
