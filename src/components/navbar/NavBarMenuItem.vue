<script setup lang="ts">
import { PageDataInterface } from "@/stores/pageData";
import { ref, computed } from "vue";
import {
  createLinearGradent,
  darkColor,
  primaryColor,
  hexToRGB,
} from "@/utils";
import ScrollableText from "../general/ScrollableText.vue";
import NavBarMenu from "./NavBarMenu.vue";

interface MenuItemProps {
  page: PageDataInterface;
  child?: boolean;
  minimized?: boolean;
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
    hoverBorder: `5px solid ${hexToRGB(primaryColor, 0.2)}`,
    activeBorder: `5px solid ${hexToRGB(primaryColor, 0.5)}`,
  };
});

/**
 * Default and hover styles depending on whether Navbar is minimized or not
 */
const defaultStyle = computed(() => {
  if (props.minimized) {
    return hover.value ? { outline: itemStyles.value.hoverBorder } : {};
  } else {
    return {
      backgroundImage: hover.value
        ? itemStyles.value.hover
        : itemStyles.value.default,
    };
  }
});

/**
 * Active(clicked) styles depending on whether Navbar is minimized or not
 */
const activeStyle = computed(() => {
  if (props.minimized) {
    return { outline: itemStyles.value.activeBorder };
  } else {
    return {
      backgroundImage: itemStyles.value.active,
    };
  }
});

/**
 * Children NavBarMenu styles
 */
const childStyle = computed(() =>
  props.minimized ? "rounded-round" : "ml-5 rounded-child"
);
</script>

<template>
  <div class="flex flex-col max-w-full gap-3.5">
    <div
      class="flex gap-5 max-w-full max-h-[70px] bg-no-repeat bg-cover bg-top cursor-pointer overflow-hidden"
      :class="child ? childStyle : 'rounded'"
      :style="active ? activeStyle : defaultStyle"
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
        v-if="!minimized"
        class="flex-1 flex flex-col justify-center cursor-pointer overflow-hidden whitespace-nowrap pr-5"
      >
        <ScrollableText :disabled="active" class="text-xl" :text="page.title" />
        <ScrollableText
          v-if="page.subtext"
          :disabled="active"
          class="text-sm dark:text-white-60"
          :text="page.subtext"
        />
      </div>
    </div>
    <NavBarMenu
      v-if="page.children"
      :page-data="page.children"
      child
      :minimized="minimized"
    />
  </div>
</template>
