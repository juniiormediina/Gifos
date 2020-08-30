/* Conectar con API */
//TODO: terminar de imprimir la informacion en la seccion correspondiente
/* const Key_api = "NsM8Ow50lm4v9vROy1nC0lVGfP6rf8Ie";

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
        search();
});

let search = () => {
        
        let gifTitle = input.value;

        if(gifTitle === ''){
                alert('Ingrese un nombre de un GIF para buscar');
        } else{
                getGifByTitle(gifTitle).then((gifData) => {
                        console.log(gifData);
                        
                        for(let i =0; i<gifData; i++){
                                let gifInfo = gifData[i];
                                

                                results.insertAdjacentHTML('beforeend',
                                        `
                                        <div  class="item">
                                                <img src="${gifInfo.url}" alt="">
                                                <div class="overlay">
                                                        <div class="icon-overlay">
                                                                <img src="./assets/icon-fav-hover.svg" alt="">
                                                                <img src="./assets/icon-download.svg" alt="">
                                                                <img src="./assets/icon-max.svg" alt="">
                                                        </div>
                                                        <div class="text-overlay">
                                                                <p>User</p>
                                                                <h2>Título GIFO</h2>
                                                        </div>
                                                </div>
                                        </div>
                                        `); */

/* ---------------------------------------------------------------------------------------------------- */

                                /* 
                                let divItem = document.createElement('div');
                                divItem.classList.add('item');
        
                                        let img = document.createElement('img');
                                        img.src = gifInfo.images;
        
                                        let divOverlay = document.createElement('div');
                                        divOverlay.classList.add('overlay');
        
                                                let divIconOverlay = document.createElement('div');
                                                divIconOverlay.classList.add('icon-overlay');
        
                                                        let img1 = document.createElement('img');
                                                        img1.src = "./assets/icon-fav-hover.svg";
                                                        img1.alt = "Favoritos";
                                                        
                                                        let img2 = document.createElement('img');
                                                        img2.src = "./assets/icon-download.svg";
                                                        img2.alt = "download";
                                                        
                                                        let img3 = document.createElement('img');
                                                        img3.src = "./assets/icon-max.svg";
                                                        img3.alt = "max";
        
                                                let divTextOverlay = document.createElement('div');
                                                divTextOverlay.classList.add('text-overlay');
        
                                                        let p = document.createElement('p');
                                                        h2.textContent = gifInfo.username;
        
                                                        let h2 = document.createElement('h2');
                                                        h2.textContent = gifInfo.title;
        
                                divItem.appendChild(img);
                                divItem.appendChild(divOverlay);
                                        divOverlay.appendChild(divIconOverlay);
                                                divOverlay.appendChild(img1);
                                                divOverlay.appendChild(img2);
                                                divOverlay.appendChild(img3);
                                        divOverlay.appendChild(divTextOverlay);
                                                divTextOverlay.appendChild(p);
                                                divTextOverlay.appendChild(h2);
        
                                results.appendChild(divItem); */
                        /* }

                });
        }
} */

console.log('estoy funcionando');

btnSearch.addEventListener('click', () => {
    sendApiRequest();
});

function sendApiRequest(){
    var userInput = document.getElementById('gifTitle').value;
    console.log(userInput);
}