<script setup lang="ts">
import { usePageDataStore } from "@/stores/pageData";
import { ref } from "vue";
const { pages } = usePageDataStore();

let active = ref(false);
</script>

<template>
  <nav class="w-3/12 h-full dark:bg-white-10 flex p-5">
    <div
      v-for="page in pages"
      :key="page.title"
      class="flex gap-5 max-w-full max-h-[70px] bg-no-repeat bg-cover bg-top cursor-pointer rounded overflow-hidden"
      :class="{
        'bg-home-image hover:bg-home-image-hover': !active,
        'bg-home-image-active': active,
      }"
      @click="
        () => {
          active = !active;
        }
      "
    >
      <div
        class="min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] overflow-hidden"
      >
        <img :src="page.thumbnail" />
      </div>
      <div
        :class="'flex-1 flex flex-col justify-center truncate cursor-pointer'"
      >
        <div class="text-xl">{{ page.title }}</div>
        <div class="text-sm dark:text-white-60 text-ellipsis">
          {{ page.subtext }}
        </div>
      </div>
    </div>
  </nav>
</template>
