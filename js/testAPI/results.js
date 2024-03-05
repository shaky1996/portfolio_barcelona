const API_KEY = process.env.API_KEY;
const URL = process.env.URL_LAST_GAME;

const results = async () => {
    // Set up options for the fetch request
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        // Fetch data from the API using the provided URL and options
        const response = await fetch(URL, options);
        const data = await response.json();

        // Check if fixture data exists in the response
        if (data.response && data.response[0]) {
            // Extract necessary data from the response
            const lastResult = data.response[0];
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

            // Prepare the HTML structure with corresponding divs
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
        } else {
            console.error('Error: Fixture data is missing.');
        }
    } catch (error) {
        console.error(error);
    }
};

// Call the function to fetch and process results
results();
