'use strict';

// global dependencies 
const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const $ = require('jquery')
// const methodoverride = require('method-override');

require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// psql dependencies
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', error => console.log(error));
client.connect();

// get routes AKA middleware
app.get('/locationPacket', handleLocationRequest);



// Constructor Functions

function Aircraft(registration_number, aircraft_type, squawk_code, latitude, longitude, altitude) {
    this.registration_number = registration_number,
        this.aircraft_type = aircraft_type,
        this.squawk_code = squawk_code,
        this.latitude = latitude,
        this.longitude = longitude,
        this.altitude = altitude
    // console.log('this is ', this)
}

function Location(query, response) {
    this.search_query = query;
    this.formatted_query = response.body.results[0].formatted_address;
    this.latitude = response.body.results[0].geometry.location.lat;
    this.longitude = response.body.results[0].geometry.location.lng;
}


// API call functions
function handleLocationRequest(request, response) {
    superagent.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`
    ).then(result => {
        const place = new Location(request.query.data, result);
        // console.log(place)
        response.send(place)
    }).catch(err => handleError(err, response))
}
function handleError(err, response) {
    // console.log(err);
    if (response) response.status(500).send('You are wrong. Merry Christmas');

}

app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));