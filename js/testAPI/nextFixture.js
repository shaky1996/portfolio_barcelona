const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchNextFixture = async () => {
    const API_KEY = process.env.API_KEY;
    const URL = process.env.URL_NEXT_GAME;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(URL, options);

        if (!response.ok) {
            throw new Error('Failed to fetch fixture data');
        }

        const data = await response.json();

        if (data && data.response && data.response[0]) {
            return data.response[0]; // Return the fixture data
        } else {
            throw new Error('Error: Fixture data is missing.');
        }
    } catch (error) {
        throw error;
    }
};

const renderNextFixture = (nextFixture) => {
    const {
        teams,
        fixture: { venue, date }
    } = nextFixture;

    const gameDate = new Date(date);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    const localDate = gameDate.toLocaleDateString(undefined, options);

    // Formatting time into Hour/Minutes
    const localTime = gameDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
    const nextGameContainer = document.getElementById('nextGame');
    nextGameContainer.innerHTML = `
        <div class="team-home">
            <img src="${teams.home.logo}" alt="${teams.home.name} Logo" class="nextGame-team-logo">
        </div>
        <div class="game-info">
            <p><i class="fa-regular fa-calendar"></i> ${localDate}</p>
            <p class="game-info-time">${localTime}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${venue.city}</p>
        </div>
        <div class="team-away">
            <img src="${teams.away.logo}" alt="${teams.away.name} Logo" class="nextGame-team-logo">
        </div>
    `;
};

const fetchNextFixtureWithDelay = async () => {
    await delay(1000); // 1-second delay
    return await fetchNextFixture();
};

const nextFixtureWithDelay = async () => {
    try {
        const nextFixture = await fetchNextFixtureWithDelay();
        renderNextFixture(nextFixture);
    } catch (error) {
        console.error('Failed to fetch and render next fixture:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

nextFixtureWithDelay();
