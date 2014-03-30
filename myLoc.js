window.onload=getMyLocation;

var gmap;
var options = { enableHighAccuracy:true, timeout:1000, maximumAge:10000 };

function showMap(coords){
    /* alert ("In show Map"); */
	
    var googleLatAndLong = new google.maps.LatLng(coords.latitude,coords.longitude);
    var mapOptions = {
        zoom:15,
        center: googleLatAndLong
        /* mapTypeId: google.maps.MapTypeId.ROADMAP */
    };
    var mapDiv = document.getElementById("map-canvas");
    /* alert ("Draw Map"); */
    gmap = new google.maps.Map(mapDiv, mapOptions);
	var title = "You are Here";
	var showlat = Math.round((coords.latitude + 0.00001) * 10000) / 10000;
	var showlong = Math.round((coords.longitude + 0.00001) * 10000) / 10000;

	var content = "You are at: " + showlat + " , " + showlong;
	addMarker(gmap, googleLatAndLong, title, content);
	/* ThaiAddress(gmap); */
    /* alert ("out show Map"); */
}

function getMyLocation() {
	if (navigator.geolocation) {
		/* alert ("Has Geolocation Support"); */
		navigator.geolocation.getCurrentPosition(displayLocation, displayError,options); 
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;
		/* detectBrowser(); */
	} else {
			alert ("Sorry, your device has No GeoLocation support, I can't map you");
		   }
}

function scrollMapToPosition(coords) {
	var latitude = coords.latitude;
	var longitude = corrds.longitude;
	var latlong = new google.maps.LatLong(latitude,longitude);
	gmap.panTo(latlong);
	addMarker (gmap, latlong, "New Location", "moved to: " + latitude + ", " + longitude);
}

var watchId = null;

function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

function clearWatch() {
	if (watchId) {
		navigator.geolocation.clearWatch(watchId);
	}
}

function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map-canvas");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}
function displayError(error) {
    var errorTypes = {
        0: "Error Code 0: Unknown Error",
        1: "Error Code 1: Permission denied by user or Not Served up by a Web Server",
        2: "Error Code 2: Sorry, your Position is not available",
        3: "Error Code 3: Sorry, you must be out of GPS range, your location request timed out"
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


var ThaiCoords = {
	latitude: 30.8904798,
	longitude: -85.3720475
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

function degreesToRadians(degrees) {
    var radians = (degrees * Math.PI)/180;
    return radians;
}   

function displayLocation(position) {
    /* alert ("Display Location"); */
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    /* alert ("lat: " + latitude + " long: " + longitude); */
    var location = document.getElementById("location");
    location.innerHTML = "Lat: " + latitude + ", long: " + longitude;
    /* alert ("Call show Map"); */
	if (gmap == null) {
		showMap(position.coords);
	} else {
		scrollMapToPosition(position.coords);
	}
	/*
 	var km = computeDistance(position.coords, ThaiCoords);
    var miles = km * 0.621371192;
	miles = Math.round((miles + 0.00001) * 100) / 100;
    var distance = document.getElementById("distance");
    distance.innerHTML = "You are " + miles + " Miles from Thai Spice";
	*/

}

function addMarker(map, latLong, title, content){
	var markerOptions = {
		position: latLong,
		map: map,
		title: title,
		clickable: true
		};
	var marker = new google.maps.Marker(markerOptions);
	var infoWindowOptions = {
		content: content,
		position: latLong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});

}


function ThaiAddress(gmap) {
  var geocoder = new google.maps.Geocoder();
  var address = '225 North Rutherford Blvd, Murfreesboro TN 37130';
  /* show thai address */
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      gmap.setCenter(results[0].geometry.location);
	  var marker = new google.maps.Marker({
          map: gmap,
          position: results[0].geometry.location,
		  title: 'thai spice'
      });
	  ThaiCoords = results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function displayLocation_debug(position) {
    alert ("Display Location");
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert ("lat: " + latitude + " long: " + longitude);
    var div = document.getElementById("location");
    div.innterHTML = "Lat: " + latitude + ", long: " + longitude;
    var km = computeDistance(position.coords, kensCoords);
    var miles = km * 0.621371192;
    var distance = document.getElementById("distance");
    distance.innerHTML = "Distance: " + km + " km from the WickedlySmart HQ / Miles: " + miles;
}
