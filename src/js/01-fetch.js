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

	// listContainer.innerHTML = '';
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			series = data;

			//function to print the search data
			addCards();
		});
}

btnSearch.addEventListener('click', getTheSearchResult);
