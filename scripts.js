weatherKey = '';
var latitude = 33;
var longitude = -97;
const x = document.getElementById("weatherDescription");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

$.ajax({
  dataType: "json",
  url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=' + weatherKey + '&units=imperial",
  success: function(data) {

    //parse string input
    var description = data.weather.description;


    $("#city").html(data.name);
    $("#country").html(data.sys.country);
    $("#icon").html(data.weather.icon);
    $("#weatherMain").html(data.weather.main);
    $("#weatherDescription").html(data.weather[0].description);
    $("#fahr").html(Math.round(data.main.temp));
    $("#cels").html(Math.round(((data.main.temp - 32) * 5) / 9));

    if (Math.round(data.main.temp) < 0) {
      $("#decision").html("I don't think the world even exists out there anymore, actually. Would you mind checking?");
    } else if (Math.round(data.main.temp) < 32) {
      $("#decision").html("If you're <em>reaaaaaallly</em> dry, <em>maybe</em> you won't die.");
    } else if (Math.round(data.main.temp) < 50) {
      $("#decision").html("There's no way you wouldn't freeze your jiblets off out there. The rest of you should be fine, though.");
    } else if (Math.round(data.main.temp) < 75) {
      $("#decision").html("It's getting close! Just a few more spurts of red-hot sunfire, and your section of this big steaming rock might actually be nude-habitable!");
    } else if (Math.round(data.main.temp) > 95) {
      $("#decision").html("You're gonna melt either way. Don't do it.");
    } else {
      $("#decision").html("It's perfect floppin' it weather. Do your thing.");
    }
    var id = data.weather[0].id;

    if (id < 300) {
      $("#icon").attr("class", "wi wi-thunderstorm");
    } else  if (id < 600) {
      $("#icon").attr("class", "wi wi-rain");
    } else if (id < 700) {
      $("#icon").attr("class", "wi wi-snow");
    } else if (id < 800) {
      $("#icon").attr("class", "wi wi-dust");
    } else if (id < 801) {
      $("#icon").attr("class", "wi wi-day-sunny");
    } else if (id < 900) {
      $("#icon").attr("class", "wi wi-cloudy");
    } else if (id < 907) {
      $("#icon").attr("class", "wi wi-tornado");
    } else {
      $("#icon").attr("class", "wi wi-na");
      $("#icon").html(data.weather.id);
    }
  }
});

$( "#unitShift" ).click(function() {
  $( ".canusa" ).toggle();
});

console.log(latitude + "global");

/*--------All my alternative approaches--------

$.ajax({
  dataType: "json",
  url: "http://ip-api.com/json",
  success: function(position) {
    console.log(position);
    if (position.status === "success") {
      console.log("success");
      latitude = position.lat;
      longitude = position.lon;
      console.log(latitude + " local");
    } else {
      console.log("location query unsuccessful");

    }
  }
});

fetch("ip-api.com/json?fields=lat,lon")
  .then((data) => {
    console.log("---Location JSON---"); console.log(data); //Debug
    
    fetch("api.openweathermap.org/data/2.5/weather?lat=32.8627&lon=-97.2473&appid=677efae9eb136f59f2d1c9aefbabef40&units=imperial")
      .then((data) => {
        console.log("---Weather JSON---"); console.log(data); //Debug
      })
      .catch((error) => {
        //Handle any error in the weather fetch
        console.log(error); //Debug
    });
  })
  .catch((error) => {
    //Handle any errors in the location fetch
    console.log(error); //Debug
});

/*
//Get location data
$.getJSON("ip-api.com/json?fields=lat,lon", function(position) {
    //JSON result in 'position' variable
    console.log("---JSON---"); console.log(data); //Debug
    
    if (position.status === "success") {
      console.log("success");
      latitude = position.lat;
      longitude = position.lon;
      console.log(latitude + " local latitude");
      console.log(longitude + " local longitude");
    } else {
      console.log("location query unsuccessful");
    }
});

/*
$.ajax({
  dataType: "json",
  method: 'GET',
  url: "http://ip-api.com/json",
  success: function(position) {
    console.log(position + "ajax");
    if (position.status === "success") {
      console.log("success");
      latitude = position.lat;
      longitude = position.lon;
      console.log(latitude + " local");
    } else {
      console.log("location query unsuccessful");

    }
  }
});

$.ajax({
  dataType: "json",
  url: "api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=677efae9eb136f59f2d1c9aefbabef40&units=imperial",
  success: function(data) {

    //parse string input
    var description = data.weather.description;


    $("#city").html(data.name);
    $("#country").html(data.sys.country);
    $("#icon").html(data.weather.icon);
    $("#weatherMain").html(data.weather.main);
    $("#weatherDescription").html(data.weather[0].description);
    $("#fahr").html(Math.round(data.main.temp));
    $("#cels").html(Math.round(((data.main.temp - 32) * 5) / 9));

    if (Math.round(data.main.temp) < 0) {
      $("#decision").html("I don't think the world even exists out there anymore, actually. Would you mind checking?");
    } else if (Math.round(data.main.temp) < 32) {
      $("#decision").html("If you're <em>reaaaaaallly</em> dry, <em>maybe</em> you won't die.");
    } else if (Math.round(data.main.temp) < 50) {
      $("#decision").html("There's no way you wouldn't freeze your jiblets off out there. The rest of you should be fine, though.");
    } else if (Math.round(data.main.temp) < 75) {
      $("#decision").html("It's getting close! Just a few more spurts of red-hot sunfire, and your section of this big steaming rock might actually be nude-habitable!");
    } else if (Math.round(data.main.temp) > 95) {
      $("#decision").html("You're gonna melt either way. Don't do it.");
    } else {
      $("#decision").html("It's perfect floppin' it weather. Do your thing.");
    }
    var id = data.weather[0].id;

    if (id < 300) {
      $("#icon").attr("class", "wi wi-thunderstorm");
    } else  if (id < 600) {
      $("#icon").attr("class", "wi wi-rain");
    } else if (id < 700) {
      $("#icon").attr("class", "wi wi-snow");
    } else if (id < 800) {
      $("#icon").attr("class", "wi wi-dust");
    } else if (id < 801) {
      $("#icon").attr("class", "wi wi-day-sunny");
    } else if (id < 900) {
      $("#icon").attr("class", "wi wi-cloudy");
    } else if (id < 907) {
      $("#icon").attr("class", "wi wi-tornado");
    } else {
      $("#icon").attr("class", "wi wi-na");
      $("#icon").html(data.weather.id);
    }
  }
});
*/

    $( "#unitShift" ).click(function() {
      $( ".canusa" ).toggle();
    });

console.log(latitude + " global (final latitude)");

/*
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

navigator.geolocation.getCurrentPosition(function(position) {
  do_something(position.coords.latitude, position.coords.longitude);
});
*/