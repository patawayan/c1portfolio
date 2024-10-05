<script setup lang="ts">
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
}>();

const { cssVariables, setHover, parentRef, childRef } = useScrollAnimation({
  isDisabled: props.disabled,
});
</script>

<template>
  <div
    ref="parentRef"
    class="overflow-hidden text-ellipsis scroll"
    :class="disabled ? '' : 'hover:overflow-visible'"
    :style="cssVariables"
    @mouseenter="setHover(true)"
    @mouseleave="setHover(false)"
  >
    <span ref="childRef" class="whitespace-nowrap">
      {{ text }}
    </span>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0%,
  100% {
    transform: var(--transformStartEnd);
  }
  50% {
    transform: var(--transformMid);
  }
}

.scroll:hover {
  animation: scroll var(--translateSpeed) linear infinite;
}
</style>
