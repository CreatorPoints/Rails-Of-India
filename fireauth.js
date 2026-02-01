/* =========================== */
/*       FIREBASE AUTH JS      */
/* =========================== */

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

// ================= GOOGLE SIGN-IN =================
const googleProvider = new firebase.auth.GoogleAuthProvider();
const googleBtn = document.getElementById("googleSignIn");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    auth.signInWithPopup(googleProvider)
      .then(result => {
        console.log("Google user:", result.user);
        alert(`Welcome, ${result.user.displayName}!`);
      })
      .catch(error => {
        console.error("Google sign-in error:", error);
        alert(error.message);
      });
  });
}

// ================= EMAIL FORM TOGGLE =================
const emailToggleBtn = document.getElementById("emailSignInBtn");
const emailForm = document.getElementById("emailForm");

if (emailToggleBtn) {
  emailToggleBtn.addEventListener("click", () => {
    emailForm.style.display =
      emailForm.style.display === "none" ? "block" : "none";
  });
}

// ================= EMAIL SIGN-IN =================
const emailSignInBtn = document.getElementById("emailSignIn");

if (emailSignInBtn) {
  emailSignInBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log("Email login:", userCredential.user);
        alert(`Welcome, ${userCredential.user.email}`);
      })
      .catch(error => {
        console.error("Email sign-in error:", error);
        alert(error.message);
      });
  });
}

// ================= EMAIL SIGN-UP =================
const emailSignUpBtn = document.getElementById("emailSignUp");

if (emailSignUpBtn) {
  emailSignUpBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log("Account created:", userCredential.user);
        alert(`Account created for ${userCredential.user.email}`);
      })
      .catch(error => {
        console.error("Sign-up error:", error);
        alert(error.message);
      });
  });
}

// ================= LOGOUT =================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    auth.signOut()
      .then(() => alert("Logged out successfully"))
      .catch(error => console.error(error));
  });
}

// ================= AUTH STATE OBSERVER =================
auth.onAuthStateChanged(user => {
  if (user) {
    console.log("User signed in:", user);

    if (googleBtn) googleBtn.style.display = "none";
    if (emailToggleBtn) emailToggleBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
    if (emailForm) emailForm.style.display = "none";

  } else {
    console.log("No user signed in");

    if (googleBtn) googleBtn.style.display = "inline-block";
    if (emailToggleBtn) emailToggleBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }
});
