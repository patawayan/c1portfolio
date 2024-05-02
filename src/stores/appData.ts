import { defineStore } from "pinia";
import { computed } from "vue";
import data from "@/assets/data.json";

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

  return { appSubTitle, appTitle };
});
