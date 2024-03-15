const API_KEY = process.env.API_KEY_NEWS;
const URL = process.env.URL_NEWS;

const fetchNews = async () => {
    const url = URL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'football-news-aggregator-live.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        return result; // Return the news data
    } catch (error) {
        throw error; // Rethrow the error to handle retries
    }
};

const retryFetchNews = async (maxRetries, retryDelay) => {
    let retries = 0;
    let lastError = null;

    while (retries < maxRetries) {
        try {
            const newsData = await fetchNews();
            return newsData; // If successful, return the news data
        } catch (error) {
            retries++;
            lastError = error;
            console.error(`Attempt ${retries} failed: ${error}`);
            await new Promise(resolve => setTimeout(resolve, retryDelay)); // Wait before retrying
        }
    }

    throw lastError; // If all retries fail, throw the last error encountered
};

const news = async () => {
    try {
        const newsData = await retryFetchNews(3, 1000); // Retry up to 3 times with a 1-second delay
        // Proceed with rendering the news data...
        renderNews(newsData);
    } catch (error) {
        console.error('Failed to fetch news:', error);
        // Handle the error appropriately, e.g., display an error message to the user
    }
};

const renderNews = (newsData) => {
    const leftNews = newsData.slice(0, 3);
    const rightNews = newsData.slice(3, 9);

    const leftNewsContainer = document.getElementById('leftNews');
    const rightNewsContainer = document.getElementById('rightNews');

    leftNewsContainer.innerHTML = leftNews.map(
        (leftNewsItem) => `
            <div class="leftNews">
                <a href="${leftNewsItem.url}" target="_blank">
                    <img src="${leftNewsItem.news_img}" alt="${leftNewsItem.title} Logo" class="leftNews-img">
                    <h1>${leftNewsItem.title}</h1>                    
                </a>
            </div>
        `
    ).join('');

    rightNewsContainer.innerHTML = rightNews.map(
        (rightNewsItem) => `
            <div class="rightNews">
                <a href="${rightNewsItem.url}" target="_blank">
                    <img src="${rightNewsItem.news_img}" alt="${rightNewsItem.title} Logo" class="rightNews-img">
                    <h1>${rightNewsItem.title}</h1>
                </a>
            </div>
        `
    ).join('');
};

news();
