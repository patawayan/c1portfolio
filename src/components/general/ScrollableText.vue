<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

const props = defineProps<{ text: string; disabled?: boolean }>();

const parent = ref(null);
const child = ref(null);
let translateWidth = ref(0);
let translateSpeed = ref(0);
let hover = ref(false);

/**
 * Set scroll animation speed and width based on if text overflows and on length of text
 */
const setAnimSpeedAndWidth = () => {
  const childWidth = child?.value?.offsetWidth ?? 0;
  const parentWidth = parent?.value?.offsetWidth ?? 0;

  if (parentWidth + 10 <= childWidth) {
    translateWidth.value = childWidth - parentWidth + 1;
    // Speed is 5 seconds per entire roundtrip of parentWidth
    translateSpeed.value = ((childWidth - parentWidth) / parentWidth) * 5;
  } else {
    translateWidth.value = 0;
    translateSpeed.value = 0;
  }
};

onMounted(() => {
  window.addEventListener("resize", setAnimSpeedAndWidth);
  setAnimSpeedAndWidth();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setAnimSpeedAndWidth);
});

const cssVariables = computed(() =>
  !props.disabled && hover.value
    ? {
        "--translateWidth": `-${translateWidth.value}px`,
        "--translateSpeed": `${translateSpeed.value}s`,
      }
    : {}
);
</script>

<template>
  <div
    ref="parent"
    class="overflow-hidden text-ellipsis scroll"
    :class="disabled ? '' : 'hover:overflow-visible'"
    :style="cssVariables"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <span ref="child" class="whitespace-nowrap">
      {{ text }}
    </span>
  </div>
</template>

<style scoped>
@keyframes scroll {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(var(--translateWidth));
  }
}

.scroll:hover {
  animation: scroll var(--translateSpeed) linear infinite;
}
</style>
