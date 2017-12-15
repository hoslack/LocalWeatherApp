var degToCard = function(deg){
  if (deg>11.25 && deg<33.75){
    return "NNE";
  }else if (deg>33.75 && deg<56.25){
    return "ENE";
  }else if (deg>56.25 && deg<78.75){
    return "E";
  }else if (deg>78.75 && deg<101.25){
    return "ESE";
  }else if (deg>101.25 && deg<123.75){
    return "ESE";
  }else if (deg>123.75 && deg<146.25){
    return "SE";
  }else if (deg>146.25 && deg<168.75){
    return "SSE";
  }else if (deg>168.75 && deg<191.25){
    return "S";
  }else if (deg>191.25 && deg<213.75){
    return "SSW";
  }else if (deg>213.75 && deg<236.25){
    return "SW";
  }else if (deg>236.25 && deg<258.75){
    return "WSW";
  }else if (deg>258.75 && deg<281.25){
    return "W";
  }else if (deg>281.25 && deg<303.75){
    return "WNW";
  }else if (deg>303.75 && deg<326.25){
    return "NW";
  }else if (deg>326.25 && deg<348.75){
    return "NNW";
  }else{
    return "N"; 
  }
}

function showError(error) {
	var x = document.querySelector('#alert');
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
} 




function getWeather(position) {
	var laT = position.coords.latitude;
	var lonG = position.coords.longitude;
	console.log(laT);
	console.log(lonG);
	var url = 'https://fcc-weather-api.glitch.me/api/current?lat=laT&lon=lonG';
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState==4 && xhr.status==200) {

			var obj = JSON.parse(xhr.responseText);
			var country = obj.sys.country;
			var location = obj.name;
			var degree = Number(obj.wind.deg);
			var dir = degToCard(degree);

			document.querySelector('#sky').textContent =obj.weather[0].description;
			document.querySelector('#icon').src =obj.weather[0].icon;
			document.querySelector('#temp').textContent =obj.main.temp;
			document.querySelector('#wind').textContent = dir + ' ' +obj.wind.speed + 'knots';
			document.querySelector('#location').textContent = location + ', ' + country;
		} 
	}

	xhr.open('GET',url, true );
	xhr.send();
}


function showWeather() {
	var x = document.querySelector('#alert');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather,showError);
    } else {
        x.innerHTML ="Geolocation is not supported by this browser.";
    }
}