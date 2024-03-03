const resultsData = [
    {
        fixture: {
            id: 1038203,
            referee: 'Alejandro Muniz Ruiz, Spain',
            timezone: 'UTC',
            date: '2024-02-24T15:15:00+00:00',
            timestamp: 1708787700,
            periods: {
                first: 1708787700,
                second: 1708791300
            },
            venue: {
                id: 19939,
                name: 'Estadi Olímpic Lluís Companys',
                city: 'Barcelona'
            },
            status: {
                long: 'Match Finished',
                short: 'FT',
                elapsed: 90
            }
        },
        league: {
            id: 140,
            name: 'La Liga',
            country: 'Spain',
            logo: 'https://media.api-sports.io/football/leagues/140.png',
            flag: 'https://media.api-sports.io/flags/es.svg',
            season: 2023,
            round: 'Regular Season - 26'
        },
        teams: {
            home: {
                id: 529,
                name: 'Barcelona',
                logo: 'https://media.api-sports.io/football/teams/529.png',
                winner: true
            },
            away: {
                id: 546,
                name: 'Getafe',
                logo: 'https://media.api-sports.io/football/teams/546.png',
                winner: false
            }
        },
        goals: {
            home: 4,
            away: 0
        },
        score: {
            halftime: {
                home: 1,
                away: 0
            },
            fulltime: {
                home: 4,
                away: 0
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

export default resultsData