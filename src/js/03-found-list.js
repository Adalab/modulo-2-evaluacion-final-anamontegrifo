//Función que usa un método "find" y nos devuelve true si el id del elemento es encontrado en el array "favourites".
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

//Función para añadir, con DOM Avanzado, la estructura y contenido en HTML del listado de series tras la búsqueda. Se ejecuta un bucle para que imprima cada uno de los elementos del array.
function addCards() {
	let favClass = '';
	listContainer.innerHTML = '';
	//Bucle para añadir contenido a la estructura de la sección de búsqueda.
	for (const card of series) {
		//Añadimos la clase correspondiente si el elemento está marcado como favorito o no
		const isFav = isFavourite(card);

		if (isFav) {
			favClass = 'favourite';
		} else {
			favClass = 'estandar';
		}
		//Añadimos la estructura del HTML por cada elemento que pasa por el bucle
		let newCard = document.createElement('div');
		newCard.classList.add('found-list__card', 'js-foundCard', `${favClass}`);
		newCard.id = card.show.id;
		let imageCard = document.createElement('img');

		//En el caso de que no haya imagen en el elemento del array, introducimos una imagen por defecto
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

		let scheduleCard = document.createElement('p');
		let scheduleContent = document.createTextNode(card.show.schedule.days);
		scheduleCard.appendChild(scheduleContent);

		newCard.appendChild(imageCard);
		listContainer.appendChild(newCard);
		newCard.appendChild(titleCard);
		listContainer.appendChild(newCard);
		newCard.appendChild(scheduleCard);
		listContainer.appendChild(newCard);
	}

	//Función que añade o saca las series "clickadas" del listado de favoritos
	listenToTheCards();
}

//Función listener sobre cada uno de los <div> de series que se generar en el bucle. Ejecuta la función para añadir o sacar del array de favoritos los elementos "clickados".
function listenToTheCards() {
	const listenedCards = document.querySelectorAll('.js-foundCard');
	for (const eachCard of listenedCards) {
		eachCard.addEventListener('click', handleFavCards);
	}
}
