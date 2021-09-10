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

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			for (const item of data) {
				series = item.show;
				console.log(series);
				//función para imprimir los datos de la búsqueda
				addCards();
			}
		});
}

btnSearch.addEventListener('click', getTheSearchResult);

'use strict';

// List container element variable found
const listContainer = document.querySelector('.found-list');

function addCards() {
	let newCard = document.createElement('div');
	newCard.classList.add('found-list__card');
	let imageCard = document.createElement('img');
	imageCard.src = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
	imageCard.setAttribute('class', 'found-list__image');
	let titleCard = document.createElement('h2');
	titleCard.setAttribute('class', 'found-list__title');
	let titleContent = document.createTextNode('Título');
	titleCard.appendChild(titleContent);
	newCard.appendChild(imageCard);
	listContainer.appendChild(newCard);
	newCard.appendChild(titleCard);
	listContainer.appendChild(newCard);
}

// const newItem = document.createElement('li');
// console.log(newItem); // Devuelve "<li></li>"

// // Ahora creamos algo de contenido
// const newContent = document.createTextNode('Item nuevo');

// // Y se lo añadimos a nuestro <li>
// newItem.appendChild(newContent);
// console.log(newItem); // Devuelve "<li>Item nuevo</li>"

'use strict';


//# sourceMappingURL=main.js.map
