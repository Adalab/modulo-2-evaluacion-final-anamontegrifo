'use strict';

//Variables para hacer referencia a elementos de HTML
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.js-inputSearch');
const btnSearch = document.querySelector('.js-btnSearch');
const listContainer = document.querySelector('.found-list');
const favContainer = document.querySelector('.js-favlist');
const favSection = document.querySelector('.js-fav');

//Imagen por defecto
const defaultImage =
	'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

//Variables para guardar los arrays
let series = [];
let favourites = [];

// Función para comprobar de inicio si tenemos información de los favoritos en local y recuperarla.
getLS();

//Función para evitar que el formulario se ejecute
function preventDefault(event) {
	event.preventDefault();
}
form.addEventListener('submit', preventDefault);

//Función para completar la url con la búsqueda en el campo input.
function completeUrl() {
	let itemSearch = inputSearch.value;
	let url = `//api.tvmaze.com/search/shows?q=${itemSearch}`;
	return url;
}

//Función que engloba la consulta en la API, el guardado de resultado en el array "series" y el pintado en pantalla del resultado.
function handleGetSearchResult() {
	let url = completeUrl();

	//Función fetch para hacer la petición de información a la API sobre la búsqueda deseada (url) y guardar los datos devueltos en el array "series".
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			series = data;

			///Función para añadir, con DOM Avanzado, la estructura y contenido en HTML del listado de series tras la búsqueda.
			addCards();
			setLS();
		});
}

//Listener sobre el botón "Buscar", que ejecuta la función anterior.
btnSearch.addEventListener('click', handleGetSearchResult);

//Función que usa un método "find" y nos devuelve true o false si el id del elemento es encontrado en el array "favourites".
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

		//En el caso de que no haya imagen en el array, introducimos una imagen por defecto
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

//Función para guardar en local los datos del array de favoritos
function setLS() {
	const stringFav = JSON.stringify(favourites);
	localStorage.setItem('favourites', stringFav);
}

//Función para recuperar al array de favoritos los datos guardados en local.
function getLS() {
	const localStorageFav = localStorage.getItem('favourites');

	if (localStorageFav === null) {
		handleGetSearchResult();
	} else {
		const arrayFav = JSON.parse(localStorageFav);
		favourites = arrayFav;
	}
	//Función con la que mantenemos la estructura de la sección de series
	addCards();
	//Función con la que mantenemos la estructura de la sección de favoritos
	AddContentFavCards();
}

//Reseteamos la sección de favoritos vaciando la sección, vaciando el array y ejecutando la función principal que añade listado y clases de las series.
function reset() {
	favourites = [];
	favSection.innerHTML = '';
	addCards();
	setLS();
}


//# sourceMappingURL=main.js.map
