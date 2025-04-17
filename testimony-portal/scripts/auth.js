import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  sendEmailVerification, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword, 
  sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpneZhkVYqwmHBOk1ytBLHa2Pz7P0zQDE",
  authDomain: "testimony-portal.firebaseapp.com",
  projectId: "testimony-portal",
  storageBucket: "testimony-portal.firebasestorage.app",
  messagingSenderId: "404332169039",
  appId: "1:404332169039:web:691f06fce3d5da6094673a",
  measurementId: "G-9HQ7XCDFTP"
};

// -----------------------------------------------
// ------------------------------------------------
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
auth.languageCode = 'en';

const googleProvider = new GoogleAuthProvider();
const modal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeModal = document.getElementById("closeModal");

// -----------------------------------------------
// ------------------------------------------------
// Check login Status
document.getElementById("share-testimony").addEventListener("click", (e) => {
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "add.html";
    } else {
      modal.style.display = "block";
    }
  });
});

loginBtn.onclick = () => window.location.href = "login.html";
signupBtn.onclick = () => window.location.href = "signup.html";
closeModal.onclick = () => modal.style.display = "none";

// Optional: close modal on outside click
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// -----------------------------------------------
// Reusable auth checking for any element that needs auth checking
// function handleAuthRedirect(targetElementId, redirectUrl) {
//   const el = document.getElementById(targetElementId);
//   if (!el) return;

//   el.addEventListener("click", (e) => {
//     e.preventDefault();

//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         // User is logged in
//         window.location.href = redirectUrl;
//       } else {
//         // Prompt if user is registered or not
//         const choice = confirm("Are you already registered? Click OK to login, Cancel to SignUp");
//         if (choice) {
//           window.location.href = "login.html";
//         } else {
//           window.location.href = "signup.html";
//         }
//       }
//     });
//   });
// }

// Apply to any button/link
handleAuthRedirect("add-menu", "add.html");

// -----------------------------------------------
// ------------------------------------------------
// Email signup
// document.getElementById('signup').addEventListener('click', async() => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     await sendEmailVerification(userCredential.user);
    
//     // Save user info to Firestore
//     await setDoc(doc(db, "users", userCredential.user.uid), {
//       uid: userCredential.user.uid,
//       email: userCredential.user.email,
//       createdAt: new Date().toISOString(),
//       provider: "password"
//     });

//     alert("Account created! Verification email sent.");
//     window.location.href = "login.html";
//   } catch (error) {
//     alert(error.message);
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('signup').addEventListener('click', async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      
      // Save user info to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
        provider: "password"
      });

      alert("Account created! Verification email sent.");
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
});


// Google Signup
const googleLogin = document.getElementById('googleSignUp');
googleLogin.addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      alert(`Welcome, ${user.displayName}`);
      window.location.href = "add.html";
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      alert("Sign-in failed: " + error.message);
    });
  });

// -----------------------------------------------
// -----------------------------------------------
// Email login
document.getElementById('login').addEventListener('click', async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      alert("Please verify your email before logging in.");
      return;
    }

    window.location.href = "add.html";
  } catch (error) {
    alert("Login error: " + error.message);
  }
});
// -----------------------------------------------------------

// Password reset
document.getElementById("reset-password").addEventListener("click", async () => {
  const email = prompt("Enter your email for password reset:");
  if (!email) return;
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent. Please check your inbox.");
  } catch (error) {
    alert("Reset failed: " + error.message);
  }
});

async function handleResetPassword() {
  const urlParams = new URLSearchParams(window.location.search);
  const actionCode = urlParams.get('oobCode');

  try {
    const email = await verifyPasswordResetCode(auth, actionCode);
    document.getElementById("email").textContent = email;

    document.getElementById("reset-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const newPassword = document.getElementById("new-password").value;

      try {
        await confirmPasswordReset(auth, actionCode, newPassword);
        alert("Password has been reset successfully.");
        // Optionally redirect to login
      } catch (err) {
        alert("Password reset failed: " + err.message);
      }
    });
  } catch (error) {
    alert("Invalid or expired reset link.");
  }
}

handleResetPassword();

// -----------------------------------------------------------

// Google Login
document.getElementById('googleLogin').addEventListener('click', () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome back, ${user.displayName}`);
      console.log("Goggle Login Success:", user);
      window.location.href = "add.html"; // redirect on success
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      alert("Log-in failed: " + error.message);
    });
});

// Generic OAuth handler
const handleOAuth = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: provider.providerId,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    });

    alert(`Signed in as ${user.displayName}`);
    window.location.href = "add.html";
  } catch (err) {
    alert("OAuth error: " + err.message);
  }
};

document.getElementById('googleSignUp').addEventListener('click', () => handleOAuth(googleProvider));
document.getElementById('googleLogin').addEventListener('click', () => handleOAuth(googleProvider));
