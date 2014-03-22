window.onload=getMyLocation;

var gmap;

function showMap(coords){
  alert ("In show Map");
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
    var mapOptions = {
        zoom:10,
        center: googleLatAndLong
        /* mapTypeId: google.maps.MapTypeId.ROADMAP */
    };
    var mapDiv = document.getElementById("map");
    alert ("Draw Map");
    gmap = new google.maps.Map(mapDiv, mapOptions);
    alert ("out show Map");
}

function getMyLocation() {
	if (navigator.geolocation) {
		alert ("Has Geolocation Support");
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
			alert ("No geolocation support");
		   }
}

function displayError(error) {
    var errorTypes = {
        0: "Error Code 0: Unknown Error",
        1: "Error Code 1: Permission denied by user or Not Served up by a Web Server",
        2: "Error Code 2: Position is not available",
        3: "Error Code 3: Request timed out"
    };
    var errorMessage = errorTypes[error.code];
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    } 
    var div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

var ourCoords = {
    latitude: 47.624851,
    longitude: -122.52099
};

function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians (startCoords.latitude);    
    var startLongRads = degreesToRadians (startCoords.longitude);     
    var destLatRads = degreesToRadians (destCoords.latitude);    
    var destLongRads = degreesToRadians(destCoords.longitude);
    var Radius = 6371;
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function displayLocation_debug(position) {
    alert ("Display Location");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert ("lat: " + latitude + " long: " + longitude);
    var div = document.getElementById("location");
    div.innterHTML = "Lat: " + latitude + ", long: " + longitude;
    var km = computeDistance(position.coords, ourCoords);
    var miles = km * 0.621371192;
    var distance = document.getElementById("distance");
    distance.innerHTML = "Distance: " + km + " km from the WickedlySmart HQ / Miles: " + miles;
}

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}   

function displayLocation(position) {
    /* alert ("Display Location"); */
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    /* alert ("lat: " + latitude + " long: " + longitude); */
    var div = document.getElementById("location");
    div.innterHTML = "Lat: " + latitude + ", long: " + longitude;
    var km = computeDistance(position.coords, ourCoords);
    var miles = km * 0.621371192;
    var distance = document.getElementById("distance");
    distance.innerHTML = "Distance: " + km + " km from the WickedlySmart HQ / Miles: " + miles;
    alert ("Call show Map");
    showMap(position.coords);
    
}