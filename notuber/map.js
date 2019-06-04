var map;
var vehicleData = [
    {id: "mXfkjrFw", loc: {lat: 42.3453, lng: -71.0464}},
    {id: "nZXB8ZHz", loc: {lat: 42.3662, lng: -71.0621}},
    {id: "Tkwu74WC", loc: {lat: 42.3603, lng: -71.0547}},
    {id: "5KWpnAJN", loc: {lat: 42.3472, lng: -71.0802}},
    {id: "uf5ZrXYw", loc: {lat: 42.3663, lng: -71.0544}},
    {id: "VMerzMH8", loc: {lat: 42.3542, lng: -71.0704}},
];

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.352271, lng: -71.05524200000001},
        zoom: 14
    });

    vehicleData.forEach(function(car) {
        var marker = new google.maps.Marker(
            {position: car.loc, map: map, icon: "car.png"});
    });
}
