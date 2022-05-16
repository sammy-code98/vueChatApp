<template>
  <div>
    <h3>Please Log In with your Google account to continue</h3>
    <button @click="login">Login with Google</button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
  setup() {
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

          this.$router.push("/");
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
