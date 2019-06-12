var map;
var vehicleData = [
    {id: "mXfkjrFw", location: {lat: 42.3453, lng: -71.0464}},
    {id: "nZXB8ZHz", location: {lat: 42.3662, lng: -71.0621}},
    {id: "Tkwu74WC", location: {lat: 42.3603, lng: -71.0547}},
    {id: "5KWpnAJN", location: {lat: 42.3472, lng: -71.0802}},
    {id: "uf5ZrXYw", location: {lat: 42.3663, lng: -71.0544}},
    {id: "VMerzMH8", location: {lat: 42.3542, lng: -71.0704}},
];

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 14
    });

    vehicleData.forEach(function(car) {
        let marker = new google.maps.Marker(
            {position: car.location, map: map, icon: "car.png"});
    });

    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let my_marker = new google.maps.Marker({
            position: {lat, lng},
            map: map
        })
        markCars(lat,lng)
    });
}

function markCars(lat, lng) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://hans-moleman.herokuapp.com/rides");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("username=ciuyoepn&lat=" + lat + "&lng=" + lng);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cars = JSON.parse(xhr.responseText);

            cars.forEach(function(car) {
                let position = {lat: car.lat, lng: car.lng}
                let marker = new google.maps.Marker({position, map, icon: "car.png"});
            });
        }
    }
}