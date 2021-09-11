//Reset favourites

console.log(favourites);
function reset() {
	favourites = [];
	favContainer.innerHTML = '';
	setLS();
	addCards();
	localStorage.clear();
}
resetBtn.addEventListener('click', reset);
