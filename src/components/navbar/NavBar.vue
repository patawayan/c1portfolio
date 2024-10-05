<script setup lang="ts">
import { usePageDataStore, useAppDataStore } from "@/stores";
import NavBarMenu from "./NavBarMenu.vue";
import { ref } from "vue";
import ScrollableVerticalText from "../general/scrollableText/ScrollableVerticalText.vue";

const { pages } = usePageDataStore();
const { appSubTitle, appTitle } = useAppDataStore();

const minimized = ref(false);
</script>

<template>
  <div class="h-full flex" :style="{ width: minimized ? 'unset' : '30%' }">
    <div
      class="w-11/12 h-full dark:bg-white-10 p-5 flex flex-col"
      :class="minimized && 'items-center'"
    >
      <h1 class="text-4xl font-semibold mb-2.5" v-if="!minimized">
        {{ appTitle }}
      </h1>
      <ScrollableVerticalText
        v-if="!minimized"
        class="text-xl mb-5 w-full"
        :text="appSubTitle"
      />
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
