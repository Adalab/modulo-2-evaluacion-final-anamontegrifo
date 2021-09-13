//Reseteamos la sección de favoritos vaciando la sección, vaciando el array y ejecutando la función principal que añade listado y clases de las series.
function reset() {
	favourites = [];
	favSection.innerHTML = '';
	addCards();
	setLS();
}
