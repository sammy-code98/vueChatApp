import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Required for side-effects
require("firebase/firestore");
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

  // Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// make db globally accessible
window.db=db

createApp(App).use(store).use(router).mount("#app");
