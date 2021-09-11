//Prevent default execution of the form
function preventDefault(event) {
	event.preventDefault();
}
form.addEventListener('submit', preventDefault);
