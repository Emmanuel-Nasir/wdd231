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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Modal handlers
const openModal = document.getElementById("openModal");
const modal = document.getElementById("testimonyModal");
const closeModal = document.getElementById("closeModal");

openModal.addEventListener("click", () => modal.style.display = "block");
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Save email to Firestore
document.getElementById("subscribeBtn").addEventListener("click", async () => {
  const email = document.getElementById("emailInput").value.trim();
  const feedback = document.getElementById("feedbackMsg");

  if (!email) {
    feedback.textContent = "Please enter a valid email.";
    feedback.style.color = "red";
    return;
  }

  try {
    await db.collection("testimonySubscribers").add({
      email: email,
      timestamp: new Date()
    });
    feedback.textContent = "Subscribed successfully!";
    feedback.style.color = "green";
    document.getElementById("emailInput").value = "";
  } catch (error) {
    console.error("Error saving email:", error);
    feedback.textContent = "Something went wrong. Try again.";
    feedback.style.color = "red";
  }
});

// -------------------------------------------------
const discussionList = document.getElementById("discussionList");

function renderDiscussions() {
  db.collection("discussionComments")
    .orderBy("timestamp", "desc")
    .limit(5)
    .onSnapshot(snapshot => {
      discussionList.innerHTML = ""; // Clear old list
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<strong>${data.name}</strong> on <a href="${data.testimonyUrl}">${data.testimonyTitle}</a>`;
        discussionList.appendChild(li);
      });
    });
}

renderDiscussions();

// ----------------------------------------------------
const testimoniesList = document.getElementById("testimoniesList");

function renderNewTestimonies() {
  db.collection("testimonies")
    .orderBy("timestamp", "desc")
    .limit(5)
    .onSnapshot(snapshot => {
      testimoniesList.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.innerHTML = `<a href="${data.url}">${data.title}</a>`;
        testimoniesList.appendChild(li);
      });
    });
}

renderNewTestimonies();

