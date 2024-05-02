<script setup lang="ts">
import { usePageDataStore, useAppDataStore } from "@/stores";
import NavBarMenu from "./NavBarMenu.vue";
import { ref } from "vue";

const { pages } = usePageDataStore();
const { appSubTitle, appTitle } = useAppDataStore();

const minimized = ref(false);
</script>

<template>
  <div class="h-full flex" :style="{ width: minimized ? 'unset' : '30%' }">
    <div class="w-11/12 h-full dark:bg-white-10 p-5 flex flex-col">
      <h1 class="text-4xl font-semibold mb-2.5">{{ appTitle }}</h1>
      <div class="mb-5">{{ appSubTitle }}</div>
      <NavBarMenu :page-data="pages" :minimized="minimized" />
    </div>
    <div
      class="p-1 h-full cursor-col-resize"
      @click="
        () => {
          minimized = !minimized;
        }
      "
    ></div>
  </div>
</template>
