document.addEventListener("DOMContentLoaded", () => {
    const currentYearSpan = document.querySelector('#current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.querySelector('#lastModified');
    if (lastModifiedParagraph) {
        lastModifiedParagraph.innerHTML = `Last Modification: ${document.lastModified}`;
    }
});