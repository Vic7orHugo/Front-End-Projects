/* Tic-Tac-Toe .js file
   01/03/2018 11:00
 */

// Global variables
let turn = 0; // The game's turn
let number = 0; // Number of the player
let content; // The current play: "X" or "O"
let winRegex = /(XXX|OOO)/; // Regex to match a win condition
// 2D array to save the "X's" and "O's"
let combinations = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
let positions = { // Positions of the board to fill in the 2D array with the corresponding play
	"a": [0, 0],
	"b": [0, 1],
	"c": [0, 2],
	"d": [1, 0],
	"e": [1, 1],
	"f": [1, 2],
	"g": [2, 0],
	"h": [2, 1],
	"i": [2, 2]
}
let permutations = { // Object to check all the combinations possible to win
	0: [[0, 0], [0, 1], [0, 2]],
	1: [[1, 0], [1, 1], [1, 2]],
	2: [[2, 0], [2, 1], [2, 2]],
	3: [[0, 0], [1, 0], [2, 0]],
	4: [[0, 1], [1, 1], [2, 1]],
	5: [[0, 2], [1, 2], [2, 2]],
	6: [[0, 0], [1, 1], [2, 2]],
	7: [[0, 2], [1, 1], [2, 0]]
}
let player = { // Object containing the players option
	0: "",
	1: ""
}
let points = [0, 0]; // Player points

// Loads with the page
$(document).ready(function() {

	let box; // Saves the chosen box from either player
	let choice; // Saves the setting choices

	// Hides the content that is not to be shown after loading
	//$("#set2").hide();
	$("#table").hide();

	// Gets the player settings to play
	$(".button").click(function() {
		choice = $(this).attr("value");
		switch (choice) {
			case "X":
				player[0] = "X";
				player[1] = "O";
				$("#set2").hide(1200);	
				$("#table").show(1200);	
				// Starts the Scoreboard content
				$("#1").html("Player 1: " + points[0].toString());
				$("#turn").html("Player " + (number + 1).toString() + " turn!");
				$("#2").html("Player 2: " + points[1].toString());
				break;

			case "O":
				player[0] = "O";
				player[1] = "X";
				$("#set2").hide(1200);
				$("#table").show(1200);
				// Starts the Scoreboard content
				$("#1").html("Player 1: " + points[0].toString());
				$("#turn").html("Player " + (number + 1).toString() + " turn!");
				$("#2").html("Player 2: " + points[1].toString());
				break;

			case "bot":
				$("#set1").hide(1000);
				setTimeout(function(){$("#set2").removeClass("hidden");}, 800);
				$("#set2").show(1000);
				break;

			case "player":
				$("#set1").hide(1000);
				setTimeout(function(){$("#set2").removeClass("hidden");}, 800);
				$("#set2").show(1000);
				break;
		}

	});

	// Triggers when any box of the board is clicked
	$(".box").click(function() {
		box = $(this).attr("id"); // Gets the "id" of the box clicked
		content = $(this).html(); // Saves the clicked box content
		play(box);				  // Calls the main function
	});

});

// Draws the "X's" and "O's" at the right boxes and shows the match result
function play(select) {
	let selector = "#" + select; // Creates the right box "id" selector
	if (content !== 'X' && content !== 'O') { // Avoids refilling a box
		turn++; 							  // Increments the turn
		$(selector).html(player[number]);	  // Puts the player value on the respective box
		// Saves the current play on the 2D array
		combinations[positions[select][0]][positions[select][1]] = player[number];
		if (winTest()) { // Checks if a player won
			// Delay for the popup window that shows who won
			setTimeout(function(){ alert('Player ' + player[number] + ' won!'); }, 100);
			// Clears the board after confirming the winner
			setTimeout(function(){ 
				let pointSelector = "#" + (number + 1).toString();
				cleanBoard(); 
				// Gives a point to the winner
				points[number]++;
				$(pointSelector).html("Player " + (number + 1).toString() + ": " + points[number].toString());
			}, 120);
			return null;
		} else if (turn === 9) { // Checks a draw match only after the whole table has been filled
			// Shows the confirmation popup window for a draw
			setTimeout(function(){ alert('It was a draw!'); }, 100);
			// Clears the board after confirming the result
			setTimeout(function(){ 
				cleanBoard(); 
				changeTurn();
			}, 120);
			return null;
		}
		// Changes the current turn
		changeTurn();
	}
}

// Checks any of the win conditions
function winTest() {
	let tests;
	// Loop to check if any of the 8 possible win conditions are fulfilled
	for (let perm = 0; perm < 8; perm++) {
		// Creates a string to test against "winRegex"
		tests = combinations[permutations[perm][0][0]][permutations[perm][0][1]] + combinations[permutations[perm][1][0]][permutations[perm][1][1]] + combinations[permutations[perm][2][0]][permutations[perm][2][1]];
		if(winRegex.test(tests)) { // Returns "true" if a player wins
			return true;
		}
	}
	return false; // Returns "false" without a win
}

// Cleans the board
function cleanBoard() {
	let boxes = Object.keys(positions); // Gets the boxes "id's"
	let sel;							
	for (let pos = 0; pos < boxes.length; pos++) {
		sel = '#' + boxes[pos];			// Creates the "id" selector
		if ($(sel).html() !== '') {		// Erases content only if there is one
			$(sel).html('');
		}
	}
	// Clears the 2D array and resets the turn
	combinations = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
	turn = 0; 
}

// Changes the current turn
function changeTurn() {
	if (number > 0) {
			number--;
		} else {
			number++;
		}
		$("#turn").html("Player " + (number + 1).toString() + " turn!");
}
