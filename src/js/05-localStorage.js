//Función para guardar en local los datos del array de favoritos
function setLS() {
	localStorage.setItem('favourites', JSON.stringify(favourites));
}

//Función para recuperar al array de favoritos los datos guardados en local.
function getLS() {
	favourites = JSON.parse(localStorage.getItem('favourites'));
	//Función con la que mantenemos el HTML de la sección de favoritos
	AddContentFavCards();
}
