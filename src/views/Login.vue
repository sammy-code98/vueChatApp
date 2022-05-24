<template>
  <div class="container">
    <h3>Please Log In with your Google account to continue</h3>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    //   intitailzie router
    const router = useRouter();

    function login() {
      //    initialze provider
      const provider = new GoogleAuthProvider();
      //   this line is optional
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ... if success redirect user to main component

          router.push("/private-chat");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
    return { login };
  },
};
</script>

<style scoped>
.container {
  margin: auto;
  padding-top: 100px;
}
h3 {
  color: #151339;
  font-size: 21px;
  margin: auto;
  font-weight: bold;
}
button {
  margin-top: 50px;
  border-radius: 8px;
  padding: 15px;
  font-weight: bold;
  border: 1px solid #e5e8e8;
  cursor: pointer;
}
button:hover {
  background: #151339;
  color: #e5e8e8;
}
</style>
