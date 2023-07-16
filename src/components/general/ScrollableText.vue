<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

defineProps<{ text: string }>();

const parent = ref(null);
const child = ref(null);
let translateWidth = ref(0);
let translateSpeed = ref(0);
let hover = ref(false);

onMounted(() => {
  // Set scroll animation speed based on if text overflows and on length of text
  const childWidth = child?.value?.offsetWidth ?? 0;
  const parentWidth = parent?.value?.offsetWidth ?? 0;

  if (parentWidth < childWidth) {
    translateWidth.value = childWidth - parentWidth + 1;
    translateSpeed.value = Math.ceil(childWidth / parentWidth) * 3;
  } else {
    translateWidth.value = 0;
    translateSpeed.value = 0;
  }
});

const cssVariables = computed(() =>
  hover.value
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
    class="overflow-hidden hover:overflow-visible text-ellipsis scroll"
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
  animation: scroll var(--translateSpeed) ease-in-out infinite;
}
</style>
