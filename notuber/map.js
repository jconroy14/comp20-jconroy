const MILES_PER_METER = 0.000621371;
var map;
var infowindow;

var staticCars = [
    {username: "mXfkjrFw", lat: 42.3453, lng: -71.0464},
    {username: "nZXB8ZHz", lat: 42.3662, lng: -71.0621},
    {username: "Tkwu74WC", lat: 42.3603, lng: -71.0547},
    {username: "5KWpnAJN", lat: 42.3472, lng: -71.0802},
    {username: "uf5ZrXYw", lat: 42.3663, lng: -71.0544},
    {username: "VMerzMH8", lat: 42.3542, lng: -71.0704}
];

function initMap(){
    // Set up global variables (map and infowindow)
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 11
    });
    infowindow = new google.maps.InfoWindow();

    // Process dynamically-loaded cars
    navigator.geolocation.getCurrentPosition(function(position) {
        // Get user's position
        let my_loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let my_marker = new google.maps.Marker({
            position: my_loc,
            map: map
        });

        // Get list of cars from the Ride-Sharing API
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://hans-moleman.herokuapp.com/rides");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username=ciuyoepn&lat=" + my_loc.lat() + "&lng=" + my_loc.lng());
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cars = JSON.parse(xhr.responseText);
                cars.push(...staticCars); // We also process the static cars

                let minDist = null;
                let closestPos = null;
                let closestUsername = null;

                // Add a marker to each car and compute minimum distance
                cars.forEach(function(car) {
                    let position = new google.maps.LatLng(car.lat, car.lng);
                    let marker = new google.maps.Marker({position, map, icon: "car.png"});

                    let dist = MILES_PER_METER * google.maps.geometry.spherical.computeDistanceBetween(my_loc, position);
                    if (!minDist || dist < minDist) {
                        minDist = dist;
                        closestPos = position;
                        closestUsername = car.username;
                    }

                    marker.addListener('click', function(){
                        infowindow.setContent("<p>Distance: " + dist + " miles </p>");                    infowindow.open(map, my_marker);
                        infowindow.open(map, marker);
                    });
                });

                // Draw polyline
                let path = new google.maps.Polyline({
                    path: [my_loc, closestPos],
                    strokeColor: '#FF0000',
                    map: map
                });

                // Set user's infowindow
                my_marker.addListener('click', function(){
                    let content = "<p>Closest Car: " + closestUsername + "</p>\
                                   <p>Distance: " + minDist + " miles";
                    infowindow.setContent(content)
                    infowindow.open(map, my_marker);
                });
            }
        }
    });
}