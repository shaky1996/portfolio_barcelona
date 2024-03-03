import fixtureData from './fixtureData.js';

const nextFixture = () => {
    const fixture = fixtureData[0]; // Get the first fixture object from the fixtureData array
    
    // Check if fixture data exists
    if (fixture) {
        const {
            teams,
            league, // Fetch league from fixture directly
            fixture: { venue, date } // Destructure venue and date from fixture
        } = fixture;

        // Check if venue data exists
        if (venue) {
            const homeTeam = teams.home;
            const awayTeam = teams.away;

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
                    <img src="${homeTeam.logo}" alt="${homeTeam.name} Logo" class="nextGame-team-logo">
                </div>
                <div class="game-info">
                    <p><i class="fa-regular fa-calendar"></i> ${localDate}</p>
                    <p class="game-info-time">${localTime}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${venue.city}</p>
                </div>
                <div class="team-away">
                    <img src="${awayTeam.logo}" alt="${awayTeam.name} Logo" class="nextGame-team-logo">
                </div>
            `;
        } else {
            console.error('Error: Venue data is missing.');
        }
    } else {
        console.error('Error: Fixture data is missing.');
    }
};

nextFixture();
