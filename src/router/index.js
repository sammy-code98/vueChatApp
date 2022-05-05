import { createRouter, createWebHistory } from "vue-router";
import PrivateChat from "../views/PrivateChat.vue";

const routes = [{ path: "/", name: "privateChat", component: PrivateChat }];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
