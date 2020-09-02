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
//TODO: importante falta hacer que se agregue la barra de busqueda en el header al hacer scroll
function scrollFunction(){
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                /* document.getElementById("navbar").style.background = "white"; */
        } else {
                /* document.getElementById("navbar").style.top = "-50px"; */
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

        changeStyle() {
                event.preventDefault();
                let hasClass = this.body[0].classList.toggle('dark');
                if(hasClass){
                        event.currentTarget.innerHTML = 'MODO DIURNO';
                } else {
                        event.currentTarget.innerHTML = 'MODO NOCTURNO';
                }
        }
}

/* Funcion del Search */
const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";

async function getGifByTitle(title) {
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${Key_api}&q=${title}&limit=12&offset=0&rating=g&lang=en`;
        let response = await fetch(url);
        let gifData = await response.json();
        return gifData;
}

let input = document.getElementById('gifTitle');
let results = document.getElementById('results');
let btnSearch = document.getElementById('search');

btnSearch.addEventListener('click', ()=>{
        document.querySelector('.search-title').innerHTML= input.value;
        document.querySelector('#results').innerHTML='';
        search();
});

input.addEventListener('keyup', (event) => { // verificar si podemos quitar el event
    document.querySelector('#results').innerHTML='';
    if(event.keyCode === 13){
        document.querySelector('.search-title').innerHTML= input.value;
        search();
    }
});

let search = () => {
    let gifTitle = input.value;

    if(gifTitle === ''){
            alert('Ingrese el nombre de un GIF para buscar');
    } else{
        getGifByTitle(gifTitle).then((gifData) => {
            console.log(gifData);

            gifData.data.forEach(gif => {
                renderHTMLsearch(gif);
            });
                    
        });
    }
}

let getImage = (urlImage) => {
    if(urlImage.images.preview_webp.url === ''){
        return urlImage.images.preview_gif.url
    } else{
        return urlImage.images.preview_webp.url;
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
        return id.id
}

let renderHTMLsearch = (gifInfo) => {
    let divItem = document.createElement('div');
    divItem.classList.add('item');
        
    let img = document.createElement('img');
    img.src = getImage(gifInfo);
    img.alt = getTitle(gifInfo);
        
    let divOverlay = document.createElement('div');
    divOverlay.classList.add('overlay');
        
    let divIconOverlay = document.createElement('div');
    divIconOverlay.classList.add('icon-overlay');
        
    let img1 = document.createElement('img');
    img1.src = "./assets/icon-fav-hover.svg";
    img1.alt = "Favoritos";
    img1.id = "img-favorite";
    img1.setAttribute("data-id", getId(gifInfo));
    img1.setAttribute("onclick", "addFavorite('"+img1.dataset.id+"')");
    
    let img2 = document.createElement('img');
    img2.src = "./assets/icon-download.svg";
    img2.alt = "download";
    
    let img3 = document.createElement('img');
    img3.src = "./assets/icon-max.svg";
    img3.alt = "max";
        
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
/* Tags */
let getTrendingTags = () => {
        let tags = `https://api.giphy.com/v1/trending/searches?api_key=${Key_api}&limit=5`;
        let trendingSection = document.querySelector('.trending-container');
        fetch(tags).then((tagInfomation) => {
            tagInfomation.json().then((tagInfomation) => {
    
                trendingSection.innerHTML = `
                <h2>Trending</h2>
                <div>
                    <p>${tagInfomation.data[0]},</p><p>${tagInfomation.data[1]},</p>
                    <p>${tagInfomation.data[2]},</p><p>${tagInfomation.data[3]},</p>
                    <p>${tagInfomation.data[4]},</p>
                </div>
                `;
            });
        });
    }
    
    getTrendingTags();


/* slider */
let slick;

let getTrendingSlider = () => {

    let slider = `https://api.giphy.com/v1/gifs/trending?api_key=${Key_api}&limit=30&rating=g`;

    fetch(slider).then((trendingSlider) => {
        trendingSlider.json().then((trendingSlider) => {
            trendingSlider.data.forEach((gifos) => {
                renderHTMLslider(gifos);
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

    let divOverlaySlider = document.createElement('div');
    divOverlaySlider.classList.add('overlay-slider');

    let divIconOvaerlaySlider = document.createElement("div");
    divIconOvaerlaySlider.classList.add('icon-overlay-slider');

    let favorite = document.createElement("img");
    favorite.src="./assets/icon-fav-hover.svg";
    // favorite.id = "img-favorite";
    favorite.setAttribute("data-id", getId(gif));
    favorite.setAttribute("onclick", "addFavorite('"+favorite.dataset.id+"')");
    
    let download = document.createElement("img");
    download.src = "./assets/icon-download.svg";

    let max = document.createElement("img");
    max.src = "./assets/icon-max.svg";

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