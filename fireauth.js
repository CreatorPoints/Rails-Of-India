/* =========================== */
/*       FIREBASE AUTH JS      */
/* =========================== */

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDydOzvB5GwvSNAEcfyAFaD167ftlwW2U8",
  authDomain: "rails-of-india-27a93.firebaseapp.com",
  projectId: "rails-of-india-27a93",
  storageBucket: "rails-of-india-27a93.firebasestorage.app",
  messagingSenderId: "678135111193",
  appId: "1:678135111193:web:4f8d3d052b1909edd25488",
  measurementId: "G-PDPPRYL5N8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM elements
const googleBtn = document.getElementById("googleSignIn");
const emailToggle = document.getElementById("emailToggle");
const emailForm = document.getElementById("emailForm");
const emailSignInBtn = document.getElementById("emailSignIn");
const emailSignUpBtn = document.getElementById("emailSignUp");
const logoutBtn = document.getElementById("logoutBtn");

// Google Sign-In
googleBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(res => {
      console.log("Google login:", res.user);
    })
    .catch(err => alert(err.message));
});

// Toggle email form
emailToggle.addEventListener("click", () => {
  emailForm.style.display =
    emailForm.style.display === "none" ? "block" : "none";
});

// Email sign-in
emailSignInBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const pass = passwordInput.value;

  auth.signInWithEmailAndPassword(email, pass)
    .then(res => console.log("Email login:", res.user))
    .catch(err => alert(err.message));
});

// Email sign-up
emailSignUpBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const pass = passwordInput.value;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(res => console.log("Account created:", res.user))
    .catch(err => alert(err.message));
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut();
});

// Auth state listener
auth.onAuthStateChanged(user => {
  if (user) {
    googleBtn.style.display = "none";
    emailToggle.style.display = "none";
    emailForm.style.display = "none";
    logoutBtn.style.display = "inline-block";
    console.log("Logged in as:", user.email || user.displayName);
  } else {
    googleBtn.style.display = "inline-block";
    emailToggle.style.display = "inline-block";
    logoutBtn.style.display = "none";
    console.log("Logged out");
  }
});
