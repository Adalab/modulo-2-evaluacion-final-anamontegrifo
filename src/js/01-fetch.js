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
			for (const item of data) {
				series = item.show;
				// console.log(series);
				// console.log(series.name);

				//función para imprimir los datos de la búsqueda
				addCards();
			}
		});
}

btnSearch.addEventListener('click', getTheSearchResult);
