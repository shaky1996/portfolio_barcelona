const fixtureData = [
    {
        fixture: {
            id: 1038212,
            referee: 'Alejandro Hernández',
            timezone: 'UTC',
            date: '2024-03-03T20:00:00+00:00',
            timestamp: 1709496000,
            periods: {
                first: null,
                second: null
            },
            venue: {
                id: 1460,
                name: 'San Mamés Barria',
                city: 'Bilbao'
            },
            status: {
                long: 'Not Started',
                short: 'NS',
                elapsed: null
            }
        },
        league: {
            id: 140,
            name: 'La Liga',
            country: 'Spain',
            logo: 'https://media.api-sports.io/football/leagues/140.png',
            flag: 'https://media.api-sports.io/flags/es.svg',
            season: 2023,
            round: 'Regular Season - 27'
        },
        teams: {
            home: {
                id: 531,
                name: 'Athletic Club',
                logo: 'https://media.api-sports.io/football/teams/531.png',
                winner: null
            },
            away: {
                id: 529,
                name: 'Barcelona',
                logo: 'https://media.api-sports.io/football/teams/529.png',
                winner: null
            }
        },
        goals: {
            home: null,
            away: null
        },
        score: {
            halftime: {
                home: null,
                away: null
            },
            fulltime: {
                home: null,
                away: null
            },
            extratime: {
                home: null,
                away: null
            },
            penalty: {
                home: null,
                away: null
            }
        }
    }
];

export default fixtureData;
