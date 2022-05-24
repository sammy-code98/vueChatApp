import { createRouter, createWebHistory } from "vue-router";
import PrivateChat from "../views/PrivateChat.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/private-chat", name: "privateChat", component: PrivateChat },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
