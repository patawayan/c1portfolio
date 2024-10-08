<script setup lang="ts">
import { useAppDataStore } from "@/stores";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const appDataStore = useAppDataStore();

const isDarkMode = storeToRefs(appDataStore).isDarkMode;

const setLocalStorageTheme = () => {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(setLocalStorageTheme);
</script>

<template>
  <div
    class="parent-container rounded-round w-10 h-10 relative overflow-hidden hover:cursor-pointer"
    :class="isDarkMode ? 'dark-mode' : 'light-mode'"
    @click="appDataStore.toggleDarkMode"
  >
    <div
      class="child-container rounded-round w-9 h-9"
      :class="isDarkMode ? 'dark-mode-child' : 'light-mode-child'"
    ></div>
  </div>
</template>

<style scoped>
.parent-container.light-mode {
  background: theme("colors.blue.light");
}
.parent-container.dark-mode {
  background: theme("colors.blue.dark");
}

.child-container.light-mode-child {
  background: theme("colors.yellow.DEFAULT");
  transform: translate(-25%, 25%);
}

.child-container.dark-mode-child {
  background: theme("colors.white.DEFAULT");
  transform: translate(25%, -25%);
}
</style>
