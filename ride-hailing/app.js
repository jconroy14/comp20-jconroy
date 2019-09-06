const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 5000;
const MongoURI = process.env.MONGODB_URI || 'mongodb://localhost/ride-hailing-db';

/////////////////////////////////////////
// Set up app and POST /rides endpoint //
/////////////////////////////////////////

var db = MongoClient.connect(MongoURI, function(error, databaseConnection) {
    db = databaseConnection;
});

const app = express();
app.use(express.urlencoded());
app.use(cors());

app.post('/rides', function(req, res) {
    var response;
    if (isValid(req.body)) {
        response = getVehicles();

        db.collection("requests", function(err, coll) {
            const toInsert = {"username": req.body.username,
                              "lat": parseFloat(req.body.lat),
                              "lng": parseFloat(req.body.lng)};
            coll.insertOne(toInsert);
        });
    } else {
        response = {"error":"Whoops, something is wrong with your data!"};
    }
    res.send(response);
});

app.listen(PORT);

//////////////////////////////////////
// Helper Functions for POST /rides //
//////////////////////////////////////

function getVehicles() {
    return [{"_id":"5cdf411856e9c200042989d7","username":"JANET","lat":42.354951,"lng":-71.0509,"created_at":"2019-05-17T23:17:44.427Z"},
            {"_id":"5cf583aafbbfe80004456918","username":"mXfkjrFw","lat":42.3453,"lng":-71.0464,"created_at":"2019-06-03T20:31:38.378Z"},
            {"_id":"5cf583aafbbfe80004456919","username":"nZXB8ZHz","lat":42.3662,"lng":-71.0621,"created_at":"2019-06-03T20:31:38.611Z"},
            {"_id":"5cf583aafbbfe8000445691a","username":"Tkwu74WC","lat":42.3603,"lng":-71.0547,"created_at":"2019-06-03T20:31:38.786Z"},
            {"_id":"5cf583aafbbfe8000445691b","username":"5KWpnAJN","lat":42.3472,"lng":-71.0802,"created_at":"2019-06-03T20:31:38.932Z"},
            {"_id":"5cf583abfbbfe8000445691c","username":"uf5ZrXYw","lat":42.3663,"lng":-71.0544,"created_at":"2019-06-03T20:31:39.077Z"},
            {"_id":"5cf583acfbbfe8000445691d","username":"VMerzMH8","lat":42.3542,"lng":-71.0704,"created_at":"2019-06-03T20:31:40.400Z"}];
};

function isValid(input) {
    return "username" in input && "lat" in input && "lng" in input
            && !isNaN(input.lat)
            && !isNaN(input.lng);
}