import { createApp } from "vue";
import "./styles.css";
import AppMain from "./components/AppMain.vue";
import AppDict from "./components/AppDict.vue";
import { createRouter, createWebHistory } from "vue-router";
import AppNotFound from "./components/AppNotFound.vue";

const router = createRouter({
  routes: [
    { path: "/", component: AppDict },
    { path: "/langs/:lang", component: AppDict },
    { path: "/edit/:lang", component: AppDict },
    { path: "/404", component: AppNotFound },
    { path: "/:pathMatch(.*)*", redirect: "/404" },
  ],
  history: createWebHistory(),
});
router.afterEach((url) => {
  switch (url.params.lang) {
    case "trung":
      document.title = "Học tiếng Trung Quốc";
      break;
    case "han":
      document.title = "Học tiếng Hàn Quốc";
      break;
    case "nhat":
      document.title = "Học tiếng Nhật Bản";
      break;
    default:
      document.title = "Học tiếng";
      break;
  }
});

createApp(AppMain).use(router).mount("#app");
