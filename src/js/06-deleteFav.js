//Reset favourites

function reset() {
	favourites = [];
	favSection.innerHTML = '';
	setLS();
	addCards();
	localStorage.clear();
}
