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

const nextFixture = async () => {
    try {
        const fixture = await fetchNextFixture();
        console.log('Next Fixture:', fixture);
        // Proceed with rendering the fixture data or further processing...
    } catch (error) {
        console.error('Failed to fetch fixture:', error.message);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

nextFixture();
