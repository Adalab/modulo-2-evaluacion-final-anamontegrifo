'use strict';

//Search variables
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');

//variable to save the array
let series = [];

//Complete the url with the word searched
function completeUrl() {
	let itemSearch = inputSearch.value;
	let url = `//api.tvmaze.com/search/shows?q=${itemSearch}`;
	return url;
}

//Function to save the search result
function getTheSearchResult() {
	let url = completeUrl();

	listContainer.innerHTML = '';
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			series = data;

			//function to print the search data
			addCards();
		});
}

btnSearch.addEventListener('click', getTheSearchResult);

// List container element variable found
const listContainer = document.querySelector('.found-list');
const defaultImage =
	'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

function addCards() {
	for (const card of series) {
		let newCard = document.createElement('div');
		newCard.classList.add('found-list__card', 'js-foundCard');
		newCard.id = card.show.id;
		let imageCard = document.createElement('img');

		if (card.show.image === null) {
			imageCard.src =
				'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
		} else {
			imageCard.src = card.show.image.medium;
		}
		imageCard.setAttribute('class', 'found-list__image');
		let titleCard = document.createElement('h2');
		titleCard.setAttribute('class', 'found-list__title');
		let titleContent = document.createTextNode(card.show.name);
		titleCard.appendChild(titleContent);
		newCard.appendChild(imageCard);
		listContainer.appendChild(newCard);
		newCard.appendChild(titleCard);
		listContainer.appendChild(newCard);
	}
	listenToTheCards();
}

let favourites = [];

// Fav elements variable found
const favContainer = document.querySelector('.fav-list');
const favSection = document.querySelector('.js-fav');
const resetBtn = document.querySelector('.js-reset');

//Listener function
function listenToTheCards() {
	const listenedCards = document.querySelectorAll('.js-foundCard');
	for (const eachCard of listenedCards) {
		eachCard.addEventListener('click', handleFavCards);
	}
}

//Add cards to favourites array
function handleFavCards(event) {
	const selectedCardId = parseInt(event.currentTarget.id);
	console.log(selectedCardId);
	const clickedCard = series.find((card) => {
		return card.show.id === selectedCardId;
	});

	const alreadyExist = favourites.findIndex((index) => {
		return index.show.id === selectedCardId;
	});

	if (alreadyExist === -1) {
		favourites.push(clickedCard);
	} else {
		favourites.splice(alreadyExist, 1);
	}
	AddContentFavCards();
	console.log(favourites);
}

//Add content to favourites section
function AddContentFavCards() {
	favContainer.innerHTML = '';

	for (const card of favourites) {
		let newCard = document.createElement('div');
		newCard.classList.add('fav-list__card', 'js-favCard');
		newCard.id = card.show.id;

		let imageCard = document.createElement('img');
		if (card.show.image === null) {
			imageCard.src =
				'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
		} else {
			imageCard.src = card.show.image.medium;
		}
		imageCard.setAttribute('class', 'fav-list__image');

		let titleCard = document.createElement('h2');
		titleCard.setAttribute('class', 'fav-list__title');
		let titleContent = document.createTextNode(card.show.name);
		titleCard.appendChild(titleContent);

		newCard.appendChild(imageCard);
		newCard.appendChild(titleCard);
		favContainer.appendChild(newCard);
	}

	listenToTheCards();
}

function reset() {
	favourites = [];
	favSection.innerHTML = '';
}

resetBtn.addEventListener('click', reset);

'use strict';


//# sourceMappingURL=main.js.map
