/* Tic-Tac-Toe .js file
   01/03/2018 11:00
   UPDATE nº 1 (05/03/2018 10:35): Adding more functionalities
   UPDATE nº 2 (06/03/2018 11:46): Adding bot
								   Note: The bots actions always have some delay, so the player can see what the bot is doing
 	JUMP TO LINE 314 IF YOU WANT TO TAKE A LOOK AT THE AI CODE
 */

// Global variables
let round = 0; // The game current round
let turn; // Turn (1 = Player1|Player, 2 = Player2|Bot)
let content; // The current play: "X" or "O"
let winRegex = /(XXX|OOO)/; // Regex to match a win condition
let playerChoice; // Saves who the player wants to play against
// Array to save the "X's" and "O's"
// combinations = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let	combinations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let positions = { // Positions of the board to fill in the 2D array with the corresponding play
	"a": 0,
	"b": 1,
	"c": 2,
	"d": 3,
	"e": 4,
	"f": 5,
	"g": 6,
	"h": 7,
	"i": 8
}
let selectors = { // Positions of the board for the bot fill
	0: "a",
	1: "b",
	2: "c",
	3: "d",
	4: "e",
	5: "f",
	6: "g",
	7: "h",
	8: "i"
}
let permutations = { // Object to check all the combinations possible to win
	0: [0, 1, 2],
	1: [3, 4, 5],
	2: [6, 7, 8],
	3: [0, 3, 6],
	4: [1, 4, 7],
	5: [2, 5, 8],
	6: [0, 4, 8],
	7: [2, 4, 6]
}
class Player { // Player class
	// Constructor
	constructor() {
		this._letter = "";
		this._points = 0;
	}

	// Methods
	get getLetter() {
		return this._letter;
	}

	get getPoints() {
		return (this._points).toString();
	}

	setLetter(value) {
		this._letter = value;
	}

	addPoint() {
		this._points += 1;
	}

};
class AI extends Player { // AI class
	// Constructor
	constructor() {
		super();
	}

};
// Players objects global declaration (problems without it!)
const player1 = new Player();
const player2 = new Player();
const player = new Player();
const bot = new AI();

