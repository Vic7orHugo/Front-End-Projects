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

$(document).ready(function() {

	let status = "off"; 	// Game status: ON/OFF
	let strictMode = "off"; // Strict mode: ON/OFF
	let round = 1;			// Game current round/count
	let finalRound = 20;	// Final game round/count
	let buttons = ["green", "red", "yellow", "blue"]; // Buttons
	let btnClicks = 0;		// Number of buttons clicks
	let sequence;			// Button Sequence
	let random;				// Random number between 0 and 3

	// Changes the position of the ON/OFF switch
	$(".button-box").click(function() {
		if (status === "off") {
			$(".dash-button").css("left", "50%");
			$("#display").css("color", "rgb(244, 41, 65)");
			status = "on";
		} else {
			$(".dash-button").css("left", "0");
			$("#display").css("color", "rgba(244, 41, 65, 0.1)");
			$("#display").html("--");
			$("#strict-mode-indicator").css("background-color", "black");
			turnOff();
			$(".game-buttons").css("cursor", "default");
			status = "off";
			strictMode = "off";
			turn = "watch";
		}
	});

	// Turns ON/OFF the strict mode of the game
	$("#strict-mode-button").click(function() {
		if (status === "on") {
			if (strictMode === "off") {
				$("#strict-mode-indicator").css("background-color", "rgb(244, 41, 65)");
				strictMode = "on";
			} else {
				$("#strict-mode-indicator").css("background-color", "black");
				strictMode = "off";
			}
		}
	});

	// Starts the game
	$("#start-button").click(function() {
		if (status === "on") {
			turnOff();
			$(".game-buttons").css("cursor", "pointer");
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
	$(".game-buttons").click(function() {
		if (status === "on" && turn === "play" && btnClicks < finalRound) {
			let btn = $(this).attr("id");
			let selector = "#" + btn;
			blink(btn, turn);
			if (btn !== sequence[btnClicks]) {
				displayFlick("!!", 200);
				turn = "watch";
				if (strictMode === "on") {
					$.playSound("https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/e/ef/Nev_laugh_04.mp3");
					sequence = [];
					random = Math.floor(Math.random() * buttons.length);
					sequence.push(buttons[random]);
					round = 1;
				} else {
					$.playSound("https://d1u5p3l4wpay3k.cloudfront.net/dota2_gamepedia/e/ea/Nev_death_03.mp3");
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
	});

});

// Blink buttons
function blink(selectedColor, timeTo) {
	let buttonSelector = "#" + selectedColor;
	if (timeTo === "watch") {
		switch (selectedColor) {
			case "green":
				$(buttonSelector).css("background-color", green.rgbOn);
				$.playSound(green.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", green.rgbOff);
				}, 900);
				break;
			case "red":
				$(buttonSelector).css("background-color", red.rgbOn);
				$.playSound(red.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", red.rgbOff);
				}, 900);
				break;
			case "yellow":
				$(buttonSelector).css("background-color", yellow.rgbOn);
				$.playSound(yellow.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", yellow.rgbOff);
				}, 900);
				break;
			case "blue":
				$(buttonSelector).css("background-color", blue.rgbOn);
				$.playSound(blue.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", blue.rgbOff);
				}, 900);
				break;
		}
	} else {
		switch (selectedColor) {
			case "green":
				$(buttonSelector).css("background-color", green.rgbOn);
				$.playSound(green.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", green.rgbOff);
				}, 200);
				break;
			case "red":
				$(buttonSelector).css("background-color", red.rgbOn);
				$.playSound(red.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", red.rgbOff);
				}, 200);
				break;
			case "yellow":
				$(buttonSelector).css("background-color", yellow.rgbOn);
				$.playSound(yellow.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", yellow.rgbOff);
				}, 200);
				break;
			case "blue":
				$(buttonSelector).css("background-color", blue.rgbOn);
				$.playSound(blue.getSound);
				setTimeout(function() {
					$(buttonSelector).css("background-color", blue.rgbOff);
				}, 200);
				break;
		}
	}
}

// Executes the sequence of buttons to press
function buttonsToPress(buttonSequence, timeTo, dispCount) {
	let btn = 0;
	if (dispCount < 10) {
		$("#display").html("0" + dispCount.toString());
	} else {
		$("#display").html(dispCount.toString());
	}
	let interval = setInterval(function() {
		if (btn === buttonSequence.length) {
			turn = "play";
			clearInterval(interval);
		}
		$(".button-box").click(function() {clearInterval(interval);});
		$("#start-button").click(function() {clearInterval(interval);});
		blink(buttonSequence[btn], timeTo);
		btn++;
	}, 1100);
}

// Flicks display
function displayFlick(content, time) {
	$("#display").html("");
	setTimeout(function() {$("#display").html(content);}, time + 50);
	setTimeout(function() {$("#display").html("");}, 10 * time);
	setTimeout(function() {$("#display").html(content);}, 10 * time + 100);
}

// Turns buttons off
function turnOff() {
	$("#green").css("background-color", green.rgbOff);
	$("#red").css("background-color", red.rgbOff);
	$("#yellow").css("background-color", yellow.rgbOff);
	$("#blue").css("background-color", blue.rgbOff);
}