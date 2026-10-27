import {
  auth
} from "./firebase.js";

import {
  createUserWithEmailAndPassword
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ================= SIGNUP =================
const signupForm =
  document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  const email =
    document.getElementById("signup-email").value;

  const password =
    document.getElementById("signup-password").value;

  try {

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Signup Successful");

    window.location.href = "login.html";

  } catch (error) {

    alert(error.message);
  }
});