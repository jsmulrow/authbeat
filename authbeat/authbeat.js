/* file for the authbeat api */

var authbeatLoginSuccess = false;
var authbeatLoginIntervals = [];

// encapsulate functionality in a closure
function authbeatLogin() {
	// function can only be run once
	if (authbeatLoginSuccess) return;

	// look for password input field and submit button (specified by client)
	var loginField = document.getElementsByClassName("authbeat-login");
	if (!loginField.length) return false;
	var submitButton = document.getElementsByClassName("authbeat-login-submit");
	if (!submitButton.length) return false;

	// extract dom nodes
	loginField = loginField[0];
	submitButton = submitButton[0];

	/* script to record intervals */

	// global variables to capture state
	var lastKeyPress = Date.now(); 
	var paused = true;

	// calculates intervals and stores them
	function recordInterval(e) {
		// skip first key press
		if (paused) {
			lastKeyPress = Date.now();
			authbeatLoginIntervals = [];
			paused = false
			return;
		}
		// submit if enter is pressed
		if (e.which === 13) {
			submitScript();
			return;
		}
		// reset when backspace is pressed
		if (e.which === 8 || e.which === 46) {
			console.log("backspace");
			authbeatLoginIntervals = [];
			paused = true;
			return;
		}

		// find interval, and add it to intervals array
		var currentPress = Date.now();
		var interval = currentPress - lastKeyPress;
		interval = interval.toString();
		authbeatLoginIntervals.push(interval.length === 4 ? interval : '0' + interval);
		lastKeyPress = currentPress;
	}

	/* script for submission */

	// reset on submission
	function submitScript() {
		authbeatLoginIntervals = authbeatLoginIntervals.join('');
		console.log('submitting', authbeatLoginIntervals);
		paused = true;
	}

	// add event listeners to password input and submit button
	submitButton.addEventListener("click", submitScript);
	loginField.addEventListener("keydown", recordInterval);

	// successful
	authbeatLoginSuccess = true;
	return true;
}

/* authbeat register functionality */

authbeatRegisterSuccess = false;
var authbeatRegisterIntervals = [];

// encapsulate functionality in a closure
function authbeatRegister() {
	// function can only be run once
	if (authbeatRegisterSuccess) return;

	// look for password input field and submit button (specified by client)
	var registerInput = document.getElementsByClassName("authbeat-register");
	if (!registerInput.length) return false;
	var confirmInput = document.getElementsByClassName("authbeat-register-confirm");
	if (!confirmInput.length) return false;
	var submitButton = document.getElementsByClassName("authbeat-register-submit");
	if (!submitButton.length) return false;

	// extract dom nodes
	registerInput = registerInput[0];
	confirmInput = confirmInput[0];
	submitButton = submitButton[0];

	/* script to record intervals */

	// global variables to capture state
	var lastKeyPress = Date.now(); 
	var paused = true;

	// calculates intervals and stores them
	function recordInterval(e) {
		// skip first key press
		if (paused) {
			lastKeyPress = Date.now();
			authbeatRegisterIntervals = [];
			paused = false
			return;
		}
		// submit if enter is pressed
		if (e.which === 13) {
			confirmSubmitScript();
			return;
		}
		// reset when backspace is pressed
		if (e.which === 8 || e.which === 46) {
			console.log("backspace");
			authbeatRegisterIntervals = [];
			paused = true;
			return;
		}

		// find interval, and add it to intervals array
		var currentPress = Date.now();
		var interval = currentPress - lastKeyPress;
		authbeatRegisterIntervals.push(interval);
		lastKeyPress = currentPress;
	}

	confirmationIntervals = [];

	// calculates intervals and stores them
	function recordConfirmationInterval(e) {
		// skip first key press
		if (paused) {
			lastKeyPress = Date.now();
			confirmationIntervals = [];
			paused = false
			return;
		}
		// submit if enter is pressed
		if (e.which === 13) {
			confirmSubmitScript();
			return;
		}
		// reset when backspace is pressed
		if (e.which === 8 || e.which === 46) {
			console.log("backspace");
			confirmationIntervals = [];
			paused = true;
			return;
		}

		// find interval, and add it to intervals array
		var currentPress = Date.now();
		var interval = currentPress - lastKeyPress;
		confirmationIntervals.push(interval);
		lastKeyPress = currentPress;
	}

	/* script for submission */

	// on submission combine confirm intervals with initial intervals
	function confirmSubmitScript() {
		console.log('submitting', authbeatPasswordIntervals);
		if (authbeatRegisterIntervals.length !== confirmationIntervals.length) {
			return false;
		}
		authbeatRegisterIntervals.forEach(function(int, idx) {
			int = (int + confirmationIntervals[idx]) / 2;
		});

		paused = true;
	}

	// add event listeners to password input and submit button
	submitButton.addEventListener("click", submitScript);
	registerInput.addEventListener("keydown", recordInterval);
	confirmInput.addEventListener("keydown", recordConfirmationInterval);

	// successful
	authbeatRegisterSuccess = true;
	return true;
}

// client can run authbeat again if they wish
function authbeatReset() {
	authbeatLoginSuccess = false;
	authbeatRegisterSuccess = false;
}

// attempt to set up authbeat on load
authbeatLogin();
authbeatRegister();

// if either authbeat fails (e.g. in a single page app), client can call it themselves
