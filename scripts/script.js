/* Cambio de icono del menu */
document.getElementById('btn-menu').addEventListener('click', () => {
        
    let iconb = document.getElementById('bars');
    let iconc = document.getElementById('close');
    let fullMenu = document.getElementsByClassName('full-menu')[0];
        
    if(iconb.classList.contains('validacion')){
        iconb.style.display = 'block';
        iconc.style.display = 'none';
        fullMenu.style.left = '-100%';
        iconb.classList.remove('validacion');
    }else{
        iconc.style.display = 'block';
        iconb.style.display = 'none';
        fullMenu.style.left = '0%';
        iconb.classList.add('validacion');
    }
});

/* scroll header sticky y agrego barra de busqueda */
window.onscroll = function(){
        scrollFunction();
};

function scrollFunction(){
    if(screen.width >= 1280){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("searchNavTop").style.display = "flex";
        } else{
            document.getElementById("searchNavTop").style.display = "none";
            document.getElementById('gifTitleNav').value = '';
        }
    }
}

/* Dark style */
window.onload = () => {
        new DarkMode();
}
class DarkMode{
    constructor(){
        this.change = document.getElementById('changeMode');
        this.body = document.getElementsByTagName('body');
        this.addEvents(); 
    }
    addEvents(){
        this.change.addEventListener('click', () => {
            this.changeStyle();
        })
    }
    changeStyle(){
        event.preventDefault();
        let hasClass = this.body[0].classList.toggle('dark');
        if(hasClass){
            event.currentTarget.innerHTML = 'MODO DIURNO';
        } else{
            event.currentTarget.innerHTML = 'MODO NOCTURNO';
        }
    }
}

/* Funcion del Search */
const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";

