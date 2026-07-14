const url = 'scripts/members.json';
const container = document.querySelector('#directory-container');
const gridButton = document.querySelector('#gridBtn');
const listButton = document.querySelector('#listBtn');

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

function displayMembers(members) {
    container.innerHTML = ""; 
    
    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('card');

        card.innerHTML = `
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline}</p>
            <div class="card-body">
                <div class="card-logo">
                    <img src="images/${member.image}" alt="${member.name} logo" class="logo" 
                         onerror="this.onerror=null; this.src='https://placehold.co/100x100/1e3a8a/ffffff?text=Logo';">
                </div>
                <div class="info">
                    <p><strong>EMAIL:</strong> ${member.email}</p>
                    <p><strong>PHONE:</strong> ${member.phone}</p>
                    <p><strong>URL:</strong> <a href="${member.url}" target="_blank">${member.url.replace('https://', '')}</a></p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

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

document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

getMembers();