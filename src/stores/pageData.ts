import { defineStore } from "pinia";
import { computed, ref } from "vue";
import data from "@/assets/data.json";

export interface PageDataInterface {
  title: string;
  subtext?: string;
  name?: string;
  id?: string;
  type: string;
  thumbnail: string;
  background?: string;
  data?: {
    type: string;
    src: string;
  }[];
  children?: PageDataInterface[];
}

function setRouteNames(routes: PageDataInterface[]): PageDataInterface[] {
  return routes.map((route) => ({
    ...route,
    name: route.title.toLowerCase().replaceAll(" ", ""),
    ...(route.children ? { children: setRouteNames(route.children) } : {}),
  }));
}

export const usePageDataStore = defineStore("pageData", () => {
  const currentPage = ref("home");
  const pages: PageDataInterface[] = setRouteNames(data.routes);

  const pageMap: { [key: string]: PageDataInterface } = pages.reduce(
    (ret, page) => {
      return {
        ...ret,
        ...(page.name ? { [page.name]: page } : {}),
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
