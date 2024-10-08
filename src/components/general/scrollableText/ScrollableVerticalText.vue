<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useScrollAnimation } from "./useScrollAnimation";

const props = defineProps<{
  /**
   * The text to scroll
   */
  text: string;
  /**
   * True if the scrollability should be disabled
   */
  disabled?: boolean;
  /**
   * number of lines to clamp
   */
  numberOfLines?: number;
}>();

const { cssVariables, setHover, hover, childRef, parentRef } =
  useScrollAnimation({
    isDisabled: props.disabled,
    isVertical: true,
  });

/**
 * The height of a single line of text
 */
const lineHeight = ref(0);

onMounted(() => {
  /**
   * Get the line height of the text once the component is mounted
   */
  lineHeight.value = Number.parseInt(
    getComputedStyle(childRef?.value as Element)
      ?.getPropertyValue("line-height")
      ?.split("px")?.[0] ?? "28"
  );
});
</script>

<template>
  <div
    ref="parentRef"
    class="overflow-hidden relative cursor-default"
    :style="{
      ...cssVariables,
      height: `${lineHeight * (numberOfLines ?? 5)}px`,
    }"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <div
      ref="childRef"
      class="scroll-child absolute"
      :style="{
        '--line-clamp-height': numberOfLines ?? 5,
      }"
      :class="hover ? '' : 'local-line-clamp'"
    >
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
@keyframes scroll-child {
  0%,
  100% {
    transform: var(--transformStartEnd);
  }
  50% {
    transform: var(--transformMid);
  }
}

.scroll-child:hover {
  animation: scroll-child var(--translateSpeed) linear infinite;
}

.local-line-clamp {
  display: -webkit-box;
  line-clamp: var(--line-clamp-height);
  -webkit-line-clamp: var(--line-clamp-height);
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
