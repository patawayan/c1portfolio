<script setup lang="ts">
import NavBar from "@/components/navbar/NavBar.vue";
</script>

<template>
  <div class="flex h-full bg-white dark:bg-black dark:text-white">
    <NavBar />
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>
