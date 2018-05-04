/*
    general_functionality.js - Implements the calculator functionality using pure JS to manipulate the DOM.
    May 4 2018 14:39 GMT -03:00
 */

// Global variables
let output = 0;         // Visual output
let status = 'off';     // Calculator status: 'on'/'off'
let operations = [];    // Operators of the desired operation
let mode = 'integer';   // Type of number being worked on
let decimalPoint = -1;  // Number of decimal points: -1 means 1, and so on
let numbers = {         // Object holding the value of the numeric buttons
  "9": 9,
  "8": 8, 
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3, 
  "2": 2,
  "1": 1,
  "0": 0
}
let operators = { // Object holding the value of the operator buttons
  "/": '/',
  "*": '*',
  "+": '+',
  "-": '-'
}

const handleButton = (event) => { // Click button event handler that directs the clicked button value to the main function
  calculator(event.target.value);
};
  
function calculator(value) {         // Main function that dictates how the calculator works
  let display = document.querySelector(".b");
  switch (status) {
      
    case 'off': 
      if (value === 'AC') {
        display.innerHTML = output;
        status = 'on'; 
      }
      break;
      
    case 'on': 
      
      switch(value) {
          
        case 'AC':
          display.innerHTML = '';
          status = 'off';
          reset();  // Resets all the global values
          break;
          
        case 'CE':
          reset();  // Resets all the global values
          display.innerHTML = output;
          break;
          
        case '=':
          // Checks if there is an operation to make, and if the value shown on the display is and operator
          if (operations !== null && !(operators.hasOwnProperty(display.innerHTML))) {
            operations.push([output, '']);
            output = operations[0][0];  // Stacks all the operands
            decimalPoint = -1;
            for (var elem = 1; elem < operations.length; elem++) {  // Computes the whole operation
              switch (operations[elem - 1][1]) {                    // Checks the operator
                case '+':
                  output += operations[elem][0];
                  break;
                case '-':
                  output -= operations[elem][0];
                  break;
                case '*':
                  output *= operations[elem][0];
                  break;
                case '/':
                  output /= operations[elem][0];
                  break;
              }
            }
            operations = [];
            if ((output - Math.floor(output)) !== 0) { // Makes the output value float if needed
              output = parseFloat(output.toFixed(precision(output)));
            } 
            print(output);
            mode = 'done'; // Operation done
          }
          break;
          
        default:
          action(value);
          break;
      }
      break;
  }
}

function action(btn) { // Deals with the numeric and operational button clicks 
  let display = document.querySelector(".b");
  // Checks if the buttons pressed is a operator (not the decimal point) and if there is an operator value shown on the display
  if (operators.hasOwnProperty(btn) && !(operators.hasOwnProperty(display.innerHTML))) {
    operations.push([output, operators[btn]]);  // Stacks the values and operators
    decimalPoint = -1;
    output = 0;
    mode = 'integer';
    display.innerHTML = operators[btn];         // Shows the operator selected on the display
  } else if (numbers.hasOwnProperty(btn)) {     // Checks if the buttons pressed is numeric
    if (mode === 'done') {                      // If there is already a value on the display, it will start a new operation
      output = 0;
      mode = 'integer';
    }
    if (mode === 'integer') {                   // If the value is integer, multiply the previous pressed value by 10 each time and add it to the new pressed value
      output = output * 10 + numbers[btn];
      print(output);
    } else if (mode === 'decimal') {            // If the value is float, add the old value to the new pressed value multiplied by 0.1 each time
      output = output + numbers[btn]*Math.pow(10, decimalPoint);
      print(output.toFixed((-1) * decimalPoint));
      decimalPoint--;
    }
  } else if (btn === '.' && mode === 'integer') { // Checks if the decimal point was pressed
    mode = 'decimal';
    if (output === 0) {
      display.innerHTML = '0.';
    } else if ((output % Math.floor(output)) === 0) {
      display.innerHTML = output.toString() + '.';
    }
  }
}

function print(num) { // Function to show the result on the display
  let display = document.querySelector(".b");
  if (num.toString().length > 9) {  // The displayed value cant have more than 9 digits
    display.innerHTML = 'Digit Limit!';
    reset();
  } else {
    display.innerHTML = num.toString();
  }
}

function precision(number) { // Function to make the output a float number
  if (number > 1 || number < -1){ // If the output value is between 1 and -1, there is 2 numbers after the decimal point
    return 2;
  } else {
    return Number.parseFloat(number).toPrecision(1).toString().length;
  } 
}

function reset() {  // Function to reset the calculator variables to initial state
  output = 0;
  operations = [];
  mode = 'integer';
  decimalPoint = -1;
}