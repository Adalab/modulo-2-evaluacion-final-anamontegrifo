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
