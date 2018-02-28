// Template for a JavaScript (.js) file using jQuery

// Global variables
let output = 0;
let status = true;
let operations = [];
let mode = 'integer';
let decimalPoint = -1;
let numbers = {
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
let operators = {
  "/": '/',
  "*": '*',
  "+": '+',
  "-": '-'
}

$(document).ready(function() {

  $("#calculator").on("click", "button", function() {
  //$("button").click(function() {
    toVisor($(this).attr("value"));  
  });  
  
});

function toVisor(value) {
  switch (status) {
      
    case true:
      if (value === 'AC') {
        $(".b").html(output);
        status = false;
      }
      break;
      
    case false:
      
      switch(value) {
          
        case 'AC':
          $(".b").html('');
          status = true;
          reset();
          break;
          
        case 'CE':
          reset();
          $(".b").html(output);
          break;
          
        case '=':
          if (operations !== null && !(operators.hasOwnProperty($(".b").html()))) {
            operations.push([output, '']);
            output = operations[0][0];
            decimalPoint = -1;
            for (var elem = 1; elem < operations.length; elem++) {
              switch (operations[elem - 1][1]) {
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
                  //output = Number.parseFloat(output).toPrecision(20);
                  break;
              }
            }
            operations = [];
            if ((output - Math.floor(output)) !== 0) {
              output = parseFloat(output.toFixed(precision(output)));
            } 
            print(output);
            mode = 'done';
          }
          break;
          
        default:
          action(value);
          break;

      }
      
      break;
      
  }

}

function action(btn) {
  if (operators.hasOwnProperty(btn) && !(operators.hasOwnProperty($(".b").html()))) {
    operations.push([output, operators[btn]]);
    decimalPoint = -1;
    output = 0;
    mode = 'integer';
    $(".b").html(operators[btn]);
  } else if (numbers.hasOwnProperty(btn)) {
    if (mode === 'done') {
      output = 0;
      mode = 'integer';
    }
    if (mode === 'integer') {
      output = output * 10 + numbers[btn];
      print(output);
    } else if (mode === 'decimal') {
      output = output + numbers[btn]*Math.pow(10, decimalPoint);
      print(output.toFixed((-1) * decimalPoint));
      decimalPoint--;
    }
  } else if (btn === '.' && mode === 'integer') {
    mode = 'decimal';
    if (output === 0) {
      $(".b").html('0.');
    } else if ((output % Math.floor(output)) === 0) {
      $(".b").html(output.toString() + '.'); 
    }
  }
}

function print(num) {
  if (num.toString().length > 9) {
    $(".b").html('Digit Limit!');
    reset();
  } else {
    $(".b").html(num.toString());
  }
}

function precision(number) {
  if (number > 1 || number < -1){    
    return 2;
  } else {
    return Number.parseFloat(number).toPrecision(1).toString().length;
  } 
}

function reset() {
  output = 0;
  operations = [];
  mode = 'integer';
  decimalPoint = -1;
}