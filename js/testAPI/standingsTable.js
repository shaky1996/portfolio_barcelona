const API_KEY = process.env.API_KEY;
const URL = process.env.URL_STANDINGS;

const standingsTable = async () => {
    const url = URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);


        const standingsDatas = data.response;
        const tbody = document.getElementById('standingsBody');
        standingsDatas[0].league.standings[0].forEach((team) => {
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
    } 
         catch (error) {
        console.log(error);
    }
}

standingsTable();

