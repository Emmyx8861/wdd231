const url = 'data/members.json';
const container = document.querySelector('#directory-container');
const gridButton = document.querySelector('#gridBtn');
const listButton = document.querySelector('#listBtn');

// 1. Fetch data from JSON file using async/await
async function getMembers() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Could not fetch directory members:", error);
        container.innerHTML = `<p class="error-msg">Failed to load local chamber directory profiles.</p>`;
    }
}

// 2. Render cards onto the DOM
function displayMembers(members) {
    container.innerHTML = ""; // Clear loader placeholder
    
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('card');

        // Apply dynamic classes selector based on membership level (Bronze, Silver, Gold)
        const levels = { 1: "member-bronze", 2: "member-silver", 3: "member-gold" };
        card.classList.add(levels[member.level] || "member-bronze");

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <div class="card-logo">
                <img src="images/${member.image}" alt="${member.name} logo" class="logo" 
                     onerror="this.onerror=null; this.src='https://placehold.co/200x100/1e3a8a/ffffff?text=${encodeURIComponent(member.name)}';">
            </div>
            <div class="info">
                <p><strong>EMAIL:</strong> ${member.email}</p>
                <p><strong>PHONE:</strong> ${member.phone}</p>
                <p><strong>ADDRESS:</strong> ${member.address}</p>
                <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url.replace('https://', '')}</a></p>
            </div>
        `;
        container.appendChild(card);
    });
}

// 3. Grid/List Layout Toggle Event Listeners
gridButton.addEventListener('click', () => {
    container.className = 'grid';
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    container.className = 'list';
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});

// 4. Update Footer Dates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Initialize dynamic load
getMembers();