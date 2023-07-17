const API_KEY = "8137040fda7243cf96d4dee88b39dd8c"
const URL = "https://newsapi.org/v2/everything?q="


window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${URL}${query}&apikey=${API_KEY}`)
    const data = await res.json();
    console.log(data)
    bindData(data.articles)    
}

function  bindData(articles){
    const cardsContainer = document.getElementById('cards-container')  
    const newsCardTemplate = document.getElementById('template-news-card')
    cardsContainer.innerHTML = ""

    articles.forEach((article) => {
         if(!article.urlToImage) return;
         const cardClone = newsCardTemplate.content.cloneNode(true);
         fillDataInCard(cardClone, article);
         cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newDesc = cardClone.querySelector('#news-desc')


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-us",{ 
        timeZone : "Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`   
     
}

function onNavItemClick(id){
    fetchNews(id)
}

const searchBtn = document.getElementById('search-button')
const text = document.getElementById('search-txt')

searchBtn.addEventListener('click',()=>{
    const query = text.value 
    if(!query)return
    fetchNews(query)
})