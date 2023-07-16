import { defineStore } from "pinia";
import { computed, ref } from "vue";
import settings from "@/assets/settings.json";

interface PageDataInterface {
  title: string;
  subtext?: string;
  name: string;
  type: string;
  thumbnail: string;
  background?: string;
  data: {
    type: string;
    src: string;
  }[];
}

export const usePageDataStore = defineStore("pageData", () => {
  const currentPage = ref("home");
  const pages: PageDataInterface[] = settings.routes.map((route) => ({
    ...route,
    name: route.title.toLowerCase().replaceAll(" ", ""),
  }));

  const pageMap: { [key: string]: PageDataInterface } = pages.reduce(
    (ret, page) => {
      return {
        ...ret,
        [page.name]: page,
      };
    },
    {}
  );

  const currentPageData = computed(() => {
    return pageMap[currentPage.value];
  });

  const setCurrentPage = (nextPage: string) => {
    currentPage.value = nextPage;
  };

  return { setCurrentPage, currentPageData, currentPage, pages };
});
