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
        let my_marker = new google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: map
        })
    });
}
