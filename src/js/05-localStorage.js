function setLS() {
	localStorage.setItem('favourites', JSON.stringify(favourites));
}

function getLS() {
	favourites = JSON.parse(localStorage.getItem('favourites'));
	AddContentFavCards();
	addCards();
}
