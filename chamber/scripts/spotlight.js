async function loadSpotlights() {
    const response = await fetch('data/members.json'); // Replace with actual JSON file path
    const members = await response.json();
    const goldSilverMembers = members.filter(member => member.level === 'Gold' || member.level === 'Silver');

    // Shuffle and select 2 or 3 random members
    const selectedMembers = goldSilverMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    const spotlightContainer = document.getElementById('spotlight-cards');
    spotlightContainer.innerHTML = selectedMembers.map(member => `
        <div class="spotlight-card">
            <img src="${member.logo}" alt="${member.name} Logo">
            <h4>${member.name}</h4>
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join('');
}

loadSpotlights();
