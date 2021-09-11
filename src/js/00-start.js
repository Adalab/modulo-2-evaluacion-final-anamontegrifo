'use strict';

//variables that get html elements
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listContainer = document.querySelector('.found-list');
const favContainer = document.querySelector('.js-favlist');
const favSection = document.querySelector('.js-fav');
const resetBtn = document.querySelector('.js-reset');

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
