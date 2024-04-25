const fetchLastResult = async () => {
    const API_KEY = process.env.API_KEY;
    const URL = process.env.URL_LAST_GAME;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(URL, options);
        const data = await response.json();

        if (data.response && data.response[0]) {
            return data.response[0]; // Return the last result data
        } else {
            throw new Error('Error: Last result data is missing.');
        }
    } catch (error) {
        throw error; // Rethrow the error to handle retries
    }
};

const renderLastResult = (lastResult) => {
    const {
        teams,
        goals,
        fixture: { venue, date }
    } = lastResult;

    const gameDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const localDate = gameDate.toLocaleDateString(undefined, options);

    const lastGameContainer = document.getElementById('lastGame');
    lastGameContainer.innerHTML = `
        <div class="team-home">
            <img src="${teams.home.logo}" alt="${teams.home.name} Logo" class="nextGame-team-logo">
        </div>
        <div class="game-info">
            <p><i class="fa-regular fa-calendar"></i> ${localDate}</p>
            <p class="game-info-time">${goals.home} - ${goals.away}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${venue.city}</p>
        </div>
        <div class="team-away">
            <img src="${teams.away.logo}" alt="${teams.away.name} Logo" class="nextGame-team-logo">
        </div>
    `;
};

const results = async () => {
    try {
        const lastResult = await fetchLastResult();
        // Proceed with rendering the last result data...
        renderLastResult(lastResult);
    } catch (error) {
        console.error('Failed to fetch last result:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

results();
