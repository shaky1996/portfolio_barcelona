const API_KEY = process.env.API_KEY_NEWS;
const URL = process.env.URL_NEWS;

const news = async () => {
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

        const newsData = result;
        const leftNews = newsData.slice(0, 3); // Get the first 3 from API response news for left bigger news section
        const rightNews = newsData.slice(3, 9); // Get the rest news from API response for smaller right news section

        const leftNewsContainer = document.getElementById('leftNews');
        const rightNewsContainer = document.getElementById('rightNews');

        //Map through API response to display each element seprately for left bigger news
        leftNewsContainer.innerHTML = leftNews  
            .map(
                (leftNewsItem) => `
                
                <div class="leftNews">
                <a href="${leftNewsItem.url}" target="_blank">
                    <img src="${leftNewsItem.news_img}" alt="${leftNewsItem.title} Logo" class="leftNews-img">
                    <h1> ${leftNewsItem.title}</h1>                    
                    </a>
                </div>
            `
            )
            .join('');

            //Map through API response to display each element seprately for right smaller news
        rightNewsContainer.innerHTML = rightNews
            .map(
                (rightNewsItem) => `
        <div class="rightNews">
        <a href="${rightNewsItem.url}" target="_blank">
            <img src="${rightNewsItem.news_img}" alt="${rightNewsItem.title} Logo" class="rightNews-img">
            <h1>${rightNewsItem.title}</h1>
            </a>
            
        </div>
    `
            )
            .join('');
    } catch (error) {
        console.error(error);
        
    }
};

news();
