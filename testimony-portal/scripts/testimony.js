// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, query, orderBy, onSnapshot, limit, startAfter } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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
const list = document.getElementById("testimonyList");
const loadMoreBtn = document.getElementById("loadMoreBtn");


// ------------------------------------------------------------------
// ------------------------------------------------------------------

// 1. Load All testimonies in collection from Firestore
async function loadTestimonies() {
  const snapshot = await getDocs(collection(db, "Testimonies"));
  snapshot.forEach(doc => {
    const t = doc.data();
    const html = renderCard(doc.id, t);
    list.insertAdjacentHTML("beforeend", html);
    loadComments(doc.id);
  });
}

window.addEventListener("scroll", () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (nearBottom) {
    loadTestimonies(); // Load next batch
  }
});

// Create a sentinel element at the bottom of the list
// const sentinel = document.createElement("div");
// sentinel.id = "sentinel";
// list.appendChild(sentinel);

// let lastVisible = null; // Tracks the last document loaded
// const pageSize = 5; // Number of testimonies to load per page
// let isLoading = false; // Prevents duplicate loading

// async function loadTestimonies() {
//   if (isLoading) return; // Prevent multiple calls
//   isLoading = true;

//   try {
//     let testimoniesQuery;

//     if (lastVisible) {
//       testimoniesQuery = query(
//         collection(db, "Testimonies"),
//         orderBy("timestamp"),
//         startAfter(lastVisible),
//         limit(pageSize)
//       );
//     } else {
//       testimoniesQuery = query(
//         collection(db, "Testimonies"),
//         orderBy("timestamp"),
//         limit(pageSize)
//       );
//     }

//     const snapshot = await getDocs(testimoniesQuery);

//     if (!snapshot.empty) {
//       snapshot.forEach(doc => {
//         const t = doc.data();
//         const html = renderCard(doc.id, t);
//         list.insertAdjacentHTML("beforeend", html);
//         loadComments(doc.id);
//       });

//       // Update the last visible document
//       lastVisible = snapshot.docs[snapshot.docs.length - 1];

//       // If fewer items than pageSize are returned, stop observing
//       if (snapshot.docs.length < pageSize) {
//         observer.disconnect();
//       }
//     } else {
//       // No more testimonies to load, stop observing
//       observer.disconnect();
//     }
//   } catch (err) {
//     console.error("Error loading testimonies: ", err);
//   } finally {
//     isLoading = false; // Reset the loading flag
//   }
// }

// // Intersection Observer setup
// const observer = new IntersectionObserver((entries) => {
//   const entry = entries[0];
//   if (entry.isIntersecting) {
//     loadTestimonies();
//   }
// }, {
//   root: null, // Use the viewport as the root
//   rootMargin: "0px",
//   threshold: 1.0 // Trigger when the sentinel is fully visible
// });

// // Start observing the sentinel
// observer.observe(sentinel);

// 2. Render a testimony card
function renderCard(id, { Title, Content, Author, Date: rawDate }) {
    return `
    <article class="testimony-card" data-id="${id}">
      <h3>${Title}</h3>
      <p>${Content}</p>
      <div class="meta">
        <span>By ${Author || "Anonymous"}</span>
        <span>${new Date(rawDate).toLocaleDateString()}</span>
      </div>
  
      <!-- Author Info -->
      <section class="author-bio">
        <div class="bio-card">
          <img src="images/${Author || "anonymous"}.jpg" alt="${Author}" class="author-img" loading="lazy" />
          <div class="bio-info">
            <h3>${Author}</h3>
            <p class="bio-text" data-author="${Author}">Loading bio...</p>
            <a href="#" class="all-posts-btn" data-author="${Author}">All Posts</a>
          </div>
        </div>
      </section>
  
      <!-- Share Section -->
      <section class="share-section">
        <p><strong>Share:</strong></p>
        <div class="social-buttons">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Pinterest</a>
          <a href="#">LinkedIn</a>
        </div>
      </section>
  
      <!-- Comments Section -->
      <section class="comments-section">
        <h4>Responses</h4>
        <div class="comment-list" data-id="${id}">Loading comments...</div>
        <form class="comment-form">
          <textarea placeholder="Write a response..." required></textarea>
          <div class="form-row">
            <input type="text" placeholder="Name *" required />
            <input type="email" placeholder="Email *" required />
            
          </div>
          <button type="submit">Publish</button>
        </form>
      </section>
    </article>`;
  }

  
