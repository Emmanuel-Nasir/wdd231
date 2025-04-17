document.addEventListener('DOMContentLoaded', (event) => {
    const currentYearElement = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    if (currentYearElement) {
        currentYearElement.textContent = currentYear;
    }

    const lastModifiedElement = document.getElementById('lastModified');
    const lastModified = document.lastModified;
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
    }
});


function myFunction(x) {
            x.classList.toggle("change");
        }
