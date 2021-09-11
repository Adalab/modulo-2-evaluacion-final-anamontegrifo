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
