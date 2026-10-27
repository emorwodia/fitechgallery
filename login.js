import {
  auth
} from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ================= LOGIN =================
const loginForm =
  document.getElementById("login-form");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
      document.getElementById("login-email").value;

    const password =
      document.getElementById("login-password").value;

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful");

      window.location.href = "admin.html";

    } catch (error) {

      alert(error.message);
    }
  });
}