const API_KEY = process.env.API_KEY;
const URL = process.env.URL_STANDINGS;

const fetchStandings = async () => {
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
        
        return data.response; // Return the standings data
    } catch (error) {
        throw error; // Rethrow the error to handle retries
    }
};

const renderStandings = (standingsData) => {
    const tbody = document.getElementById('standingsBody');

    standingsData[0].league.standings[0]?.forEach((team) => { // Added ? after forEach
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.rank}</td>
            <td>
                <img src="${team.team.logo}" alt="${team.team.name} Logo" class="standings-logo">
                ${team.team.name}
            </td>
            <td>${team.all.played}</td>
            <td>${team.goalsDiff}</td>
            <td style="font-weight: bold;">${team.points}</td>
        `;
        tbody.appendChild(row);
    });
};

const standingsTable = async () => {
    try {
        const standingsData = await fetchStandings();
        // Proceed with rendering the standings data...
        renderStandings(standingsData);
    } catch (error) {
        console.error('Failed to fetch standings:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

standingsTable();
