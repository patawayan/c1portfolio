<script setup lang="ts">
import { PageDataInterface } from "@/stores/pageData";
import NavBarMenuItem from "./NavBarMenuItem.vue";

defineProps<{
  pageData: PageDataInterface[];
  child?: boolean;
  minimized?: boolean;
}>();
</script>

<template>
  <nav class="flex">
    <NavBarMenuItem
      v-for="page in pageData"
      :key="page.title"
      :page="page"
      :child="child"
      :minimized="minimized"
    />
  </nav>
</template>
