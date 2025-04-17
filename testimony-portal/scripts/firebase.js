import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  sendEmailVerification, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
auth.languageCode = 'en';
// -----------------------------------------------

// Instantiate the Google provider correctly
const provider = new GoogleAuthProvider();
// -----------------------------------------------

// Signup with email and password
document.getElementById('signup').addEventListener('click', () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert("Signup successful!");
        console.log(userCredential.user);
        alert(`Welcome, ${user.displayName}`);
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("Signup failed: " + error.message);
      });
  });



// Common function to save or update user in Firestore
// const syncUserToFirestore = async (user, providerId) => {
//   const userRef = doc(db, "users", user.uid);
//   const docSnap = await getDoc(userRef);

//   await setDoc(userRef, {
//     uid: user.uid,
//     email: user.email,
//     name: user.displayName || "New User",
//     provider: providerId,
//     createdAt: docSnap.exists() ? docSnap.data().createdAt : new Date().toISOString(),
//     lastLogin: new Date().toISOString()
//   }, { merge: true });
// };

// // Unified success handler
// const handleAuthSuccess = async (user, providerId) => {
//   await syncUserToFirestore(user, providerId);
//   alert(`Welcome, ${user.displayName || "New User"}`);
//   window.location.href = "add.html";
// };

// // --- OAuth Handler ---
// const handleOAuth = async (provider) => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     await handleAuthSuccess(result.user, provider.providerId);
//   } catch (err) {
//     alert("OAuth error: " + err.message);
//   }
// };

// // --- Email/Password Signup Handler ---
// document.getElementById('signup').addEventListener('click', async () => {
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const name = document.getElementById("name")?.value?.trim() || "New User";

//   // Basic validation
//   if (!email || !password) {
//     alert("Please fill in all fields.");
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     alert("Invalid email format.");
//     return;
//   }

//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Set display name
//     await updateProfile(user, { displayName: name });

//     await handleAuthSuccess(user, "password");
//   } catch (error) {
//     console.error("Signup error:", error);
//     alert("Signup failed: " + error.message);
//   }
// });

// ------------------------------------------------------

 
// ------------------------------------------------------

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

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

// Login with username and password
document.getElementById('login').addEventListener('click', () => {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert(`Welcome back, ${user.displayName}`);
      console.log(userCredential.user);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      alert("Login failed: " + error.message);
    });
});

// document.getElementById('login').addEventListener('click', async () => {
//   const email = document.getElementById("email").value.trim();
//   const password = document.getElementById("password").value.trim();

//   if (!email || !password) {
//     alert("Please enter both email and password.");
//     return;
//   }

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     const user = userCredential.user;

//     // Call the same handler to sync to Firestore & redirect
//     await handleAuthSuccess(user, "password");
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("Login failed: " + error.message);
//   }
// });

// ------------------------------------------------------------

// Google Login
document.getElementById('googleLogin').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Welcome back, ${user.displayName}`);
    })
    .catch((error) => {
      console.error("Error logging in:", error);
      alert("Log-in failed: " + error.message);
    });
});
// ------------------------------------------------------------
// -------------------------------------------------------------

// Check login/Registered User Status
const modal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeModal = document.getElementById("closeModal");
// -----------------------------------------------

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
function handleAuthRedirect(targetElementId, redirectUrl) {
  const el = document.getElementById(targetElementId);
  if (!el) return;

  el.addEventListener("click", (e) => {
    e.preventDefault();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        window.location.href = redirectUrl;
      } else {
        // Prompt if user is registered or not
        const choice = confirm("It seems you are not logged in. Do you want to login or sign up? \n\nClick OK to login, Cancel to SignUp");
        if (choice) {
          window.location.href = "login.html";
        } else {
          window.location.href = "signup.html";
        }
      }
    });
  });
}

// Apply to any button/link
handleAuthRedirect("add-menu", "add.html");
// -----------------------------------------------
// -----------------------------------------------



