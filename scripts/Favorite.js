let favorites = document.getElementById('favorite');
let favoritesResults = document.getElementById('favorite-results');
this.noResultsFavContainer = document.getElementById('description-empty-favorite-section');
let favoritesLimit = 100;

var allGifs = [];
console.log(allGifs);

class Gif {
	constructor(image, preview, id, title, username) {
		this.id = id;
		this.image = image;
		this.preview = preview;
		this.title = title;
		this.username = username;
		this.favorite = false;
		// this.addGifs();
	}
	addGifs() {
		allGifs.push(this);
	}
	removeFavorite() {
		this.favorite = false;
	}
	addFavorite() {
		this.favorite = true;
	}
}
console.log(addFavorite(id));

const addFavorite = (id) => {
	console.log('el evento a la escucha funciona');
	let button = event.target;
	//let atribute = button.getAttribute('src');

	button.src = './assets/icon-fav-active.svg';
	button.style.padding = '6px';

	let filter = allGifs.filter((gifos) => {
		return gifos.id === id;
	});
	filter[0].addFavorite();
	renderFavorites();
};

const renderFavorites = () => {
	favoritesResults.innerHTML = '';
	let favorites = allGifs.filter((gif) => {
		return gif.favorite === true;
	});
	favorites.forEach((gif, i) => {
		const { preview, id } = gif;
		if (i < favoritesLimit) {
			let template = `
			<div  class="item-favorite" >
                <img src="${preview}" alt="">
                <div class="overlay-favorite">
                    <div class="icon-overlay-favorite">
                	    <img src="./assets/icon-trash-hover.svg" alt="" onclick="removeFavorite('${id}')">
                    	<img src="./assets/icon-download-hover.svg" alt="">
                    	<img src="./assets/icon-max-hover.svg" alt="">
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

	if (favorites.length >= 8) {
		favoriteButton.classList.add('show');
	}
	hasFavorites();
};

const removeFavorite = (id) => {
	let filter = allGifs.filter((gif, i) => {
		return gif.id === id;
	});
	filter[0].removeFavorite();
	renderFavorites();
};