async function getGifByTitle(title){
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${Key_api}&q=${title}&limit=12&offset=0&rating=g&lang=en`;
    let response = await fetch(url);
    let gifData = await response.json();
    return gifData;
}


let input = document.getElementById('gifTitle');
let results = document.getElementById('results');
let btnSearch = document.getElementById('search');
let closeSearch = document.getElementById('closeSearch');

btnSearch.addEventListener('click', () => {
    search();
});

input.addEventListener('keyup', (event) => {
    document.querySelector('#results').innerHTML='';
    document.querySelector('.search-title').innerHTML= '';
    if(event.keyCode === 13){
        document.querySelector('.search-title').innerHTML= input.value;
        search();
    }
});

closeSearch.addEventListener("click", (e)=>{
    if(e.target.src.includes('close.svg'))
        input.value="";
});

let inputNav = document.getElementById('gifTitleNav');
let btnSearchNav = document.getElementById('searchNav');

btnSearchNav.addEventListener('click', () => {
    document.querySelector('.search-title').innerHTML= inputNav.value;
    document.querySelector('#results').innerHTML='';
    search();
});

inputNav.addEventListener('keyup', (event) => {
    document.querySelector('#results').innerHTML='';
    document.querySelector('.search-title').innerHTML= '';
    if(event.keyCode === 13){
        document.querySelector('.search-title').innerHTML= inputNav.value;
        search();
    }
});

let search = () => {
    let gifTitle = input.value;
    let gifTitleNav = inputNav.value;

    if(gifTitle === '' && gifTitleNav === ''){
        if(closeSearch.src.includes('close.svg')){
            clearBtnSearch();
            return;
        }
        search_empty.classList.add('show');
    } else{
        search_empty.classList.add('hide');
        getGifByTitle(gifTitle).then((gifData) => {
            console.log(gifData);
            let button = document.querySelector('.btn');
            if(button == null){
                buttonAdd();
            }
            gifData.data.forEach(gif => {
                renderHTMLsearch(gif);
                allGifs.push(new Gif (gif.images.preview_gif.url, gif.images.downsized.url, gif.id, gif.title, gif.username));
            });
            
        });

        getGifByTitle(gifTitleNav).then((gifDataNav) => {
            console.log(gifDataNav);
            let button = document.querySelector('.btn');
            if(button == null) {
                buttonAdd();
            }
            gifDataNav.data.forEach(gifNav => {
                renderHTMLsearch(gifNav);
                allGifs.push(new Gif (gifNav.images.preview_gif.url, gifNav.images.downsized.url, gifNav.id, gifNav.title, gifNav.username));
            });   
        });
    }
}

/* funcion agregar boton ver mas */
let buttonAdd = () => {

    let div = document.querySelector('.result-search-section');
    let button = document.createElement('button');
    button.textContent = 'VER MÁS';
    button.classList.add('btn');
    button.setAttribute('onclick', 'limitFunction()');
    div.insertAdjacentElement('beforeend',button);
}

/* Boton ver más */
let limitBtn = 12;

let limitFunction = () => {
    limitBtn += 12;
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
            renderHTMLsearch(gif);
            allGifs.push(new Gif (gif.images.preview_gif.url, gif.images.downsized.url, gif.id, gif.title, gif.username));
        });            
    });
}

/* obtener datos necesarios */
let getImage = (urlImage) => {
    if (urlImage.images.preview_gif.url){
        return urlImage.images.preview_gif.url;          
    } else {
        return '';
    }  
}

let getTitle = (title) => {
    return title.title;
}

let getUserName = (userName) => {
    if(userName.username === ''){
        return userName.username = 'Sin usuario';
    } else{
        return userName.username;
    }
}

let getId = (id) => {
    return id.id;
}
/* Pintar información obtenida */
let renderHTMLsearch = (gifInfo) => {
    let divItem = document.createElement('div');
    divItem.classList.add('item');
    
    let img = document.createElement('img');
    img.src = getImage(gifInfo);
    img.alt = getTitle(gifInfo);
    img.setAttribute("data-id", getId(gifInfo));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");
        
    let divOverlay = document.createElement('div');
    divOverlay.classList.add('overlay');
        
    let divIconOverlay = document.createElement('div');
    divIconOverlay.classList.add('icon-overlay');
        
    let img1 = document.createElement('img');
    img1.src = "./assets/icon-fav-hover.svg";
    img1.alt = "Favoritos";
    img1.setAttribute("data-id", getId(gifInfo));
    img1.setAttribute("onclick", "addFavorite('"+img1.dataset.id+"')");
    
    let img2 = document.createElement('img');
    img2.src = "./assets/icon-download.svg";
    img2.alt = "download";
    img2.setAttribute("data-image", getImage(gifInfo));
    img2.setAttribute("data-title", getTitle(gifInfo));
    img2.addEventListener('click', () => descargarGif(img2.dataset.image , img2.dataset.title));
    
    let img3 = document.createElement('img');
    img3.src = "./assets/icon-max.svg";
    img3.alt = "max";
    img3.setAttribute("data-id", getId(gifInfo));
    img3.setAttribute("onclick", "searchGif('"+img3.dataset.id+"')");
        
    let divTextOverlay = document.createElement('div');
    divTextOverlay.classList.add('text-overlay');
        
    let p = document.createElement('p');
    p.textContent = getUserName(gifInfo);
    let h2 = document.createElement('h2');
    h2.textContent = getTitle(gifInfo);
        
    divItem.appendChild(img);
        divItem.appendChild(divOverlay);
            divOverlay.appendChild(divIconOverlay);
                divIconOverlay.appendChild(img1);
                divIconOverlay.appendChild(img2);
                divIconOverlay.appendChild(img3);
            divOverlay.appendChild(divTextOverlay);
                divTextOverlay.appendChild(p);
                divTextOverlay.appendChild(h2);
    results.appendChild(divItem);
    results.insertAdjacentElement('beforeend', divItem);
}

/* Llamado a la API sugerencias  y pintado de la información */
let search_input_enter = document.getElementById('gifTitle');
search_input_enter.addEventListener("keyup",(event)=>{
    clearBtnSearch();
});
let clearBtnSearch =()=>{
    if(input.value==""){
        closeSearch.setAttribute('src', './assets/icon-search.svg');
        closeSearch.style.padding = '';
    }
    if(search_input_enter.value == ''){
        document.querySelector('.suggestions').innerHTML = '';
        suggestion_container.style.display ='';
    }else{
        suggest();
    }
}

let suggestion_container = document.querySelector('.suggestion-container');
let suggest = () => {
    let term = event.target.value;
    
    if(term != ''){
        console.log('estoy en el primer if');
        suggestion_container.style.display = 'block';
        closeSearch.setAttribute('src', './assets/close.svg');
        closeSearch.style.padding = '3px';
    }
    
    fetch(`https://api.giphy.com/v1/tags/related/${term}?api_key=${Key_api}&limit=4`)
    .then(response => {
        response.json().then(data => {
            document.querySelector('.suggestions').innerHTML = '';
        for (let i = 0; i < data.data.length; i++) {
                createSuggestions(data.data[i].name);
        }    
        });
    });
}

