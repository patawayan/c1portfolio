<script setup lang="ts">
import { PageDataInterface } from "@/stores/pageData";
import { ref } from "vue";

interface MenuItemProps {
  page: PageDataInterface;
}

const props = defineProps<MenuItemProps>();
let active = ref(false);
</script>

<template>
  <div
    class="flex gap-5 max-w-full max-h-[70px] bg-no-repeat bg-cover bg-top cursor-pointer rounded overflow-hidden"
    :class="{
      [`bg-${props.page.name}-image hover:bg-${props.page.name}-image-hover`]:
        !active,
      [`bg-${props.page.name}-image-active`]: active,
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
      <img :src="props.page.thumbnail" />
    </div>
    <div
      :class="'flex-1 flex flex-col justify-center cursor-pointer pr-5 overflow-hidden whitespace-nowrap'"
    >
      <div class="text-xl">{{ props.page.title }}</div>
      <div class="text-sm dark:text-white-60 overflow-hidden text-ellipsis">
        {{ props.page.subtext }}
      </div>
    </div>
  </div>
</template>
