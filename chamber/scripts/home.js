const apiKey = '6595b92524117d93213c8b2349464267'; 
const lat = 6.5244;
const lon = 3.3792;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = 'data/members.json';

async function fetchWeather() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (weatherResponse.ok && forecastResponse.ok) {
            const currentData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayWeather(currentData, forecastData);
        } else {
            throw Error('Failed to fetch weather data');
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(current, forecast) {
    const weatherContainer = document.getElementById('current-weather');
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="${icon}" alt="${desc}" width="50" height="50">
            <p><strong>${temp}&deg;C</strong> - <span style="text-transform: capitalize;">${desc}</span></p>
        </div>
    `;

    const forecastContainer = document.getElementById('weather-forecast');
    const dailyForecasts = forecast.list.filter(x => x.dt_txt.includes("12:00:00")).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
        const dayTemp = Math.round(day.main.temp);
        forecastContainer.innerHTML += `<p><strong>${date}:</strong> ${dayTemp}&deg;C</p>`;
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.log(error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    
    const qualifiedMembers = members.filter(m => m.level === 'Gold' || m.level === 'Silver');
    
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    
    const numToSelect = Math.floor(Math.random() * 2) + 2; 
    const selectedMembers = shuffled.slice(0, numToSelect);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');
        
        card.innerHTML = `
            <h4>${member.name}</h4>
            <p class="membership-badge">${member.level} Member</p>
            <div class="logo-box">
                <img src="images/${member.image}" alt="${member.name} logo" width="100" height="100" loading="lazy"
                     onerror="this.onerror=null; this.src='https://placehold.co/100x100/1e3a8a/ffffff?text=Logo';">
            </div>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.url}" target="_blank" rel="noopener">Website</a></p>
        `;
        container.appendChild(card);
    });
}

fetchWeather();
fetchSpotlights();