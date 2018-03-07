/* 
	Simon Game .html file
	Built:  07/03/2018 10:43
	Author: https://github.com/Vic7orHugo

	UPDATES:
		*
 */

$(document).ready(function() {

	let status = "off"; 	// Game status: ON/OFF
	let strictMode = "off"; // Strict mode: ON/OFF

	// Changes the position of the ON/OFF switch
	$(".button-box").click(function() {
		if (status === "off") {
			$(".dash-button").css("left", "50%");
			$("#display").css("color", "rgb(244, 41, 65)");
			status = "on";
		} else {
			$(".dash-button").css("left", "0");
			$("#display").css("color", "rgba(244, 41, 65, 0.2)");
			$("#strict-mode-indicator").css("background-color", "black");
			status = "off";
			strictMode = "off";
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

});