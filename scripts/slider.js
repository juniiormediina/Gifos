let slick;

let trending = () => {
    let urlTrending = `https://api.giphy.com/v1/gifs/trending?api_key=${Key_api}&limit=25`
    fetch(urlTrending).then((trendGif) => {
        trendGif.json().then((trendGif) => {

            trendGif.data.forEach((gif) =>{
                createTrending(gif);
                allGifs.push(new Gif (gif.images.downsized.url, gif.images.preview_gif.url, gif.id, gif.title, gif.username));
            });
            slick = document.querySelectorAll('.slick');  
        });
    });    
}

    
let createTrending = (gifs) => {
    let slickDiv = document.createElement("div");
    slickDiv.classList.add('slick');
    
    let div = document.createElement("div");
    
    let a = document.createElement("a");
    
    let picture = document.createElement("picture");
    
    let img = document.createElement("img");
    img.src = getUrlImage(gifs);
    img.alt = getTitle(gifs);
    img.setAttribute("data-id", getId(gifs));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");
    
    let divOverlaySlider = document.createElement('div');
    divOverlaySlider.classList.add('overlay-slider');

    let divIconOvaerlaySlider = document.createElement("div");
    divIconOvaerlaySlider.classList.add('icon-overlay-slider');

    let favorite = document.createElement("img");
    favorite.src="./assets/icon-fav-hover.svg";
    favorite.id = "img-favorite";
    favorite.setAttribute("data-id", getId(gifs));
    favorite.setAttribute("onclick", "addFavorite('"+favorite.dataset.id+"')");
    
    let download = document.createElement("img");
    download.src = "./assets/icon-download.svg";
    download.setAttribute("data-image", getUrlImage(gifs));
    download.setAttribute("data-title", getTitle(gifs));
    download.addEventListener('click', ()=> descargarGif(download.dataset.image , download.dataset.title));

    let max = document.createElement("img");
    max.src = "./assets/icon-max.svg";
    max.setAttribute("data-id", getId(gifs));
    max.setAttribute("onclick", "searchGif('"+max.dataset.id+"')");

    let divTextOverlaySlider = document.createElement("div");
    divTextOverlaySlider.classList.add('text-overlay-slider');

    let p = document.createElement("p");
    p.classList.add('overlayP');
    p.textContent = getGifUser(gifs);

    let h2 = document.createElement("h2");
    h2.classList.add('overlayH2');
    h2.textContent= getTitle(gifs);








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
    slickDiv.appendChild(div);
    let trendingSection = document.querySelector('#track');
    trendingSection.insertAdjacentElement('beforeend', slickDiv);
}
    
trending();

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