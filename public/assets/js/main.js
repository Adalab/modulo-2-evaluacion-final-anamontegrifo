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
			console.log(series);

			//función para imprimir los datos de la búsqueda
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
		console.log(card);
		let newCard = document.createElement('div');
		newCard.classList.add('found-list__card', 'favourite');
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
}

let favourites = [];

function listenToTheCards() {
	const listenedCards = document.querySelectorAll('.js-foundCard');

	for (const eachCard of listenedCards) {
		eachCard.addEventListener('click', handleFavCards);
	}
}

function handleFavCards(event) {
	const selectedCard = parseInt(event.currentTarget.id);

	console.log(selectedCard);

	// const clickedCard = series.find((item) => {
	// 	return item.id === selectedCard;
	// });

	// const alreadyExist = favourites.findIndex((index) => {
	// 	return index.id === selectedCard;
	// });

	// if (alreadyExist < 0) {
	// 	favourites.push(clickedCard);
	// } else {
	// 	favourites.splice(alreadyExist, 1);
	// }
}

'use strict';


//# sourceMappingURL=main.js.map
