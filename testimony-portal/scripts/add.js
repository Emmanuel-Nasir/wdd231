import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, onSnapshot };


// ------------------------------------------------------------------
// ------------------------------------------------------------------
document.getElementById("testimonyForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) {
    alert("Please fill in the required fields.");
    return;
  }

  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert("You must be signed in to submit a testimony.");
    window.location.href = "login.html";
    return;
  }


  try {
    await addDoc(collection(db, "Testimonies"), {
      Author: name || user.displayName || "Anonymous",
      Title: title,
      Content: content,
      Date: new Date().toISOString(),
      userId: user.uid 
    });

    document.getElementById("testimonyForm").reset();
    document.getElementById("successMsg").style.display = "block";
    window.location.href = "testimony.html";
  } catch (error) {
    console.error("Error adding testimony:", error);
    alert("Something went wrong. Try again.");
  }
});

