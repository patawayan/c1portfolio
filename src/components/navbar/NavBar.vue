<script setup lang="ts">
import { usePageDataStore } from "@/stores/pageData";
import NavBarMenu from "./NavBarMenu.vue";
import { ref } from "vue";
const { pages } = usePageDataStore();
const minimized = ref(false);
</script>

<template>
  <div class="w-3/12 h-full flex">
    <div class="h-full w-full dark:bg-white-10 p-5 flex flex-col">
      <NavBarMenu :page-data="pages" :minimized="minimized" />
    </div>
    <div class="min-w-[5px] h-full bg-white-60 cursor-pointer"></div>
  </div>
</template>
