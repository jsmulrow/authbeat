// file for the authbeat api

// user puts authbeat id on the login input field
var loginField = document.getElementById("authbeat");

// login input field listens for keypresses
loginField.addEventListener('keydown', recordInterval);

function recordInterval() {
	// maybe have it reset after a certain amount of time

	console.log(Date.now());
}



module.exports = {
	authenticate: function(old, new) {
		//////
		return 
	}
}