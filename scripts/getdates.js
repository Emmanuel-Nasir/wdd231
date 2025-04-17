// Get the current year and populate the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Get the last modified date and populate the paragraph
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
