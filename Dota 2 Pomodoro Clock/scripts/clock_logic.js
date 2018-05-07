// Template for a JavaScript (.js) file using jQuery

let section = {
  "br": "break",
  "sess": "session"
};
let chosenValue, value, intervalID, time;
let state = "paused";
let whichTimer = "session";
let min = parseInt(document.getElementById("timer").innerHTML, 10);
let sec = 0;
let headStyle;
let counterStyle;
let count;

window.onload = () => {
  headStyle = document.createElement('STYLE');
  document.getElementById("counter").classList.add("counter");
}

const handleClick = (event) => {
  
  let sign = event.target.value;
  switch (sign) {
    case "+":
      chosenValue = section[event.target.id];
      value = parseInt(document.getElementById(chosenValue).innerHTML, 10);
      if (value < 90) {
        document.getElementById(chosenValue).innerHTML = value + 1; 
      }    
      if (state === "paused") {
        min = parseInt(document.getElementById(whichTimer).innerHTML, 10);
        document.getElementById("timer").innerHTML = document.getElementById(whichTimer).innerHTML;
      }
      break;
    case "-":
      chosenValue = section[event.target.id];
      value = parseInt(document.getElementById(chosenValue).innerHTML, 10);
      if (value > 1) {
        document.getElementById(chosenValue).innerHTML = value - 1;
      }
      if (state === "paused") {
        min = parseInt(document.getElementById(whichTimer).innerHTML, 10);
        document.getElementById("timer").innerHTML = document.getElementById(whichTimer).innerHTML;
      }
      break;
    case "reset":
      min = parseInt(document.getElementById(whichTimer).innerHTML, 10);
      sec = 0;
      clearInterval(intervalID);
      if (state !== "paused") {
        state = "paused";
      }
      document.getElementById("timer").innerHTML = min;
      break;
    case "stop-go":
      state = state === "paused" ? "counting" : "paused";
      if (state === "counting") {
        count = parseInt(document.getElementById(whichTimer).innerHTML, 10);
        counterColor("rgba(0, 165, 114, .8)", count*60);
        // let count = parseInt(document.getElementById(whichTimer).innerHTML, 10);
        
        // if (whichTimer === "session") {
        //   counterColor("rgba(0, 165, 114, .8)", count*60);
        // } else {
        //   counterColor("rgba(137, 207, 240, .8)", count*60);
        // }
        intervalID = window.setInterval(function() {
          if (min === 0 && sec === -1 && (whichTimer === "session")) {
            whichTimer = "break";
            count = parseInt(document.getElementById(whichTimer).innerHTML, 10);
            counterColor("rgba(137, 207, 240, .8)", count*60);
            min = parseInt(count, 10);
            sec = 0;
            document.getElementById("session-name").innerHTML = "Break";
          } else if (min === 0 && sec === -1 && (whichTimer === "break")) {
            whichTimer = "session";
            count = parseInt(document.getElementById(whichTimer).innerHTML, 10);
            counterColor("rgba(0, 165, 114, .8)", count*60);
            min = parseInt(count, 10);
            sec = 0;
            document.getElementById("session-name").innerHTML = "Session";
          }
          if (sec === -1 && min > 0) {
            min--;
            sec = 59;
          }
          time = min.toString() + ':';
          if (sec < 10) {
            time = time + '0' + sec.toString();
          } else {
            time += sec.toString();
          }
          document.getElementById("timer").innerHTML = time;
          sec--;
        }, 1000);
      } else if (state === "paused") {
        clearInterval(intervalID);
      }
      break;
  }
  
};

const counterColor = (color, time) => {
  if (counterStyle) {
    headStyle.removeChild(counterStyle);
      console.log("fucj");
  }
  let counterStyleText = `
    .counter:after {
      content: '';
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background-color: ${color};
      animation: filler ${time}s linear;
      z-index: -10;
    }
  `;
  counterStyle = document.createTextNode(counterStyleText);
  headStyle.appendChild(counterStyle);
  document.head.appendChild(headStyle)
};