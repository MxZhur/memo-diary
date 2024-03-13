import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import LatestMemoriesPage from "../pages/LatestMemoriesPage.vue";
import NewMemoryPage from "../pages/NewMemoryPage.vue";
import SearchMemoriesPage from "../pages/SearchMemoriesPage.vue";
import SettingsPage from "../pages/SettingsPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import SplashScreen from "../pages/SplashScreen.vue";
import AboutPage from "../pages/AboutPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "SplashScreen",
    component: SplashScreen,
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignInPage,
  },
  {
    path: "/latest-memories",
    name: "LatestMemories",
    component: LatestMemoriesPage,
  },
  {
    path: "/new-memory",
    name: "NewMemory",
    component: NewMemoryPage,
  },
  {
    path: "/search-memories",
    name: "SearchMemories",
    component: SearchMemoriesPage,
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsPage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
