const form = document.querySelector('.form');

function preventDefault(event) {
	event.preventDefault();
}
form.addEventListener('submit', preventDefault);
