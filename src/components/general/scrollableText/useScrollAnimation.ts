import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface ScrollAnimationProps {
  /**
   * True if the animation is disabled
   */
  isDisabled?: boolean;
  /**
   * True if the animation is vertical
   */
  isVertical?: boolean;
}

export const useScrollAnimation = (props: ScrollAnimationProps) => {
  /**
   * Distance the scrollable text has to scroll for
   */
  const translateDistance = ref(0);

  /**
   * The speed at which the scrollable text has to scroll for
   */
  const translateSpeed = ref(0);

  /**
   * True if the parent component is being hovered over
   */
  const hover = ref(false);

  /**
   * Reference to the parent container where the child text will scroll in.
   */
  const parentRef = ref<HTMLElement | null>(null);

  /**
   * The container of text to scroll.
   */
  const childRef = ref<HTMLElement | null>(null);

  /**
   * Set if the text being hovered over
   */
  const setHover = (isHovering = true) => {
    hover.value = isHovering;
  };

  /**
   * Set scroll animation speed and distance based on if text overflows and on length of text
   */
  const setAnimSpeedAndDistance = () => {
    const childDistance = props.isVertical
      ? childRef?.value?.scrollHeight ?? 0
      : childRef?.value?.offsetWidth ?? 0;

    const parentDistance = props.isVertical
      ? parentRef?.value?.scrollHeight ?? 0
      : parentRef?.value?.offsetWidth ?? 0;

    const fontSize =
      getComputedStyle(childRef?.value as Element)
        ?.getPropertyValue("font-size")
        ?.split("px")?.[0] ?? "10";

    const paddingAmount = props.isVertical ? Number.parseInt(fontSize) + 5 : 1;

    if (parentDistance + paddingAmount <= childDistance) {
      translateDistance.value = childDistance - parentDistance + paddingAmount;
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
    return !props.isDisabled && hover.value
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

  return {
    cssVariables,
    hover,
    setHover,
    parentRef,
    childRef,
  };
};
