//`https://media.giphy.com/media/${}/source.gif`
let misGifos_render = document.getElementById('misGifos_render');
let misGifos_empty = document.getElementById('misGifos_empty');
let arrayIdsMisGifos = localStorage.getItem('misGifos') == null?[]:localStorage.getItem('misGifos').split(',');
let idsMisGifos = arrayIdsMisGifos.join();
// api_key=IkuYt6UrCtsIzd7Oj3xL7o32GrO1B6Ud

if(arrayIdsMisGifos == []){
    misGifos_empty.hidden=false;
    misGifos_render.hidden = true;
    alert('entro al condicional');
}
//xT4uQulxzV39haRFjG, 3og0IPxMM0erATueVW
else{
    misGifos_empty.hidden=true;
    fetch(`https://api.giphy.com/v1/gifs?api_key=${Key_api}&ids=${idsMisGifos}`).then((objetoMisGifos)=>{
        objetoMisGifos.json()
        .then((dataInfo)=>{
            console.log(dataInfo.data);
            // console.log(data);
            for (let i = 0; i < dataInfo.data.length; i++) {
                createMisGifos(dataInfo.data[i]);
                //dataInfo.data.favorite = false;
                //allGifs.push(new Gif (dataInfo.data.images.downsized.url, dataInfo.data.images.downsized.url, dataInfo.data.id, dataInfo.data.title, dataInfo.data.username));
            }    
        })
    });  
}
function createMisGifos(information){
    let divItemGifos = document.createElement("div");
    divItemGifos.classList.add('item-gifos');
    let img = document.createElement("img");
    img.src = getImage(information);
    img.alt = getTitle(information);
    img.setAttribute("data-id", getId(information));
    img.setAttribute("onclick", "searchGif('"+img.dataset.id+"')");
    let overlayDivGifos = document.createElement("div");
    overlayDivGifos.classList.add('overlay-gifos');
    let iconOverlayDiv = document.createElement("div");
    iconOverlayDiv.classList.add('icon-overlay-gifos');
    let imgTrashGifos = document.createElement("img");
    imgTrashGifos.src="./assets/icon_trash.svg";
    // imgTrashGifos.id = "img-favorite"; //verificar si esta linea funciona realmente
    imgTrashGifos.setAttribute("data-id", getId(information));
    imgTrashGifos.setAttribute("onclick", "removeFavorite('"+imgTrashGifos.dataset.id+"')");
    let imgDownloadGifos = document.createElement("img");
    imgDownloadGifos.src = "./assets/icon-download.svg";
    imgDownloadGifos.setAttribute("data-image", getImage(information));
    imgDownloadGifos.setAttribute("data-title", getTitle(information));
    imgDownloadGifos.addEventListener('click', ()=> descargarGif(imgDownloadGifos.dataset.image , imgDownloadGifos.dataset.title));
    let imgMaxGifos = document.createElement("img");
    imgMaxGifos.src = "./assets/icon-max.svg";
    imgMaxGifos.setAttribute("data-id", getId(information));
    imgMaxGifos.setAttribute("onclick", "searchGif('"+imgMaxGifos.dataset.id+"')");
    /* let divTextGifos = document.createElement("div");
    divTextGifos.classList.add('text-overlay-gifos');
    let userPGifos = document.createElement('p');
    userPGifos.textContent = getUserName(information);
    let h2TitleGifos = document.createElement("h2");
    h2TitleGifos.textContent= getTitle(information); */
    divItemGifos.appendChild(img);
    divItemGifos.appendChild(overlayDivGifos);
    overlayDivGifos.appendChild(iconOverlayDiv);
    iconOverlayDiv.appendChild(imgTrashGifos);
    iconOverlayDiv.appendChild(imgDownloadGifos);
    iconOverlayDiv.appendChild(imgMaxGifos);
    /* overlayDivGifos.appendChild(divTextGifos);
    divTextGifos.appendChild(userPGifos);
    divTextGifos.appendChild(h2TitleGifos); */
    let misGifos_render = document.querySelector('.misGifos_render_container');
    misGifos_render.appendChild(divItemGifos);
    misGifos_render.insertAdjacentElement('beforeend', divItemGifos);

}


//`https://media.giphy.com/media/${}/source.gif` //link para solo mostrar la imagen del gif