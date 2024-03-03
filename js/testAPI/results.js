import resultsData from "./resultsData.js";  



const results = () => {
    const lastResult = resultsData[0]; // Get the first fixture object from the fixtureData array
    
    // Check if fixture data exists
    if (lastResult) {
        const {
            teams,
            goals, // Fetch goals from fixture directly
            fixture: { venue, date } // Destructure venue and date from fixture
        } = lastResult;

        // Check if venue data exists
        if (venue) {
            const homeTeam = teams.home;
            const awayTeam = teams.away;

            const homeGoals = goals.home;
            const awayGoals = goals.away;

            const gameDate = new Date(date);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            const localDate = gameDate.toLocaleDateString(undefined, options);
            

            const nextGameContainer = document.getElementById('lastGame');

            nextGameContainer.innerHTML = `
                
                <div class="team-home">
                    <img src="${homeTeam.logo}" alt="${homeTeam.name} Logo" class="nextGame-team-logo">
                </div>
                <div class="game-info">
                    <p><i class="fa-regular fa-calendar"></i> ${localDate}</p>
                    <p class="game-info-time">${homeGoals} - ${awayGoals}</p>
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

results();