// Loads with the page
$(document).ready(function() {

	let box; 		  // Saves the chosen box from either player
	let choice; 	  // Saves the setting choices

	// Hides the content that is not to be shown after loading
	//$("#set2").hide();
	$("#table").hide();

	// Gets the player settings to play
	$(".button").click(function() {
		choice = $(this).attr("value");
		switch (choice) {
			case "X": // Setup when the player chooses to play as X
				$("#set2").hide(800);	
				$("#table").show(1500);	
				if (playerChoice === "bot") {
					player.setLetter("X");
					bot.setLetter("O");
					// Starts the Scoreboard content
					$("#1").html("Player: " + player.getPoints);
					$("#2").html("Computer: " + bot.getPoints);
					$("#turn").html("Computer turn!");	
					// Calls the bot after 1.5 s to let the table appear			
					setTimeout(function() {play(selectors[minimax(combinations, bot.getLetter).index]);}, 1500);				
				} else {
					player1.setLetter("X");
					player2.setLetter("O");
					// Starts the Scoreboard content
					$("#1").html("Player 1: " + player1.getPoints);
					$("#2").html("Player 2: " + player2.getPoints);
					$("#turn").html("Player 1 turn!");
				}
				break;

			case "O": // Setup when the player chooses to play as O
				$("#set2").hide(800);	
				$("#table").show(1500);	
				if (playerChoice === "bot") {
					player.setLetter("O");
					bot.setLetter("X");
					// Starts the Scoreboard content
					$("#1").html("Player: " + player.getPoints);
					$("#2").html("Computer: " + bot.getPoints);
					$("#turn").html("Computer turn!");
					// Calls the bot after 1.5 s to let the table appear
					setTimeout(function() {play(selectors[minimax(combinations, bot.getLetter).index]);}, 1500);					
				} else {
					player1.setLetter("O");
					player2.setLetter("X");
					// Starts the Scoreboard content
					$("#1").html("Player 1: " + player1.getPoints);
					$("#2").html("Player 2: " + player2.getPoints);
					$("#turn").html("Player 1 turn!");
				}
				break;

			case "bot": // Settings if the player wants to play against the computer
				playerChoice = choice;
				turn = 2; // The bot always start
				$("#set1").hide(800);
				setTimeout(function(){$("#set2").removeClass("hidden");}, 800);
				$("#set2").show(1000);
				break;

			case "player": // Settings if the player wants to play against another player
				playerChoice = choice;
				turn = 1; // Player 1 always start
				$("#set1").hide(800);
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
		// Calls the bot on its turn
		if (playerChoice === "bot" && round < 9) {
			setTimeout(function() {play(selectors[minimax(combinations, bot.getLetter).index]);}, 800);
		}
	});

});

// Draws the "X's" and "O's" at the right boxes and shows the match result
function play(select) {
	let selector = "#" + select; // Creates the right box "id" selector
	if (content !== 'X' && content !== 'O') { // Avoids refilling a box
		round++; 							  // Increments the turn
		if (turn === 1) {
			if (playerChoice === "bot") {
				$(selector).html(player.getLetter);	  				 // Puts the player value on the respective box
				combinations[positions[select]] = player.getLetter;    // Saves the current play on the 2D array
			} else {
				$(selector).html(player1.getLetter);	  				 // Puts the player value on the respective box
				combinations[positions[select]] = player1.getLetter;   // Saves the current play on the 2D array
			}
		} else {
			if (playerChoice === "bot") {
				$(selector).html(bot.getLetter); // Puts the player value on the respective box
				combinations[positions[select]] = bot.getLetter;    // Saves the current play on the 2D array
			} else {
				$(selector).html(player2.getLetter);	  				 // Puts the player value on the respective box
				combinations[positions[select]] = player2.getLetter;   // Saves the current play on the 2D array
			}
		}
		if (winTest()) { // Checks if a player won
			// Delay for the popup window that shows who won
			if (playerChoice === "player"){
				setTimeout(function(){ alert('Player ' + turn.toString() + ' won!'); }, 100);
			} else {
				if (turn < 2) {
					setTimeout(function(){ alert('The Player won!'); }, 100);
				} else {
					setTimeout(function(){ alert('The Computer won!'); }, 100);
				}
			}
			// Clears the board after confirming the winner
			setTimeout(function(){ 
				let pointSelector = "#" + turn.toString();
				cleanBoard(); 
				if (playerChoice === "player") {
					if (turn < 2) {
						player1.addPoint();// Gives a point to the winner
						$(pointSelector).html("Player 1: " + player1.getPoints);
					} else {
						player2.addPoint();// Gives a point to the winner
						$(pointSelector).html("Player 2: " + player2.getPoints);
					}
				} else {
					if (turn < 2) {
						player.addPoint();// Gives a point to the winner
						$(pointSelector).html("Player: " + player.getPoints);
					} else {
						bot.addPoint();// Gives a point to the winner
						$(pointSelector).html("Computer: " + bot.getPoints);
						// Calls the bot after he wins
						setTimeout(function() {play(selectors[minimax(combinations, bot.getLetter).index]);}, 800);
					}
				}
			}, 120);
			return null;
		} else if (round === 9) { // Checks a draw match only after the whole table has been filled
			// Shows the confirmation popup window for a draw
			setTimeout(function(){ alert('It was a draw!'); }, 100);
			// Clears the board after confirming the result
			setTimeout(function(){ 
				cleanBoard(); 
				changeTurn();
				// Calls the bot if it is his turn after the tie
				if (playerChoice === "bot" && turn === 2) {
					setTimeout(function() {play(selectors[minimax(combinations, bot.getLetter).index]);}, 800);
				}
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
		tests = combinations[permutations[perm][0]].toString() + combinations[permutations[perm][1]].toString() + combinations[permutations[perm][2]].toString();
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
	// Clears the array and resets the turn
	// combinations = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	combinations = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	round = 0; 
}

// Changes the current turn
function changeTurn() {
	if (turn > 1) {
			turn--;
		} else {
			turn++;
		}
	if (playerChoice === "player") {
		$("#turn").html("Player " + turn.toString() + " turn!");
	} else {
		if (turn > 1) {
			$("#turn").html("Computer turn!");
		} else {
			$("#turn").html("Player's turn!");
		}
	}
}

// Looks for empty spaces on the table
/*function emptySpaces(theboard) {
	// It is going to save an array with the empty indexes of the table array
	let indexes = [];
	let index = theboard.indexOf(' '); // Index of the first blank element
	while (index != -1) { // Loops through the table array to get all the blank spaces indexes
	  indexes.push(index); // Saves the index of the blank space
	  index = theboard.indexOf(' ', index + 1); // Finds the index of another empty element
	}
	return indexes; // Returns the array of indexes
}*/

////////////////////////////////////////////////////////////////////////q
/* 
	From here on, the code used was a sample that was shared by the user
	"ahmad abdolsaheb", from freecodecamp.org. His post can be seen
	in the following link: 
	https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37

	The code contains: a minimax algorithm to make the computer choose the
	best actions on the tic-tac-toe table, making him unbeatable; a function
	to get the empty indexes from the array that saves all the content from
	the table; and a function to test the winning combinations.

	I thank him for sharing this code. I would be able to do this project
	eventually, but findint his post has made the conclusion speed a lot
	faster, obviously. By the time I'm writing it (06/03/2018), I do not 
	understand everything about the minimax function that he shared, but 
	I'll keep studying it and acquire full knowledge about it.
*/

// returns the available spots on the board
function emptySpaces(theboard){
  return theboard.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies
function winning(board, player){
	if (
		(board[0] === player && board[1] === player && board[2] === player) ||
 		(board[3] === player && board[4] === player && board[5] === player) ||
 		(board[6] === player && board[7] === player && board[8] === player) ||
 		(board[0] === player && board[3] === player && board[6] === player) ||
 		(board[1] === player && board[4] === player && board[7] === player) ||
 		(board[2] === player && board[5] === player && board[8] === player) ||
 		(board[0] === player && board[4] === player && board[8] === player) ||
 		(board[2] === player && board[4] === player && board[6] === player)
 	) {
 		return true;
 	} else {
 		return false;
 	}
}

// the main minimax function
function minimax(newBoard, playing){
  
  	//available spots
  	let availSpots = emptySpaces(newBoard);

 	// checks for the terminal states such as win, lose, and tie 
    //and returning a value accordingly
  	if (winning(newBoard, player.getLetter)){
	    return {score:-10};
	} else if (winning(newBoard, bot.getLetter)){
	    return {score:10};
	} else if (availSpots.length === 0){
	  	return {score:0};
	}

	// an array to collect all the objects
 	let moves = [];

  	// loop through available spots
  	for (let i = 0; i < availSpots.length; i++){
    	//create an object for each and store the index of that spot 
    	let move = {};
  		move.index = newBoard[availSpots[i]];

    	// set the empty spot to the current player
    	newBoard[availSpots[i]] = playing;

    	/*collect the score resulted from calling minimax 
      	  on the opponent of the current player*/
    	if (playing === bot.getLetter){
      		let result = minimax(newBoard, player.getLetter);
      		move.score = result.score;
    	} else {
    	  	let result = minimax(newBoard, bot.getLetter);
      		move.score = result.score;
    	}

	    // reset the spot to empty
	    newBoard[availSpots[i]] = move.index;

	    // push the object to the array
	    moves.push(move);

  	}

  	// if it is the computer's turn loop over the moves and choose the move with the highest score
 	let bestMove;
  	if(playing === bot.getLetter){
	    let bestScore = -10000;
	    for(let i = 0; i < moves.length; i++){
	     	if(moves[i].score > bestScore){
	        	bestScore = moves[i].score;
	        	bestMove = i;
      		}
    	}
  	} else {

		// else loop over the moves and choose the move with the lowest score
	    let bestScore = 10000;
	    for(let i = 0; i < moves.length; i++){
	      	if(moves[i].score < bestScore){
	        	bestScore = moves[i].score;
	        	bestMove = i;
	      	}
	    }
  	}

	// return the chosen move (object) from the moves array
  	return moves[bestMove];

}