// Template for a JavaScript (.js) file using jQuery

$(document).ready(function() {
  
  let section = {
    "br": "break",
    "sess": "session"
  };
  let chosenValue, value, intervalID, time;
  let state = "paused";
  let whichTimer = "#session";
  let min = parseInt($("#timer").html(), 10);
  let sec = 0;

  $(".button").click(function() {
    
    let sign = $(this).attr("value");
    switch (sign) {
      case "+":
        chosenValue = "#" + section[$(this).attr("id")];
        value = parseInt($(chosenValue).html(), 10);
        if (value < 90) {
          $(chosenValue).html(value + 1); 
        }    
        if (state === "paused") {
          min = parseInt($(whichTimer).html(), 10);
          $("#timer").html($(whichTimer).html());
        }
        break;
      case "-":
        chosenValue = "#" + section[$(this).attr("id")];
        value = parseInt($(chosenValue).html(), 10);
        if (value > 1) {
          $(chosenValue).html(value - 1);
        }
        if (state === "paused") {
          min = parseInt($(whichTimer).html(), 10);
          $("#timer").html($(whichTimer).html());
        }
        break;
      case "reset":
        min = parseInt($(whichTimer).html(), 10);
        sec = 0;
        clearInterval(intervalID);
        if (state !== "paused") {
          state = "paused";
        }
        $("#timer").html(min);
        break;
      case "stop-go":
        state = state === "paused" ? "counting" : "paused";
        if (state === "counting") {
          intervalID = window.setInterval(function() {
            if (min === 0 && sec === -1 && (whichTimer === "#session")) {
              whichTimer = "#break";
              min = parseInt($(whichTimer).html(), 10);
              sec = 0;
              $("#session-name").html("Break");
            } else if (min === 0 && sec === -1 && (whichTimer === "#break")) {
              whichTimer = "#session";
              min = parseInt($(whichTimer).html(), 10);
              sec = 0;
              $("#session-name").html("Session");
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
            $("#timer").html(time);
            sec--;
          }, 950);
        } else if (state === "paused") {
          clearInterval(intervalID);
        }
        break;
    }
    
  });
  
});
