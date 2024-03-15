const API_KEY = process.env.API_KEY;
const URL = process.env.URL_NEXT_GAME;

const fetchNextFixture = async () => {
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

        // Check if fixture data exists
        if (data.response && data.response[0]) {
            return data.response[0]; // Return the fixture data
        } else {
            throw new Error('Error: Fixture data is missing.');
        }
    } catch (error) {
        throw error; // Rethrow the error to handle retries
    }
};

const retryFetchNextFixture = async (maxRetries, retryDelay) => {
    let retries = 0;
    let lastError = null;

    while (retries < maxRetries) {
        try {
            const fixture = await fetchNextFixture();
            return fixture; // If successful, return the fixture data
        } catch (error) {
            retries++;
            lastError = error;
            console.error(`Attempt ${retries} failed: ${error}`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
        }
    }

    throw lastError; // If all retries fail, throw the last error encountered
};

const nextFixture = async () => {
    try {
        const fixture = await retryFetchNextFixture(3, 1000); // Retry up to 3 times with a 1-second delay
        // Proceed with rendering the fixture data...
    } catch (error) {
        console.error('Failed to fetch fixture:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

nextFixture();
