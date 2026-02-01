/* =========================== */
/*   RAILS OF INDIA AUTH JS    */
/* =========================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDydOzvB5GwvSNAEcfyAFaD167ftlwW2U8",
  authDomain: "rails-of-india-27a93.firebaseapp.com",
  projectId: "rails-of-india-27a93",
  storageBucket: "rails-of-india-27a93.firebasestorage.app",
  messagingSenderId: "678135111193",
  appId: "1:678135111193:web:4f8d3d052b1909edd25488",
  measurementId: "G-PDPPRYL5N8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");

  if (!loginBtn) {
    console.error("Login button not found");
    return;
  }

  onAuthStateChanged(auth, (user) => {
    currentUser = user;

    if (user) {
      loginBtn.textContent = user.displayName || "Account";
      loginBtn.classList.add("auth-btn-logout");
    } else {
      loginBtn.textContent = "Login";
      loginBtn.classList.remove("auth-btn-logout");
    }
  });

  loginBtn.addEventListener("click", async () => {
    try {
      if (currentUser) {
        await signOut(auth);
      } else {
        try {
          await signInWithPopup(auth, provider);
        } catch (popupError) {
          // GitHub Pages / popup blocked fallback
          await signInWithRedirect(auth, provider);
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  });
});
