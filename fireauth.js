/* =========================== */
/*       FIREBASE AUTH JS      */
/* =========================== */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Google Sign-in
const googleProvider = new firebase.auth.GoogleAuthProvider();
const googleBtn = document.getElementById("googleSignIn");

if(googleBtn){
  googleBtn.addEventListener("click", () => {
    auth.signInWithPopup(googleProvider)
      .then(result => {
        const user = result.user;
        alert(`Welcome, ${user.displayName}!`);
        console.log(user);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  });
}

// Email/Password Sign-in
const emailSignInBtn = document.getElementById("emailSignIn");
if(emailSignInBtn){
  emailSignInBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        alert(`Welcome, ${user.email}!`);
        console.log(user);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  });
}

// Email/Password Sign-up
const emailSignUpBtn = document.getElementById("emailSignUp");
if(emailSignUpBtn){
  emailSignUpBtn.addEventListener("click", () => {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;

    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        alert(`Account created: ${user.email}`);
        console.log(user);
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  });
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn){
  logoutBtn.addEventListener("click", () => {
    auth.signOut()
      .then(() => alert("Logged out!"))
      .catch(error => console.error(error));
  });
}

// Monitor Auth State & Update UI
auth.onAuthStateChanged(user => {
  const googleBtn = document.getElementById("googleSignIn");
  const emailSignInBtn = document.getElementById("emailSignInBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  if(user){
    // User is signed in
    console.log("User signed in:", user);

    if(googleBtn) googleBtn.style.display = "none";
    if(emailSignInBtn) emailSignInBtn.style.display = "none";
    if(logoutBtn) logoutBtn.style.display = "inline-block";

    // Optional: show user name/avatar somewhere
    // document.getElementById("navbarUser").innerText = user.displayName || user.email;

  } else {
    // No user signed in
    console.log("No user signed in");

    if(googleBtn) googleBtn.style.display = "inline-block";
    if(emailSignInBtn) emailSignInBtn.style.display = "inline-block";
    if(logoutBtn) logoutBtn.style.display = "none";

    // Optional: hide user info
    // document.getElementById("navbarUser").innerText = "";
  }
});
