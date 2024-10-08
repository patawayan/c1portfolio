<script setup lang="ts">
defineProps<{
  /**
   * Contact Info to display
   */
  info?: string;
  /**
   * Link of handle
   */
  link?: string;
}>();
</script>

<template>
  <a
    :href="link ? link : '#'"
    :target="link ? '_blank' : undefined"
    class="bg-primary dark:bg-gray-20 rounded-m rounded p-2.5 flex gap-2.5"
  >
    <slot></slot>
    <span v-if="info" class="whitespace-nowrap text-white dark:text-primary">
      {{ info }}
    </span>
  </a>
</template>
