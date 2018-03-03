/* Tic-Tac-Toe .js file
   01/03/2018 11:00
 */

// Global variables
let turn = 0;
let number = 1;
let content;
let winRegex = /(XXX|OOO)/;
let combinations = [[' ', ' ', ' '],[' ', ' ', ' '],[' ', ' ', ' ']];
let positions = {
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
let permutations = {
	0: [[0, 0], [0, 1], [0, 2]],
	1: [[1, 0], [1, 1], [1, 2]],
	2: [[2, 0], [2, 1], [2, 2]],
	3: [[0, 0], [1, 0], [2, 0]],
	4: [[0, 1], [1, 1], [2, 1]],
	5: [[0, 2], [1, 2], [2, 2]],
	6: [[0, 0], [1, 1], [2, 2]],
	7: [[0, 2], [1, 1], [2, 0]]
}
let player = {
	1: "X",
	2: "O"
}

$(document).ready(function() {

	let box;

	$(".box").click(function() {
		box = $(this).attr("id");
		content = $(this).html();
		play(box);
	});

});

function play(select) {
	let selector = "#" + select;
	if (content !== 'X' && content !== 'O') {
		turn++;
		$(selector).html(player[number]);
		combinations[positions[select][0]][positions[select][1]] = player[number];
		if (winTest()) {
			setTimeout(function(){ alert('Player ' + player[number] + ' won!'); }, 100);
			setTimeout(function(){ location.reload(); }, 120);
			return null;
		} else if (turn === 9) {
			setTimeout(function(){ alert('It was a draw!'); }, 100);
			setTimeout(function(){ location.reload(); }, 120);
			return null;
		}
		if (number > 1) {
			number--;
		} else {
			number++;
		}
	}
}

function winTest() {
	let tests;
	for (let perm = 0; perm < 8; perm++) {
		tests = combinations[permutations[perm][0][0]][permutations[perm][0][1]] + combinations[permutations[perm][1][0]][permutations[perm][1][1]] + combinations[permutations[perm][2][0]][permutations[perm][2][1]];
		if(winRegex.test(tests)) {
			return true;
		}
	}
	return false;
}