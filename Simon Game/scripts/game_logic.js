/* 
	Simon Game .js file
	Built:  07/03/2018 10:43
	Author: https://github.com/Vic7orHugo

	UPDATES:
		* (08/03/2018 19:49) - Added all the needed functionality for the game. The only one
							   thing left to do is to implement the interation sounds;
		* (09/03/2018 10:36) - Added Win condition and message;	
							 - Added sounds for playing and clicking the buttons, and for losing
							   with strict mode ON or OFF;
		* (03/05/2018 19:45) - Changed jQuery for pure JS;
							 - Not using a third party code to play the sounds;			
 */

 class Color { // Color class
 	// Constructor
 	constructor(sound, rgbOn, rgbOff) {
 		this._sound = sound;
 		this._rgbOn = rgbOn;
 		this._rgbOff = rgbOff;
 	}

 	// Get methods
 	get getSound() {
 		return this._sound;
 	}

 	get rgbOn() {
 		return this._rgbOn;
 	}

 	get rgbOff() {
 		return this._rgbOff;
 	}

 };
// Color objects
const green = new Color("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
						 "rgb(23, 219, 26)", "rgba(23, 219, 26, 0.6)");
const red = new Color("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
					   "rgb(255, 17, 0)", "rgba(255, 17, 0, 0.6)");
const yellow = new Color("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
						  "rgb(255, 242, 0)", "rgba(255, 242, 0, 0.6)");
const blue = new Color("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
						"rgb(0, 75, 255)", "rgba(0, 75, 255, 0.6)");
let turn = "watch";		// The turn of the game: watch(observe the buttons blinks) and play
let status = "off"; 	// Game status: ON/OFF
let strictMode = "off"; // Strict mode: ON/OFF
let round = 1;			// Game current round/count
let finalRound = 20;	// Final game round/count
let buttons = ["green", "red", "yellow", "blue"]; // Buttons
let btnClicks = 0;		// Number of buttons clicks
let sequence;			// Button Sequence
let random;				// Random number between 0 and 3
const MISS_AUDIO = "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/e/ea/Nev_death_03.mp3";
const MISS_AUDIO_STRICT_MODE = "https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/e/ef/Nev_laugh_04.mp3";

// Changes the position of the ON/OFF switch
document.querySelector(".button-box").addEventListener("click", () => {
	if (status === "off") {
		document.querySelector(".dash-button").style.left = "50%";
		document.querySelector("#display").style.color = "rgb(244, 41, 65)";
		status = "on";
	} else {
		document.querySelector(".dash-button").style.left = "0";
		document.querySelector("#display").style.color = "rgba(244, 41, 65, 0.1)";
		document.querySelector("#display").innerHTML = "--";
		document.querySelector("#strict-mode-indicator").style.backgroundColor = "black";
		turnOff();
		document.querySelector(".game-buttons").style.cursor = "default";
		status = "off";
		strictMode = "off";
		turn = "watch";
	}
});

// Turns ON/OFF the strict mode of the game
document.getElementById("strict-mode-button").addEventListener("click", () => {
	if (status === "on") {
		if (strictMode === "off") {
			document.getElementById("strict-mode-indicator").style.backgroundColor = "rgb(244, 41, 65)";
			strictMode = "on";
		} else {
			document.getElementById("strict-mode-indicator").style.backgroundColor = "black";
			strictMode = "off";
		}
	}
});

// Starts the game
document.getElementById("start-button").addEventListener("click", () => {
	if (status === "on") {
		turnOff();
		document.querySelector("#green").style.cursor = "pointer";
		document.querySelector("#red").style.cursor = "pointer";
		document.querySelector("#yellow").style.cursor = "pointer";
		document.querySelector("#blue").style.cursor = "pointer";
		round = 1;
		turn = "watch";
		btnClicks = 0;
		sequence = [];
		random = Math.floor(Math.random() * buttons.length);
		sequence.push(buttons[random]);
		displayFlick("--", 50);
		setTimeout(function() {buttonsToPress(sequence, turn, round);}, 1500);
	}	
});