// 3. Handle comment submissions
document.addEventListener("submit", async function (e) {
    if (!e.target.classList.contains("comment-form")) return;
  
    e.preventDefault();
    const form = e.target;
    const article = form.closest("article");
    const testimonyId = article.dataset.id;
    const name = form.querySelector('input[placeholder="Name *"]').value.trim();
    const email = form.querySelector('input[placeholder="Email *"]').value.trim();
    const content = form.querySelector('textarea').value.trim();
  
    if (!name || !email || !content) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      await addDoc(collection(db, "testimonies", testimonyId, "comments"), {
        name,
        email,
        content,
        date: new Date().toISOString()
      });
  
      form.reset();
      alert("Comment posted!");
    } catch (err) {
      console.error("Error adding comment: ", err);
    }
  });

// 4. Load and display comments
function loadComments(testimonyId) {
  const list = document.querySelector(`.comment-list[data-id="${testimonyId}"]`);
  if (!list) {
    console.warn(`Comment list element not found for testimonyId: ${testimonyId}`);
    return; // Exit if the element is not found
  }

  const q = query(collection(db, "Testimonies", testimonyId, "Comments"), orderBy("date", "desc"));

  onSnapshot(q, (snapshot) => {
    list.innerHTML = snapshot.docs.map(doc => {
      const c = doc.data();
      return `<div><strong>${c.name}</strong>: ${c.content}</div>`;
    }).join("");
  });
}
loadComments("0byMlBSOeSpa4fDanU0I")

// Loads a new testimony comments live from Firestore
function loadCommentsForTestimony(testimonyId) {
    const commentList = document.querySelector(`.comment-list[data-id="${testimonyId}"]`);
    const q = query(collection(db, "testimonies", testimonyId, "comments"), orderBy("date", "desc"));
    onSnapshot(q, (snapshot) => {
      commentList.innerHTML = snapshot.docs.map(doc => {
        const c = doc.data();
        return `
          <div class="comment">
            <p><strong>${c.name}</strong> <em>${new Date(c.date).toLocaleString()}</em></p>
            <p>${c.content}</p>
          </div>
        `;
      }).join("");
    });
  }
  
  // loadCommentsForTestimony("JlCkgjohZy6tVsmS43nl"); //Testimony ID
  loadCommentsForTestimony("0byMlBSOeSpa4fDanU0I") //Comments ID

// 5. Load dynamic author bios (stub)
// document.addEventListener("DOMContentLoaded", async () => {
//   document.querySelectorAll(".bio-text").forEach(bio => {
//     const name = bio.dataset.author;
//     // Later: fetch from Firestore or object map
//     bio.textContent = getAuthorBio(name);
//   });
// });

document.addEventListener("DOMContentLoaded", async () => {
  const bios = document.querySelectorAll(".bio-text");
  for (const bio of bios) {
    const name = bio.dataset.author;
    bio.textContent = await getAuthorBio(name);
  }
});

// Author bios (could be dynamic from Firestore later)
async function getAuthorBio(name) {
  if (!name) return "This author has not added a bio yet.";

  try {
    const authorRef = collection(db, "Authors");
    const q = query(authorRef); // You could optimize this if author names are stored as doc IDs
    const snapshot = await getDocs(q);

    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (data.name === name) return data.bio || "This author has not added a bio yet.";
    }

    return "This author has not added a bio yet.";
  } catch (err) {
    console.error("Error fetching author bio: ", err);
    return "This author has not added a bio yet.";
  }
}

// loadTestimonies();

// document.querySelector('.testimony-box').addEventListener('click', () => {
//   alert("Coming soon: Subscribe for Christian testimonies!");
// });

const openModal = document.getElementById("openModal");
const modal = document.getElementById("testimonyModal");
const closeModal = document.getElementById("closeModal");

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});


