<script setup lang="ts">
import { usePageDataStore } from "@/stores/pageData";
import NavBarMenu from "./NavBarMenu.vue";
import { ref } from "vue";
const { pages } = usePageDataStore();
const minimized = ref(false);
</script>

<template>
  <div class="w-3/12 h-full dark:bg-white-10 p-5 flex-col">
    <NavBarMenu :page-data="pages" :minimized="minimized" />
  </div>
</template>
