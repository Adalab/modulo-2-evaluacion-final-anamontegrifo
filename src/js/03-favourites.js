let favourites = [];

function listenToTheCards() {
	const listenedCards = document.querySelectorAll('.js-foundCard');

	for (const eachCard of listenedCards) {
		eachCard.addEventListener('click', handleFavCards);
	}
}

function handleFavCards(event) {
	const selectedCard = parseInt(event.currentTarget.id);

	console.log(typeof selectedCard);

	const clickedCard = series.find((item) => {
		return item.id === selectedCard;
	});

	const alreadyExist = favourites.findIndex((index) => {
		return index.id === selectedCard;
	});

	// if (alreadyExist < 0) {
	// 	favourites.push(clickedCard);
	// } else {
	// 	favourites.splice(alreadyExist, 1);
	// }
}
