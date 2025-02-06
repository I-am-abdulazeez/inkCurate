<script setup lang="ts">
import { RouterView } from "vue-router";
import { Notivue, Notification } from "notivue";

import INavbar from "@/components/INavbar.vue";
</script>

<template>
  <INavbar />
  <main class="flex flex-col">
    <RouterView class="flex-grow" />
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </main>
</template>
