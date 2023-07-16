<script setup lang="ts">
import { PageDataInterface } from "@/stores/pageData";
import { ref, computed } from "vue";
import { createLinearGradent, darkColor, primaryColor } from "@/utils";
import ScrollableText from "../general/ScrollableText.vue";

interface MenuItemProps {
  page: PageDataInterface;
}

let props = defineProps<MenuItemProps>();
let active = ref(false);
let hover = ref(false);

/** Different background styles for menu item */
let itemStyles = computed(() => {
  const { page } = props;
  const background = page.background ?? page.thumbnail;
  return {
    default: `${createLinearGradent(darkColor, 0.8)}, url('${background}')`,
    hover: `${createLinearGradent(primaryColor, 0.1)}, ${createLinearGradent(
      darkColor,
      0.8
    )}, url('${background}')`,
    active: `${createLinearGradent(primaryColor, 0.3)}, ${createLinearGradent(
      darkColor,
      0.8
    )}, url('${page.thumbnail}')`,
  };
});
let defaultStyle = computed(() => {
  return hover.value ? itemStyles.value.hover : itemStyles.value.default;
});
</script>

<template>
  <div
    class="flex gap-5 max-w-full max-h-[70px] bg-no-repeat bg-cover bg-top cursor-pointer rounded overflow-hidden pr-5"
    :style="{
      backgroundImage: active ? itemStyles.active : defaultStyle,
    }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="active = !active"
  >
    <div
      class="min-h-[70px] min-w-[70px] max-h-[70px] max-w-[70px] overflow-hidden"
    >
      <img :src="page.thumbnail" />
    </div>
    <div
      :class="'flex-1 flex flex-col justify-center cursor-pointer overflow-hidden whitespace-nowrap'"
    >
      <ScrollableText class="text-xl" :text="page.title" />
      <ScrollableText class="text-sm dark:text-white-60" :text="page.subtext" />
    </div>
  </div>
</template>
