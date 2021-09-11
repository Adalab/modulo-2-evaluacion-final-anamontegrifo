'use strict';

//variables that get html elements
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listContainer = document.querySelector('.found-list');
const favContainer = document.querySelector('.js-favlist');
const favSection = document.querySelector('.js-fav');

//Default image
const defaultImage =
	'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

//variables to save arrays
let series = [];
let favourites = [];

//retrieve saved data
if (localStorage.getItem('favourites') !== null) {
	getLS();
}

//Prevent default execution of the form
function preventDefault(event) {
	event.preventDefault();
}
form.addEventListener('submit', preventDefault);

//Complete the url with the word searched
function completeUrl() {
	let itemSearch = inputSearch.value;
	let url = `//api.tvmaze.com/search/shows?q=${itemSearch}`;
	return url;
}

//Function to save the search result
function getTheSearchResult() {
	let url = completeUrl();

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			series = data;

			//function to print the search data
			addCards();
		});
}

btnSearch.addEventListener('click', getTheSearchResult);

function isFavourite(card) {
	const favFound = favourites.find((fav) => {
		return fav.show.id === card.show.id;
	});
	if (favFound === undefined) {
		return false;
	} else {
		return true;
	}
}

function addCards() {
	let favClass = '';
	listContainer.innerHTML = '';

	for (const card of series) {
		const isFav = isFavourite(card);

		if (isFav) {
			favClass = 'favourite';
		} else {
			favClass = 'estandar';
		}
		let newCard = document.createElement('div');
		newCard.classList.add('found-list__card', 'js-foundCard', `${favClass}`);
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

	setLS();
	AddContentFavCards();
	addCards();
}

function deleteFavIcons(event) {
	const selectedIconId = parseInt(event.currentTarget.id);
	const clickedIcon = favourites.find((card) => {
		return card.show.id === selectedIconId;
	});

	const alreadyExist = favourites.findIndex((index) => {
		return index.show.id === selectedIconId;
	});

	if (alreadyExist !== -1) {
		favourites.splice(alreadyExist, 1);
	}
	setLS();
	AddContentFavCards();
	addCards();
}

//Add content to favourites section
function AddContentFavCards() {
	favSection.innerHTML = '';

	let newList = document.createElement('ul');
	newList.classList.add('fav__menu', 'fav-list', 'js-favlist');

	let newDiv = document.createElement('div');
	newDiv.classList.add('fav-header');

	let newH = document.createElement('h2');
	newH.classList.add('fav__headline');
	let hContent = document.createTextNode('Tus series favoritas');
	newH.appendChild(hContent);

	let newButton = document.createElement('input');
	newButton.type = 'button';
	newButton.value = 'Reset';
	newButton.classList.add('fav__reset', 'js-reset');

	newDiv.appendChild(newH);
	newDiv.appendChild(newButton);
	newList.appendChild(newDiv);

	for (const card of favourites) {
		let newCard = document.createElement('li');
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

		let iconCard = document.createElement('i');
		iconCard.setAttribute('class', 'fas fa-times-circle js-icon');
		iconCard.id = card.show.id;
		newCard.appendChild(imageCard);
		newCard.appendChild(titleCard);
		newCard.appendChild(iconCard);

		newList.appendChild(newCard);
		favSection.appendChild(newList);

		//Listener del reset
		const resetBtn = document.querySelector('.js-reset');
		resetBtn.addEventListener('click', reset);

		//Listener de borrar favoritos en los iconos
		const favIcons = document.querySelectorAll('.js-icon');
		for (const icon of favIcons) {
			icon.addEventListener('click', deleteFavIcons);
		}
	}

	listenToTheCards();
}

function setLS() {
	localStorage.setItem('favourites', JSON.stringify(favourites));
}

function getLS() {
	favourites = JSON.parse(localStorage.getItem('favourites'));
	AddContentFavCards();
	addCards();
}

//Reset favourites

function reset() {
	favourites = [];
	favSection.innerHTML = '';
	setLS();
	addCards();
	localStorage.clear();
}


//# sourceMappingURL=main.js.map
