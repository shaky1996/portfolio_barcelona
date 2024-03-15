const API_KEY = process.env.API_KEY;
const URL = process.env.URL_LAST_GAME;

const fetchLastResult = async () => {
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
            throw new Error('Error: Fixture data is missing.');
        }
    } catch (error) {
        throw error; // Rethrow the error to handle retries
    }
};

const retryFetchLastResult = async (maxRetries, retryDelay) => {
    let retries = 0;
    let lastError = null;

    while (retries < maxRetries) {
        try {
            const lastResult = await fetchLastResult();
            return lastResult; // If successful, return the last result data
        } catch (error) {
            retries++;
            lastError = error;
            console.error(`Attempt ${retries} failed: ${error}`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
        }
    }

    throw lastError; // If all retries fail, throw the last error encountered
};

const results = async () => {
    try {
        const lastResult = await retryFetchLastResult(3, 1000); // Retry up to 3 times with a 1-second delay
        // Proceed with rendering the last result data...
        renderLastResult(lastResult);
    } catch (error) {
        console.error('Failed to fetch last result:', error);
        // Handle the error appropriately, e.g., display an error message to the user
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

results();
