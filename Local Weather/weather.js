
// Global Variables
var api = "https://fcc-weather-api.glitch.me/api/current?";
var tempValue;
var tempUnit = 'C';
var weatherState = {
  "Thunderstorms": "https://s-media-cache-ak0.pinimg.com/originals/1b/b6/08/1bb6088c9a0c5448b17a50106d467783.jpg",
  "Clouds": "http://emanuelcountylive.com/wp-content/uploads/2015/04/Cloudy_Sky_V_by_surczak-1024x768.jpg",
  "Clear": "https://www.ibiza2day.com/wp-content/uploads/2015/07/sun.jpg",
  "Rain": "https://img00.deviantart.net/d04b/i/2013/031/9/8/dark__cloudy_and_rainy_by_ansdesign-d5tccfa.jpg"
}

$(document).ready(function() {
    
  // This has to be here for SOME FUCKING REASON
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  $("#temperature").click(function() {
    temperatureConverter();
    $("#temperature").html(temperature);
  });
  
  /*
  $.getJSON(api + location, function(json) {
    $("#location").html(json.name);
    $("#icon").HTMLImageElement(json.wheater[0].icon);
  });
  */
  
});

function getLocation(position) {
  var location = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude; 
  getWeather(location);
}

function getWeather(location) {
  apiURL = api + location;
  $.ajax({
    dataType: "json",
    url: apiURL,
    success: function(json){
      tempValue = json.main.temp;
      $("#location").html(json.name + ", " + json.sys.country);
      $("#temperature").html(temperature);
      $("#weather").html(json.weather[0].description);
      $("#icon").attr("src", json.weather[0].icon);
      $(".bg-image").attr("src", weatherState[json.weather[0].main]);
    }     
  });
}

function temperature() {
  return tempValue + ' º' + tempUnit;
}

function temperatureConverter() {
  if (tempUnit === 'C') {
    tempValue = Math.round(1.8 * tempValue + 32);
    tempUnit = 'F';
  } else {
    tempValue = Math.round((tempValue - 32) / 1.8);
    tempUnit = 'C';
  }
}