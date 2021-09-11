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

function deleteFavIcons(event) {
	const selectedIconId = parseInt(event.currentTarget.id);
	const clickedIcon = favourites.find((card) => {
		return card.show.id === selectedIconId;
	});

	const alreadyExist = favourites.findIndex((index) => {
		return index.show.id === selectedIconId;
	});

	if (alreadyExist !== -1) {
		favourites.splice(alreadyExist, 1);
	}
	setLS();
	AddContentFavCards();
	addCards();
}

//Add content to favourites section
function AddContentFavCards() {
	favSection.innerHTML = '';

	let newList = document.createElement('ul');
	newList.classList.add('fav__menu', 'fav-list', 'js-favlist');

	let newDiv = document.createElement('div');
	newDiv.classList.add('fav-header');

	let newH = document.createElement('h2');
	newH.classList.add('fav__headline');
	let hContent = document.createTextNode('Tus series favoritas');
	newH.appendChild(hContent);

	let newButton = document.createElement('input');
	newButton.type = 'button';
	newButton.value = 'Reset';
	newButton.classList.add('fav__reset', 'js-reset');

	newDiv.appendChild(newH);
	newDiv.appendChild(newButton);
	newList.appendChild(newDiv);

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

		let iconCard = document.createElement('i');
		iconCard.setAttribute('class', 'fas fa-times-circle js-icon');
		iconCard.id = card.show.id;
		newCard.appendChild(imageCard);
		newCard.appendChild(titleCard);
		newCard.appendChild(iconCard);

		newList.appendChild(newCard);
		favSection.appendChild(newList);

		//Listener del reset
		const resetBtn = document.querySelector('.js-reset');
		resetBtn.addEventListener('click', reset);

		//Listener de borrar favoritos en los iconos
		const favIcons = document.querySelectorAll('.js-icon');
		for (const icon of favIcons) {
			icon.addEventListener('click', deleteFavIcons);
		}
	}

	listenToTheCards();
}