// Deals with the play buttons
const handleGameButtons = (event) => {
	if (status === "on" && turn === "play" && btnClicks < finalRound) {
		let btn = event.target.id;
		blink(btn, turn);
		if (btn !== sequence[btnClicks]) {
			displayFlick("!!", 200);
			turn = "watch";
			if (strictMode === "on") {
				playTune("missAudio", MISS_AUDIO_STRICT_MODE, 3000);
				sequence = [];
				random = Math.floor(Math.random() * buttons.length);
				sequence.push(buttons[random]);
				round = 1;
			} else {
				playTune("missAudio", MISS_AUDIO, 3000);
			}
			btnClicks = 0;
			setTimeout(function() {buttonsToPress(sequence, turn, round);}, 3000);
		} else {
			btnClicks++;
			if (btnClicks === round && round < finalRound) {
				round++;
				random = Math.floor(Math.random() * buttons.length);
				sequence.push(buttons[random]);
				turn = "watch";
				btnClicks = 0;
				setTimeout(function() {buttonsToPress(sequence, turn, round);}, 1000);
			} else if (round === finalRound && btnClicks === round) {
				displayFlick("WIN", 150);
				sequence = [];
				btnClicks = 0;
				round = 1;
				turn = "watch";
				random = Math.floor(Math.random() * buttons.length);
				sequence.push(buttons[random]);
				setTimeout(function() {buttonsToPress(sequence, turn, round);}, 4000);
			}
		}		
	}
};

// Blink buttons
function blink(selectedColor, timeTo) {
	if (timeTo === "watch") {
		switch (selectedColor) {
			case "green":
				document.getElementById(selectedColor).style.backgroundColor = green.rgbOn;
				playTune("buttonAudio", green.getSound, 900);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = green.rgbOff;
				}, 900);
				break;
			case "red":
				document.getElementById(selectedColor).style.backgroundColor = red.rgbOn;
				playTune("buttonAudio", red.getSound, 900);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = red.rgbOff;
				}, 900);
				break;
			case "yellow":
				document.getElementById(selectedColor).style.backgroundColor = yellow.rgbOn;
				playTune("buttonAudio", yellow.getSound, 900);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = yellow.rgbOff;
				}, 900);
				break;
			case "blue":
				document.getElementById(selectedColor).style.backgroundColor = blue.rgbOn;
				playTune("buttonAudio", blue.getSound, 900);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = blue.rgbOff;
				}, 900);
				break;
		}
	} else {
		switch (selectedColor) {
			case "green":
				document.getElementById(selectedColor).style.backgroundColor = green.rgbOn;
				playTune("buttonAudio", green.getSound, 400);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = green.rgbOff;
				}, 200);
				break;
			case "red":
				document.getElementById(selectedColor).style.backgroundColor = red.rgbOn;
				playTune("buttonAudio", red.getSound, 400);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = red.rgbOff;
				}, 200);
				break;
			case "yellow":
				document.getElementById(selectedColor).style.backgroundColor = yellow.rgbOn;
				playTune("buttonAudio", yellow.getSound, 400);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = yellow.rgbOff;
				}, 200);
				break;
			case "blue":
				document.getElementById(selectedColor).style.backgroundColor = blue.rgbOn;
				playTune("buttonAudio", blue.getSound, 400);
				setTimeout(function() {
					document.getElementById(selectedColor).style.backgroundColor = blue.rgbOff;
				}, 200);
				break;
		}
	}
}

// Executes the sequence of buttons to press
function buttonsToPress(buttonSequence, timeTo, dispCount) {
	let btn = 0;
	if (dispCount < 10) {
		document.querySelector("#display").innerHTML = "0" + dispCount.toString();
	} else {
		document.querySelector("#display").innerHTML = dispCount.toString();
	}
	let interval = setInterval(function() {
		if (btn === buttonSequence.length) {
			turn = "play";
			clearInterval(interval);
		}
		document.querySelector(".button-box").addEventListener("click", () => {clearInterval(interval)});
		document.querySelector("#start-button").addEventListener("click", () => {clearInterval(interval)});
		blink(buttonSequence[btn], timeTo);
		btn++;
	}, 1100);
}

// Flicks display
function displayFlick(content, time) {
	document.querySelector("#display").innerHTML = "";
	setTimeout(() => {document.querySelector("#display").innerHTML = content}, time + 50);
	setTimeout(() => {document.querySelector("#display").innerHTML = ""}, 10 * time);
	setTimeout(() => {document.querySelector("#display").innerHTML = content}, 10 * time + 100);
}

// Turns buttons off
function turnOff() {
	document.getElementById("green").style.backgroundColor = green.rgbOff;
	document.getElementById("red").style.backgroundColor = red.rgbOff;
	document.getElementById("yellow").style.backgroundColor = yellow.rgbOff;
	document.getElementById("blue").style.backgroundColor = blue.rgbOff;
}

// Play the selected tune 
function playTune(id, tune, time) {
	document.getElementById(id).src = tune;
	document.getElementById(id).play();	
	setTimeout(() => {
		document.getElementById(id).pause();
	}, time);
}
