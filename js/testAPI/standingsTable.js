import standingsDatas from './standingsDatas.js'

const standingsTable = (standingsDatas) => {
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
};


standingsTable(standingsDatas);

