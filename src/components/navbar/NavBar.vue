<script setup lang="ts">
import { usePageDataStore } from "@/stores/pageData";
import NavBarMenuItem from "./NavBarMenuItem.vue";
const { pages } = usePageDataStore();
</script>

<template>
  <nav class="w-3/12 h-full dark:bg-white-10 flex p-5">
    <NavBarMenuItem v-for="page in pages" :key="page.title" :page="page" />
  </nav>
</template>
