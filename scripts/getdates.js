// Dynamically populate the document footer with copyright year and last modified date

const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.innerHTML = document.lastModified;
}

