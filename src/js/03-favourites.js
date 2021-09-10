let favourites = [];

function listenToTheCards() {
	const listenedCards = document.querySelectorAll('.js-foundCard');

	for (const eachCard of listenedCards) {
		eachCard.addEventListener('click', handleFavCards);
	}
}

function handleFavCards(event) {
	const selectedCardId = parseInt(event.currentTarget.id);

	const clickedCard = series.find((card) => {
		return card.show.id === selectedCardId;
	});

	const alreadyExist = favourites.findIndex((index) => {
		return index.id === selectedCardId;
	});

	if (alreadyExist < 0) {
		favourites.push(clickedCard);
	} else {
		favourites.splice(alreadyExist, 1);
	}
	console.log(favourites);
}
