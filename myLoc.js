window.onload=getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getcurrentPosition(displayLocation);
		} else {
			alert ("No geolocation support");
		}

}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ",Logitude: " + longitude;
}

