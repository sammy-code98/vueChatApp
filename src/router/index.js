import { createRouter, createWebHistory } from "vue-router";
import PrivateChat from "../views/PrivateChat.vue";
import Login from "../views/Login.vue";
import firebase from 'firebase/app';
import {getAuth} from  "firebase/auth";



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


router.beforeEach((to,from,next) => {
  const auth  = getAuth()

  firebase.auth().onAuthStateChanged(user => {
    if(user){
      next('/private-chat');
    }else{
      router.push('/login')
    }
  })
  
})
export default router;
