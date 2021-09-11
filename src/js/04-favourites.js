//Add cards to favourites array
function handleFavCards(event) {
	const selectedCardId = parseInt(event.currentTarget.id);
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

	setLS();

	AddContentFavCards();

	addCards();
}

//Add content to favourites section
function AddContentFavCards() {
	favContainer.innerHTML = '';

	for (const card of favourites) {
		let newCard = document.createElement('li');
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
		newCard.appendChild(titleCard);
		favContainer.appendChild(newCard);
	}

	listenToTheCards();
}

// function reset() {
// 	console.log(favContainer.innerHTML);
// 	if (favContainer.innerHTML !== '') {
// 	}
// }
// resetBtn.addEventListener('click', reset);
