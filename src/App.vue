<script setup lang="ts">
import { RouterView } from "vue-router";
import INavbar from "@/components/INavbar.vue";
import IFooter from "@/components/IFooter.vue";
</script>

<template>
  <INavbar />
  <RouterView />
  <IFooter />
</template>
