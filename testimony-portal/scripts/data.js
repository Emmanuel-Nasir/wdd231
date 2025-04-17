// js/data.js

const testimonyList = document.getElementById('testimonyList');

// Dummy data
const testimonies = [
  {
    title: "He Restored My Family",
    content: "After years of brokenness, God brought healing to our home.",
    author: "Jane D.",
    date: "2024-11-05"
  },
  {
    title: "Miraculous Healing",
    content: "I was told I would never walk again. But here I am.",
    author: "Anonymous",
    date: "2024-10-21"
  },
  {
    title: "Provision in Crisis",
    content: "When I lost my job, God made a way for me every step of the way.",
    author: "Mark L.",
    date: "2024-09-15"
  }
];

// Sort from latest to oldest
testimonies.sort((a, b) => new Date(b.date) - new Date(a.date));

// Render function
function renderTestimonies(data) {
  data.forEach((testimony) => {
    const card = document.createElement('div');
    card.className = 'testimony-card';
    card.innerHTML = `
      <h3>${testimony.title}</h3>
      <p>${testimony.content}</p>
      <div class="meta">
        <span>– ${testimony.author || 'Anonymous'}</span>
        <span>${new Date(testimony.date).toLocaleDateString()}</span>
      </div>
    `;
    testimonyList.appendChild(card);
  });
}

renderTestimonies(testimonies);
