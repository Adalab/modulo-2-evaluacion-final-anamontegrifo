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
