const MILES_PER_METER = 0.000621371;
var map;
var infowindow;

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
        xhr.open("POST", "https://comp20-ride-hailing.herokuapp.com/rides");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("username=ciuyoepn&lat=" + my_loc.lat() + "&lng=" + my_loc.lng());
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                cars = JSON.parse(xhr.responseText);

                // Add a marker to each car and compute minimum distance
                closestCar = markCarDistances(cars, my_loc)

                // Draw polyline
                let path = new google.maps.Polyline({
                    path: [my_loc, closestCar.pos],
                    strokeColor: '#FF0000',
                    map: map
                });

                // Set user's infowindow
                my_marker.addListener('click', function(){
                    let content = "<p>Closest Car: " + closestCar.username + "</p>\
                                   <p>Distance: " + closestCar.dist + " miles";
                    infowindow.setContent(content)
                    infowindow.open(map, my_marker);
                });
            }
        }
    });
}

// Find the closest car in the list 'cars' to the location 'my_loc'
// Adds infowindows to each car that display their distance from 'my_loc'
// Returns a dictionary with the fields:
//  dist:     the distance between the closest car and 'my_loc' in miles
//  pos:      a LatLng object describing the position of the closest car
//  username: the username of the closest car
function markCarDistances(cars, my_loc)
{
    let minDist = null;
    let closestPos = null;
    let closestUsername = null;

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
            infowindow.setContent("<p>Distance: " + dist + " miles </p>");
            infowindow.open(map, marker);
        });
    });

    return {dist: minDist, pos: closestPos, username: closestUsername};
}
