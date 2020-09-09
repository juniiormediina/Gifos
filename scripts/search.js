const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";
const limit = 12;

async function getGifByTitle(title) {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${Key_api}&q=${title}&limit=${limit}&offset=0&rating=g&lang=en`;
        let response = await fetch(url);
        let gifData = await response.json();
        return gifData;
}

let input = document.getElementById('gifTitle');
let results = document.getElementById('results');
let btnSearch = document.getElementById('search');

btnSearch.addEventListener('click',()=>{
        search();
});


let search = () => {
    let gifTitle = input.value;

    document.querySelector('.search-title').innerHTML= input.value;
    document.querySelector('#results').innerHTML='';
    if(gifTitle === ''){
        alert('Ingrese el nombre de un GIF para buscar');
    } else{

        getGifByTitle(gifTitle).then((gifData) => {

            let button = document.querySelector('.btn');
            if(button == null) {
                buttonAdd();
            }
            gifData.data.forEach(gif => {
                createHtml(gif);
                allGifs.push(new Gif (gif.images.downsized.url, gif.images.preview_gif.url, gif.id, gif.title, gif.username));

            });            
        });

    }

}

// FUNCION DE AGREGAR BOTÓN
let buttonAdd = () => {

    let div = document.querySelector('.result-search-section');
    
    let button = document.createElement('button');
    button.textContent = 'VER MÁS';
    button.classList.add('btn')
    button.setAttribute('id', 'btnSeeMore');
    button.setAttribute('onclick', 'limitFunction()');
    div.insertAdjacentElement('beforeend',button);
}

let limitBtn = 12;

let limitFunction = () => {
    limitBtn+=12;
    seeMore();
}



let seeMore = () => {
    let gifTitle = input.value;
    document.querySelector('#results').innerHTML='';
    document.querySelector('.search-title').innerHTML= '';

    async function getGifByTitleVerMas(title) {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${Key_api}&q=${title}&limit=${limitBtn}&offset=0&rating=g&lang=en`;
        let response = await fetch(url);
        let gifData = await response.json();
        return gifData;
    }

        
        getGifByTitleVerMas(gifTitle).then((gifData) => {
            let button = document.querySelector('.btn');
            
            if(button == null) {
                buttonAdd();
            }

            gifData.data.forEach(gif => {
                createHtml(gif);
                allGifs.push(new Gif (gif.images.preview_gif.url, gif.images.downsized.url, gif.id, gif.title, gif.username));
            });            
        });
        
}

// FUNCIONES PARA LLAMADOS A LA API
let getUrlImage = (urlImage) => {

    if (urlImage.images.preview_gif.url) {
            return urlImage.images.preview_gif.url;          
    } else {
            return '';
    }  
}

let getTitle = (title) => {
    return title.title;
}

let getGifUser = (usern) => {

    if (usern.username === ''){
        return usern.username ='Sin Usuario'
    } else{
        return usern.username;
    }   
}
var getId = (id) => {

    return id.id;
}

let createHtml = (information) =>{
    let divItem = document.createElement("div");
    divItem.classList.add('item');
    let img = document.createElement("img");
    img.src = getUrlImage(information);
    img.alt = getTitle(information);
    img.setAttribute("data-id", getId(information));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");
    let overlayDiv = document.createElement("div");
    overlayDiv.classList.add('overlay');
    let iconOverlayDiv = document.createElement("div");
    iconOverlayDiv.classList.add('icon-overlay');
    let imgFav = document.createElement("img");
    imgFav.src="./assets/icon-fav-hover.svg";
    imgFav.id = "img-favorite";
    imgFav.setAttribute("data-id", getId(information));
    imgFav.setAttribute("onclick", "addFavorite('"+imgFav.dataset.id+"')");
    let imgDownload = document.createElement("img");
    imgDownload.src = "./assets/icon-download.svg";
    imgDownload.setAttribute("data-image", getUrlImage(information));
    imgDownload.setAttribute("data-title", getTitle(information));
    imgDownload.addEventListener('click', ()=> descargarGif(imgDownload.dataset.image , imgDownload.dataset.title));
    let imgMax = document.createElement("img");
    imgMax.src = "./assets/icon-max.svg";
    imgMax.setAttribute("data-id", getId(information));
    imgMax.setAttribute("onclick", "searchGif('"+imgMax.dataset.id+"')");
    let divText = document.createElement("div");
    divText.classList.add('text-overlay');
    let userP = document.createElement('p');
    userP.textContent = getGifUser(information);
    let h2Title = document.createElement("h2");
    h2Title.textContent= getTitle(information);
    divItem.appendChild(img);
    divItem.appendChild(overlayDiv);
    overlayDiv.appendChild(iconOverlayDiv);
    iconOverlayDiv.appendChild(imgFav);
    iconOverlayDiv.appendChild(imgDownload);
    iconOverlayDiv.appendChild(imgMax);
    overlayDiv.appendChild(divText);
    divText.appendChild(userP);
    divText.appendChild(h2Title);
    let out = document.querySelector('#results');
    out.appendChild(divItem);
    out.insertAdjacentElement('beforeend', divItem);
}

// LLAMADO A LA API SUGERENCIAS DE BUSQUEDA
let search_input_enter = document.getElementById('gifTitle');
search_input_enter.addEventListener("keyup",(event)=>{
    
    if (event.keyCode === 13){
        document.querySelector('.search-title').innerHTML= input.value;    
        search();
        return;
    } 
    if(search_input_enter.value == '') {
        document.querySelector('.suggestions').innerHTML = '';
        suggestion_container.style.display =''
    }else{
        suggest();
    }
});


let suggestion_container = document.querySelector('.suggestion-container');
let suggest = ()=>{
    let term = input.value;
    
    if(term != ''){
        suggestion_container.style.display = 'block';
    }
    
    
    fetch(`https://api.giphy.com/v1/tags/related/${term}?api_key=${Key_api}&limit=4`)
    .then(response=>{
        response.json().then(data=>{
            console.log(data);
            
            document.querySelector('.suggestions').innerHTML = '';
        for (let i = 0; i < data.data.length; i++) {
            createSuggestions(data.data[i].name);
            
        }    
        
    });
});
}

let getsearch = ()=>{
    let search_value = event.target.childNodes[1];
    input.value=search_value.textContent;
    document.querySelector('.search-title').innerHTML= input.value;
    document.querySelector('#results').innerHTML='';

    getGifByTitle(input.value).then((gifData) => {
        let button = document.querySelector('.btn');
        if(button == null) {
            buttonAdd();
        }
        gifData.data.forEach(gif => {
            createHtml(gif);
            allGifs.push(new Gif (gif.images.downsized.url, gif.images.preview_gif.url, gif.id, gif.title, gif.username));
            
        });            
    });
    suggestion_container.style.display = ''; 
}


let createSuggestions = (data) => {
    let imgIcon = document.createElement('img');
    imgIcon.src = './assets/icon-search-gray.svg';

    let li = document.createElement('li');
    li.classList.add('suggestion-list');
    li.setAttribute('onclick', "getsearch()");
    li.textContent = data;

    li.insertAdjacentElement('afterbegin', imgIcon);
    let ul = document.querySelector('.suggestions');
    ul.insertAdjacentElement('beforeend', li);
}