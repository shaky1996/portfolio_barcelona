import newsData from './newsData.js';

const news = () => {
    const leftNews = newsData.slice(0, 3); // Get the first 2 news  from the newsData array
    const rightNews = newsData.slice(3, 9);
    // const belowNews = newsData.slice(4, 10);
    

    const leftNewsContainer = document.getElementById('leftNews');
    const rightNewsContainer = document.getElementById('rightNews');
    // const belowNewsContainer = document.getElementById('belowNews');

    leftNewsContainer.innerHTML = leftNews.map(leftNewsItem => `
                
                <div class="leftNews">
                <a href="${leftNewsItem.url}" target="_blank">
                    <img src="${leftNewsItem.news_img}" alt="${leftNewsItem.title} Logo" class="leftNews-img">
                    <h1> ${leftNewsItem.title}</h1>                    
                    </a>
                </div>
            `).join('');


            rightNewsContainer.innerHTML = rightNews.map(rightNewsItem => `
        <div class="rightNews">
        <a href="${rightNewsItem.url}" target="_blank">
            <img src="${rightNewsItem.news_img}" alt="${rightNewsItem.title} Logo" class="rightNews-img">
            <h1>${rightNewsItem.title}</h1>
            </a>
            
        </div>
    `).join('');
}

//     belowNewsContainer.innerHTML = belowNews.map(belowNewsItem => `
//         <div class="belowNews">
//             <img src="${belowNewsItem.news_img}" alt="${belowNewsItem.title} Logo" class="belowNews-img">
//         </div>
//         <div class="belowNews-info">
//             <h1>${belowNewsItem.title}</h1>
//             <p>${belowNewsItem.short_desc}</p>
//             <a href="${belowNewsItem.url}" target="_blank">Read More</a>
//         </div>
//     `).join('');
// };

news();
