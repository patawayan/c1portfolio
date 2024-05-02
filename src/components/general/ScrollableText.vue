<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";

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
   * True if the text should scroll vertically
   */
  isVertical?: boolean;
}>();

/**
 * Reference to the parent container where the child text will scroll in.
 */
const parent = ref(null);

/**
 * The container of text to scroll.
 */
const child = ref(null);

/**
 * Distance the scrollable text has to scroll for
 */
let translateDistance = ref(0);

/**
 * The speed at which the scrollable text has to scroll for
 */
let translateSpeed = ref(0);

/**
 * True if the parent component is being hovered over
 */
let hover = ref(false);

/**
 * Set scroll animation speed and distance based on if text overflows and on length of text
 */
const setAnimSpeedAndDistance = () => {
  const childDistance = props.isVertical
    ? child?.value?.offsetHeight ?? 0
    : child?.value?.offsetWidth ?? 0;

  const parentDistance = props.isVertical
    ? parent?.value?.offsetHeight ?? 0
    : parent?.value?.offsetWidth ?? 0;

  if (parentDistance + 10 <= childDistance) {
    translateDistance.value = childDistance - parentDistance + 1;
    // Speed is 5 seconds per entire roundtrip of parentWidth
    translateSpeed.value =
      ((childDistance - parentDistance) / parentDistance) * 5;
  } else {
    translateDistance.value = 0;
    translateSpeed.value = 0;
  }
};

onMounted(() => {
  // Set to rerender animation speed and distance on window resize
  window.addEventListener("resize", setAnimSpeedAndDistance);
  // Set initial animation speed and distance
  setAnimSpeedAndDistance();
});

onBeforeUnmount(() => {
  // Remove resize listener
  window.removeEventListener("resize", setAnimSpeedAndDistance);
});

const cssVariables = computed(() => {
  const translateDistanceString = `-${translateDistance.value}px`;
  return !props.disabled && hover.value
    ? {
        "--translateSpeed": `${translateSpeed.value}s`,
        /**
         * The start and end point of the animation
         * Creates either a "translateX" or "translateY" keyframe
         */
        "--transformStartEnd": `translate${props.isVertical ? "Y" : "X"}(0)`,
        /**
         * The mid point of the animation
         * Creates either a "translateX" or "translateY" keyframe
         */
        "--transformMid": `translate${
          props.isVertical ? "Y" : "X"
        }(${translateDistanceString})`,
      }
    : {};
});
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
