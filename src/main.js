import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP-Qh4vje-zx4M6H2GET6Dd66P1IMJmIk",
  authDomain: "vuechat-50d8e.firebaseapp.com",
  projectId: "vuechat-50d8e",
  storageBucket: "vuechat-50d8e.appspot.com",
  messagingSenderId: "368362954978",
  appId: "1:368362954978:web:d8c38cfefd47dcc6abbebb",
};

// Initialize Firebase
  const app = initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount("#app");
