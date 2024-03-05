const API_KEY = process.env.API_KEY
const URL = process.env.URL_NEXT_GAME

const nextFixture = async () => {
    const url = URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    
    // try {
    //     const response = await fetch(url, options);
    //     const result = await response.text();
    //     console.log(result);
    // } catch (error) {
    //     console.error(error);
    // }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);

        // Check if fixture data exists
        if (data.response && data.response[0]) {
            const fixture = data.response[0];
            const {
                fixture: { date, venue },
                teams: { home, away }
            } = fixture;

            const gameDate = new Date(date);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            const localDate = gameDate.toLocaleDateString(undefined, options);
            const localTime = gameDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });

            const nextGameContainer = document.getElementById('nextGame');

            nextGameContainer.innerHTML = `
                <div class="team-home">
                    <img src="${home.logo}" alt="${home.name} Logo" class="nextGame-team-logo">
                </div>
                <div class="game-info">
                    <p><i class="fa-regular fa-calendar"></i> ${localDate}</p>
                    <p class="game-info-time">${localTime}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${venue.city}</p>
                </div>
                <div class="team-away">
                    <img src="${away.logo}" alt="${away.name} Logo" class="nextGame-team-logo">
                </div>
            `;
        } else {
            console.error('Error: Fixture data is missing.');
        }
    } catch (error) {
        console.log(error);
    }
};

// nextFixture();
