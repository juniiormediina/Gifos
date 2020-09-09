let misGifos_render = document.getElementById('misGifos_render');
let misGifos_empty = document.getElementById('misGifos_empty');

let misGifos_render_container = document.getElementById('misGifos_render_container');

function creaMisGifos (){
    if(localStorage.getItem('misGifos') == null){
        misGifos_empty.hidden=false;
        misGifos_render.hidden = true;
    }
    else{
        misGifos_empty.hidden=true;
        
        fetch(`https://api.giphy.com/v1/gifs?api_key=${Key_api}&ids=${localStorage.getItem('misGifos')}`).then((objetoMisGifos)=>{
        objetoMisGifos.json()
        .then((dataInfo)=>{
            console.log("data",dataInfo.data);
            misGifos_render_container.innerHTML='';
            for (let i = 0; i < dataInfo.data.length; i++) {
                createMisGifos(dataInfo.data[i]);
                allGifs.push(new Gif (dataInfo.data[i].images.downsized.url, dataInfo.data[i].images.downsized.url, dataInfo.data[i].id, dataInfo.data[i].title, dataInfo.data[i].username));
            }    
        })
    });  
}}

function createMisGifos(information){
    let divItem_gifos = document.createElement("div");
    divItem_gifos.classList.add('item-gifos');
    let img = document.createElement("img");
    img.src = getUrlImage(information);
    img.alt = getTitle(information);
    img.setAttribute("data-id", getId(information));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");
    let overlayDivGifos = document.createElement("div");
    overlayDivGifos.classList.add('overlay-gifos');
    let iconOverlayDiv = document.createElement("div");
    iconOverlayDiv.classList.add('icon-overlay-gifos');
    let imgDelGifos = document.createElement("img");
    imgDelGifos.src="./assets/icon-fav-hover.svg";
    imgDelGifos.id = "img-favorite";
    imgDelGifos.setAttribute("data-id", getId(information));
    imgDelGifos.setAttribute("onclick", "addFavorite('"+imgDelGifos.dataset.id+"')");
    let imgDownloadGifos = document.createElement("img");
    imgDownloadGifos.src = "./assets/icon-download.svg";
    imgDownloadGifos.setAttribute("data-image", getUrlImage(information));
    imgDownloadGifos.setAttribute("data-title", getTitle(information));
    imgDownloadGifos.addEventListener('click', ()=> descargarGif(imgDownloadGifos.dataset.image , imgDownloadGifos.dataset.title));
    let imgMaxGifos = document.createElement("img");
    imgMaxGifos.src = "./assets/icon-max.svg";
    imgMaxGifos.setAttribute("data-id", getId(information));
    imgMaxGifos.setAttribute("onclick", "searchGif('"+imgMaxGifos.dataset.id+"')");
    let divTextGifos = document.createElement("div");
    divTextGifos.classList.add('text-overlay-gifos');
    let userPGifos = document.createElement('p');
    userPGifos.textContent = getGifUser(information);
    let h2TitleGifos = document.createElement("h2");
    h2TitleGifos.textContent= getTitle(information);
    divItem_gifos.appendChild(img);
    divItem_gifos.appendChild(overlayDivGifos);
    overlayDivGifos.appendChild(iconOverlayDiv);
    iconOverlayDiv.appendChild(imgDelGifos);
    iconOverlayDiv.appendChild(imgDownloadGifos);
    iconOverlayDiv.appendChild(imgMaxGifos);
    overlayDivGifos.appendChild(divTextGifos);
    divTextGifos.appendChild(userPGifos);
    divTextGifos.appendChild(h2TitleGifos);
    let misGifos_render = document.querySelector('.misGifos_render_container');
    misGifos_render.appendChild(divItem_gifos);
    misGifos_render.insertAdjacentElement('beforeend', divItem_gifos);

}