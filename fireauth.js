/* =========================== */
/*   RAILS OF INDIA AUTH JS    */
/* =========================== */

// Firebase SDK imports (MODULAR)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ROI Backend Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDydOzvB5GwvSNAEcfyAFaD167ftlwW2U8",
  authDomain: "rails-of-india-27a93.firebaseapp.com",
  projectId: "rails-of-india-27a93",
  storageBucket: "rails-of-india-27a93.firebasestorage.app",
  messagingSenderId: "678135111193",
  appId: "1:678135111193:web:4f8d3d052b1909edd25488",
  measurementId: "G-PDPPRYL5N8"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
const loginBtn = document.getElementById("login-btn");

// Auth state listener
onAuthStateChanged(auth, (user) => {
  currentUser = user;

  if (user) {
    console.log("Logged in:", user.uid);
    loginBtn.textContent = user.displayName || user.email || "Logged In";
  } else {
    console.log("Logged out");
    loginBtn.textContent = "Login";
  }
});

// Login / Logout handler
loginBtn.addEventListener("click", () => {
  if (currentUser) {
    // Logout
    signOut(auth)
      .then(() => console.log("Signed out"))
      .catch(err => alert(err.message));
  } else {
    // Login
    signInWithPopup(auth, provider)
      .then(result => {
        currentUser = result.user;
        console.log("Signed in:", currentUser.uid);
      })
      .catch(err => {
        console.error(err);
        if (err.code === "auth/popup-blocked") {
          alert("Popup blocked. Allow popups for this site.");
        } else {
          alert(err.message);
        }
      });
  }
});
