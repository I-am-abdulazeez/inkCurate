<script setup lang="ts">
import { RouterView } from "vue-router";
import INavbar from "@/components/INavbar.vue";
</script>

<template>
  <INavbar />
  <main class="flex flex-col">
    <RouterView class="flex-grow" />
  </main>
  <!-- <IFooter /> -->
</template>
