import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
