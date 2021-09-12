//Función para añadir o sacar del array de favoritos los elementos "clickados". La llamamos desde un listener en un bucle que afecta a cada una de las tarjetas de series.
function handleFavCards(event) {
	//Función que nos devuelve el primer elemento (objeto) del array series que coincide con el id del elemento "clickado".
	const selectedCardId = parseInt(event.currentTarget.id);
	const clickedCard = series.find((card) => {
		return card.show.id === selectedCardId;
	});

	//Función con la que detectamos si el elemento "clickado" ya está incluido en el array de favoritos a través de su posición en el array y los añadimos o sacamos.
	const alreadyExist = favourites.findIndex((index) => {
		return index.show.id === selectedCardId;
	});

	if (alreadyExist === -1) {
		favourites.push(clickedCard);
	} else {
		favourites.splice(alreadyExist, 1);
	}
	//Guardamos en local los datos del array de favoritos
	setLS();
	//Añadimos la estructura y contenido en HTML de la sección de series
	addCards();
	//Añadimos la estructura y contenido en HTML de la sección de favoritos
	AddContentFavCards();
}

//Función para borrar del array de favoritos desde los iconos "x"
function deleteFavIcons(event) {
	//Función que nos devuelve el primer elemento (objeto) del array "favourites" que coincide con el id del icono "x" "clickado".
	const selectedIconId = parseInt(event.currentTarget.id);
	const clickedIcon = favourites.find((card) => {
		return card.show.id === selectedIconId;
	});

	//Función con la que detectamos si el icono "x" "clickado" ya está incluido en el array de favoritos y lo sacamos.
	const alreadyExist = favourites.findIndex((index) => {
		return index.show.id === selectedIconId;
	});

	if (alreadyExist !== -1) {
		favourites.splice(alreadyExist, 1);
	}

	//Guardamos en local los datos del array de favoritos
	setLS();
	//Añadimos la estructura y contenido en HTML de la sección de series
	addCards();
	//Añadimos la estructura y contenido en HTML de la sección de favoritos
	AddContentFavCards();
}

//Función con la que añadimos la estructura y contenido en HTML de la sección de favoritos
function AddContentFavCards() {
	favSection.innerHTML = '';

	//Añadimos la estructura y cabecera
	let newList = document.createElement('ul');
	newList.classList.add('fav__menu', 'fav-list', 'js-favlist');

	let newDiv = document.createElement('div');
	newDiv.classList.add('fav__header');

	let newH = document.createElement('h2');
	newH.classList.add('fav__headline');
	let hContent = document.createTextNode('Tus series favoritas');
	newH.appendChild(hContent);

	let newButton = document.createElement('button');
	newButton.classList.add('fav__reset', 'js-reset');
	let buttonContent = document.createTextNode('Reset');
	newButton.appendChild(buttonContent);

	newDiv.appendChild(newH);
	newDiv.appendChild(newButton);
	newList.appendChild(newDiv);

	//Añadimos el contenido de cada uno de los elementos en HTML que entran en el bucle
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
		iconCard.setAttribute(
			'class',
			'fas fa-times-circle fav-list__icon js-icon'
		);
		iconCard.id = card.show.id;
		newCard.appendChild(imageCard);
		newCard.appendChild(titleCard);
		newCard.appendChild(iconCard);

		newList.appendChild(newCard);
		favSection.appendChild(newList);

		//Listener del reset, porque el elemento botón reset se ha creado dentro de esta función
		const resetBtn = document.querySelector('.js-reset');
		resetBtn.addEventListener('click', reset);

		//Listener de borrar favoritos en los iconos, porque los iconos también se han generado dentro de esta función.
		const favIcons = document.querySelectorAll('.js-icon');
		for (const icon of favIcons) {
			icon.addEventListener('click', deleteFavIcons);
		}
	}
	//Llamamos a la función que añade o saca las series "clickadas" del listado de favoritos
	listenToTheCards();
}
