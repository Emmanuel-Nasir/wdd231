import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth,  sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

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
auth.languageCode = 'en';

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
      const actionCode = urlParams.get('oobCode'); // Get the oobCode from the URL
        console.log("Received oobCode:", actionCode); // Debugging line

        if (!actionCode) {
        alert("Missing oobCode in URL. Please use the link sent to your email.");
        return;
        }

        // console.log("Received oobCode:", actionCode);

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

    // handleResetPassword();
 