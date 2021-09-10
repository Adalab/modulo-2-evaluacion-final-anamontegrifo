let favourites = [];

// Fav container element variable found
const favContainer = document.querySelector('.fav-list');

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
		favContainer.appendChild(newCard);
		newCard.appendChild(titleCard);
		favContainer.appendChild(newCard);
	}
	listenToTheCards();
}
