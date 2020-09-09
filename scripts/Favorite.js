let favorites = document.getElementById('favorite');
let favoritesResults = document.getElementById('favorite-results');
let noResultsFavContainer = document.getElementById('description-empty-favorite-section');
let favoritesLimit = 100;

var allGifs = [];

class Gif {
	constructor(image, preview, id, title, username){
		this.id = id;
		this.image = image;
		this.preview = preview;
		this.title = title;
		this.username = username;
		this.favorite = false;
	}
	addGifs(){
		allGifs.push(this);
	}
	removeFavorite(){
		this.favorite = false;
	}
	addFavorite(){
		this.favorite = true;
	}
}

/* Se agregan a favorito */
const addFavorite = (id) => {
	console.log('el evento a la escucha funciona');
	let button = event.target;
	
	button.src = './assets/icon-fav-active.svg';
	button.style.padding = '6px';
	
	let filter = allGifs.filter((gifos) => {
		return gifos.id === id;
	});

	if(filter[0].favorite === true){
		button.src="./assets/icon-fav-hover.svg";
		button.style.padding = '0px';
		removeFavorite(id);
	} else{
		filter[0].addFavorite();
	}
	renderFavorites();

	let favoriteSection = document.getElementById('favorite-results');
	let emptySection = document.querySelector('.description-empty-favorite-section');
	if(favoriteSection != ''){
		emptySection.style.display = 'none';
	}
};

/* Se pinta informacion */
const renderFavorites = () => {
	favoritesResults.innerHTML = '';
	let favorites = allGifs.filter((gif) => {
		return gif.favorite === true;
	});
	favorites.forEach((gif, i) => {
		const { preview, id } = gif;
		if (i < favoritesLimit){
			let template = `
			<div  class="item-favorite" >
                <img src="${preview}" alt="" onclick="searchGif('${id}')">
                <div class="overlay-favorite">
                    <div class="icon-overlay-favorite">
                	    <img src="./assets/icon-trash-hover.svg" alt="" onclick="removeFavorite('${id}')">
                    	<img src="./assets/icon-download-hover.svg" alt="" onclick="descargarGif('${gif.image},${gif.title}')">
                    	<img src="./assets/icon-max-hover.svg" alt="" onclick="searchGif('${id}')">
                    </div>
                	<div class="text-overlay-favorite">
                		<p>${gif.username}</p>
                   		<h2>${gif.title}</h2>
                	</div>
				</div>
            </div>`;
			favoritesResults.insertAdjacentHTML('beforeend', template);
		}
	});
}

/* Se eliminan de favorito */
const removeFavorite = (id) => {
	let filter = allGifs.filter((gif, i) => {
		return gif.id === id;
	});
	filter[0].removeFavorite();
	renderFavorites();
}

/* Funcion para descargar los Gif */
async function descargarGif(url, nombre){
	await fetch(url).then((img) => {
		img.blob().then((file) => {
			let a = document.createElement("a");
			a.href = URL.createObjectURL(file);
			a.download = nombre;
			a.click();
		});
	});
}