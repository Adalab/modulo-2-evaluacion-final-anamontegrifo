'use strict';

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
