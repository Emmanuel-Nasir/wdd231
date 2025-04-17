// Function to check and display visitor message based on localStorage
window.addEventListener('load', function() {
    const visitorMessage = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date();
    const lastVisitDate = new Date(parseInt(lastVisit));

    if (!lastVisit) {
        // First time visitor
        visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

        if (daysDifference === 0) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitorMessage.textContent = `You last visited 1 day ago.`;
        } else {
            visitorMessage.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Store the current visit date
    localStorage.setItem('lastVisit', Date.now().toString());
});