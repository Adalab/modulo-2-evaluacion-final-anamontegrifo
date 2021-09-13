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
