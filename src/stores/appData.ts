import { defineStore } from "pinia";
import { computed, ref } from "vue";
import data from "@/assets/data.json";

/**
 * App Contact Interface
 */
export interface AppContactInterface {
  /**
   * Portfolio owner's email address
   */
  email: string;
  /**
   * Portfolio owner's phone number
   */
  phone: string;
  /**
   * Portfolio owner's instagram handle
   */
  instagram?: string;
  /**
   * Portfolio owner's deviantart handle
   */
  deviantart?: string;
}

/**
 * App Meta Interface
 */
export interface AppMetaInterface {
  /**
   * Title from data.json
   */
  title: string;
  /**
   * Subtitle from data.json
   */
  subtitle: string;
  /**
   * Background Image for title
   */
  background: string;
  /**
   * Colors from data.json
   */
  colors: {
    /** Primary Color */
    primary: string;
    /** Dark Color */
    dark: string;
    /** Light Color */
    light: string;
  };
}

/**
 * App Data Store
 */
export const useAppDataStore = defineStore("appData", () => {
  const meta: AppMetaInterface = data.meta;

  /**
   * App title from data.json file
   */
  const appTitle = computed(() => {
    return meta.title;
  });

  /**
   * App subtitle from data.json file
   */
  const appSubTitle = computed(() => {
    return meta.subtitle;
  });

  const appTitleBackgroundImg = computed(() => {
    return meta.background;
  });

  const contact: AppContactInterface = data.contact;

  const isDarkMode = ref(localStorage.theme === "dark");

  const toggleDarkMode = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
    isDarkMode.value = !isDarkMode.value;
  };

  /**
   * App title from data.json file
   */
  const email = computed(() => {
    return contact.email;
  });

  return {
    appSubTitle,
    appTitle,
    appTitleBackgroundImg,
    contact,
    email,
    isDarkMode,
    toggleDarkMode,
  };
});