let getsearch = () => {
    let search_value = event.target.childNodes[1];
    input.value = search_value.textContent;

    document.querySelector('.search-title').innerHTML= input.value;
    document.querySelector('#results').innerHTML='';

    getGifByTitle(input.value).then((gifData) => {
        let button = document.querySelector('.btn');
        if(button == null) {
            buttonAdd();
        }
        gifData.data.forEach(gif => {
            renderHTMLsearch(gif);
            allGifs.push(new Gif (gif.images.downsized.url, gif.images.preview_gif.url, gif.id, gif.title, gif.username));
        });            
    });
    suggestion_container.style.display = '';
}

let getSuggestion = (suggestion) => { 
    return suggestion;
}

let createSuggestions = (data) => {

    let li = document.createElement('li');
    li.classList.add('suggestion-list');
    li.setAttribute('onclick', "getsearch()");
    li.textContent = getSuggestion(data);

    let imgIcon = document.createElement('img');
    imgIcon.src = './assets/icon-search-gray.svg';

    let ul = document.querySelector('.suggestions');

    li.insertAdjacentElement('afterbegin', imgIcon);
    ul.insertAdjacentElement('beforeend', li);
}

/* Funcionalidad de los tags */
let getTrendingTags = () => {
    let tags = `https://api.giphy.com/v1/trending/searches?api_key=${Key_api}&limit=5`;
    let trendingSection = document.querySelector('.trending-container');
    fetch(tags).then((tagInfomation) => {
        tagInfomation.json().then((tagInfomation) => {

            trendingSection.innerHTML = `
            <h2>Trending</h2>
            <div>
                <p class='tag' onclick='tagSearch()'>${tagInfomation.data[0]}</p><span> ,</span>
                <p class='tag' onclick='tagSearch()'>${tagInfomation.data[1]}</p><span> ,</span>
                <p class='tag' onclick='tagSearch()'>${tagInfomation.data[2]}</p><span> ,</span>
                <p class='tag' onclick='tagSearch()'>${tagInfomation.data[3]}</p><span> ,</span>     
                <p class='tag' onclick='tagSearch()'>${tagInfomation.data[4]}</p>
            </div>
            `;
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
        if(button == null){
            buttonAdd();
        };
        gifData.data.forEach(gif => {
            renderHTMLsearch(gif);
            allGifs.push(new Gif (gif.images.preview_gif.url, gif.images.downsized.url, gif.id, gif.title, gif.username));
        });     
    });    
}
    
getTrendingTags();

/* Funcionalidad del slider página principal */
let slick;

let getTrendingSlider = () => {

    let slider = `https://api.giphy.com/v1/gifs/trending?api_key=${Key_api}&limit=30&rating=g`;

    fetch(slider).then((trendingSlider) => {
        trendingSlider.json().then((trendingSlider) => {
            trendingSlider.data.forEach((gifos) => {
                renderHTMLslider(gifos);
                allGifs.push(new Gif (gifos.images.preview_gif.url, gifos.images.downsized.url, gifos.id, gifos.title, gifos.username));
            });
            slick = document.querySelectorAll('.slick');
        });
    });
}

let renderHTMLslider = (gif) => {
    
    let divSlick = document.createElement('div');
    divSlick.classList.add('slick');

    let div = document.createElement('div');

    let a = document.createElement('a');

    let picture = document.createElement('picture');
    
    let img = document.createElement('img');
    img.src = getImage(gif);
    img.alt = getTitle(gif);
    img.setAttribute("data-id", getId(gif));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");

    let divOverlaySlider = document.createElement('div');
    divOverlaySlider.classList.add('overlay-slider');

    let divIconOvaerlaySlider = document.createElement("div");
    divIconOvaerlaySlider.classList.add('icon-overlay-slider');

    let favorite = document.createElement("img");
    favorite.src="./assets/icon-fav-hover.svg";
    favorite.setAttribute("data-id", getId(gif));
    favorite.setAttribute("onclick", "addFavorite('"+favorite.dataset.id+"')");
    
    let download = document.createElement("img");
    download.src = "./assets/icon-download.svg";
    download.setAttribute("data-image", getImage(gif));
    download.setAttribute("data-title", getTitle(gif));
    download.addEventListener('click', () => descargarGif(download.dataset.image , download.dataset.title));

    let max = document.createElement("img");
    max.src = "./assets/icon-max.svg";
    max.setAttribute("data-id", getId(gif));
    max.setAttribute("onclick", "searchGif('"+max.dataset.id+"')");

    let divTextOverlaySlider = document.createElement("div");
    divTextOverlaySlider.classList.add('text-overlay-slider');

    let p = document.createElement("p");
    p.classList.add('user');
    p.textContent = getUserName(gif);

    let h2 = document.createElement("h2");
    h2.classList.add('title');
    h2.textContent= getTitle(gif);

    div.appendChild(a);
        a.appendChild(picture);
            picture.appendChild(img);

            divOverlaySlider.appendChild(divIconOvaerlaySlider);
                divIconOvaerlaySlider.appendChild(favorite);
                divIconOvaerlaySlider.appendChild(download);
                divIconOvaerlaySlider.appendChild(max);
            divOverlaySlider.appendChild(divTextOverlaySlider);
                divTextOverlaySlider.appendChild(p);
                divTextOverlaySlider.appendChild(h2);

    picture.appendChild(divOverlaySlider);
    divSlick.appendChild(div);

    let sliderContainer = document.querySelector('#track');
    sliderContainer.insertAdjacentElement('beforeend', divSlick);
}

getTrendingSlider();

const buttonPrev = document.getElementById('button-prev');
const buttonNext = document.getElementById('button-next');
const track = document.getElementById('track');
const slickList = document.getElementById('slick-list');

buttonPrev.onclick = () => Move(1);
buttonNext.onclick = () => Move(2);

function Move(value){
    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;
    const slickWidth = slick[0].offsetWidth;
    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);
    if(leftPosition < (trackWidth - listWidth) && value == 2){
            track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }else if(leftPosition > 0 && value == 1){
            track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

/* Funcionalidad del modal de las imagenes */
modal = document.getElementById('modal');
modalContainer = document.getElementById('modal__content');
body = document.getElementsByTagName('body')[0];

const searchGif = (id) => {
	let gif = allGifs.filter((gif) => {
		return gif.id === id;
	});
	maximixeGif(gif[0]);
};

const maximixeGif = (gif) => {
    modalContainer.innerHTML = '';
    const { username, title, image, id, favorite } = gif;
	let src;
	if (!favorite) {
		src = './assets/icon-fav-hover.svg';
	} else{
		src = './assets/icon-fav-active.svg';
    }
    
    let template = `
        <img src="./assets/close.svg" alt="close icon" id="close-modal"/><div class="modal__content__card">
            <div class="modal__content__card__image">
                <img
                    src="${image}"
                    alt="${title}"
                />
            </div>
            <div class="modal__content__card__info">
                <div class="modal__content__card__info__text">
                    <p>${username}</p>
                    <h3>${title}</h3>
                </div>
                <div class="modal__content__card__info__images">
                    <img src="${src}" class="fav__icon" onclick="addFavorite('${id}')"/>
                    <img
                        src="./assets/icon-download-hover.svg"
                        alt="icono de descarga"
                        class="download__icon"
                        data-id="${id}"
                        onclick="descargarGif('${gif.image},${gif.title}')"
                    />
                </div>
            </div>
        </div>`;

	modalContainer.insertAdjacentHTML('beforeend', template);
    modal.style.display = 'Flex';
	let button = document.getElementById('close-modal');
	button.addEventListener('click', () => {
		closeModal();
	});
};

const closeModal = () => {
    modal.style.display = 'none';
};