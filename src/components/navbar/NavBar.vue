<script setup lang="ts">
import { usePageDataStore, useAppDataStore } from "@/stores";
import NavBarMenu from "./NavBarMenu.vue";
import { ref } from "vue";
import ScrollableVerticalText from "../general/scrollableText/ScrollableVerticalText.vue";
import ContactTag from "../general/ContactTag.vue";
import EmailIcon from "vue-material-design-icons/Email.vue";
import PhoneIcon from "vue-material-design-icons/Cellphone.vue";
import InstagramIcon from "vue-material-design-icons/Instagram.vue";
import DeviantartIcon from "vue-material-design-icons/Deviantart.vue";
import DarkModeSwitch from "../general/DarkModeSwitch.vue";

const { pages } = usePageDataStore();
const { appSubTitle, appTitle, appTitleBackgroundImg, contact } =
  useAppDataStore();

const minimized = ref(false);
</script>

<template>
  <div class="h-full flex" :style="{ width: minimized ? 'unset' : '30%' }">
    <div
      class="w-11/12 h-full bg-gray-90 dark:bg-gray-10 flex flex-col pb-5"
      :class="minimized && 'items-center'"
    >
      <div class="overflow-clip relative h-5 w-full" v-if="minimized"></div>
      <div class="overflow-clip relative" v-else>
        <img
          class="-z-10000 absolute opacity-10"
          :src="appTitleBackgroundImg"
        />
        <div class="flex flex-col relative gap-2.5 p-5 inner-shadow">
          <h1 class="text-4xl font-semibold">
            {{ appTitle }}
          </h1>
          <ScrollableVerticalText
            class="text-xl text-gray-40 dark:text-gray-60 w-full"
            :text="appSubTitle"
          />
        </div>
      </div>
      <div class="flex flex-col flex-grow gap-5 px-5">
        <NavBarMenu
          class="flex-grow"
          :page-data="pages"
          :minimized="minimized"
        />
        <div class="flex gap-2 items-end">
          <div class="flex flex-col gap-2" v-if="!minimized">
            <ContactTag v-if="contact.email" :info="contact.email">
              <EmailIcon class="text-white dark:text-primary" />
            </ContactTag>
            <ContactTag v-if="contact.phone" :info="contact.phone">
              <PhoneIcon class="text-white dark:text-primary" />
            </ContactTag>
            <div class="flex gap-2 w-full flex-wrap">
              <ContactTag v-if="contact.instagram" :link="contact.instagram">
                <InstagramIcon class="text-white dark:text-primary" />
              </ContactTag>
              <ContactTag v-if="contact.deviantart" :link="contact.deviantart">
                <DeviantartIcon class="text-white dark:text-primary" />
              </ContactTag>
            </div>
          </div>
          <div class="flex justify-center w-full">
            <DarkModeSwitch />
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-1 h-full cursor-col-resize"
      @click="
        () => {
          minimized = !minimized;
        }
      "
    ></div>
  </div>
</template>

<style scoped>
.dark .inner-shadow {
  box-shadow: inset 0px 120px 50px -50px theme("colors.gray.10"),
    inset 0px -40px 30px -20px theme("colors.gray.10");
}

.inner-shadow {
  box-shadow: inset 0px 120px 50px -50px theme("colors.gray.90"),
    inset 0px -40px 30px -20px theme("colors.gray.90");
}

.dark .inner-shadow-min {
  box-shadow: inset 0px 20px 0px 0px theme("colors.gray.10");
}

.inner-shadow-min {
  box-shadow: inset 0px 20px 0px 0px theme("colors.gray.90");
}
</style>
