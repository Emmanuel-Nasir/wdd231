function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
    }
}


// Set current year in the footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Set the last modified date in the footer
document.getElementById("last-modified").textContent = document.lastModified;

