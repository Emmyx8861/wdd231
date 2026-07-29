document.addEventListener("DOMContentLoaded", () => {
    
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString(); 
    }

    const modalTriggers = document.querySelectorAll(".open-modal");
    const closeButtons = document.querySelectorAll(".close-modal");

    modalTriggers.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            if (modal) modal.showModal();
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest("dialog");
            if (modal) modal.close();
        });
    });

    const resultsContainer = document.getElementById("submission-results");
    if (resultsContainer) {
        const currentUrl = window.location.search;
        const urlParams = new URLSearchParams(currentUrl);

        if (urlParams.has("first_name")) {
            const rawDate = urlParams.get("timestamp");
            const formattedDate = new Date(rawDate).toLocaleString();

            resultsContainer.innerHTML = `
                <p><strong>First Name:</strong> ${urlParams.get("first_name")}</p>
                <p><strong>Last Name:</strong> ${urlParams.get("last_name")}</p>
                <p><strong>Email:</strong> ${urlParams.get("email")}</p>
                <p><strong>Mobile Phone:</strong> ${urlParams.get("phone")}</p>
                <p><strong>Business Name:</strong> ${urlParams.get("business_name")}</p>
                <p><strong>Date Submitted:</strong> ${formattedDate}</p>
            `;
        } else {
            resultsContainer.innerHTML = "<p>No submission data found.</p>";
        }
    }
});