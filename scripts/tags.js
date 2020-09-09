let trendingTags = () => {
    let urlTrending = `https://api.giphy.com/v1/trending/searches?api_key=${Key_api}`
    let trendSection = document.querySelector('.trending-container');
    
    fetch(urlTrending).then((trendGif) => {
        trendGif.json().then((trendGif) => {
            trendSection.innerHTML = `
            <h2>Trending</h2>
            <div><p class='tag' onclick='tagSearch()'>${trendGif.data[0]}</p> <span>,</span> <p class='tag' onclick='tagSearch()'>${trendGif.data[1]}</p> <span>,</span> <p class='tag' onclick='tagSearch()'>${trendGif.data[2]}</p> <span>,</span> <p class='tag' onclick='tagSearch()'>${trendGif.data[3]}</p> <span>,</span> <p class='tag' onclick='tagSearch()'>${trendGif.data[4]}</p> <span>,</span> <p class='tag' onclick='tagSearch()'>${trendGif.data[5]}</p></div>`

            
        });
    });
}

let tagSearch = () => {
    document.querySelector('#results').innerHTML='';
    document.querySelector('.search-title').innerHTML= '';
    let tag= event.currentTarget.innerHTML;
    document.querySelector('.search-title').innerHTML= tag;
    let button = document.querySelector('.btn');
    getGifByTitle(tag).then((gifData) => {

        if(button == null) {
            buttonAdd();
        };
        
        gifData.data.forEach(gif => {
            createHtml(gif);
            allGifs.push(new Gif (gif.images.preview_gif.url, gif.images.downsized.url, gif.id, gif.title, gif.username));
    
        });     
    });    
}

trendingTags();