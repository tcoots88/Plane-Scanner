'use strict';

const superagent = require('superagent');

function Aircraft(registration_number, aircraft_type, squawk_code, latitude, longitude, altitude) {

    this.registration_number = validateAircraftStringInput(registration_number),
    this.aircraft_type = validateAircraftStringInput(aircraft_type),
    this.squawk_code = validateAircraftIntegerInput(squawk_code),
    this.latitude = validateAircraftFloatInput(latitude),
    this.longitude = validateAircraftFloatInput(longitude),
    this.altitude = validateAircraftIntegerInput(altitude)
}

function validateAircraftStringInput(value) {
    
    if (value === "") {
        return 'NO DATA';
    } else {
        return value;
    }
}

function validateAircraftIntegerInput(value) {
    
    if (value === '') {
        return 12345;
    } else {
        return value;
    }
}

function validateAircraftFloatInput(value) {
    
    if (value === '') {
        return 12345.12345;
    } return value;
}

function handleError(err, response) {
    console.log(err);
    if (response) response.status(500).send('You are wrong. Merry Christmas');
}

function handleLocationRequest(request, response) {


    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.proximity}&key=${process.env.LOCATION_API_KEY}`;

    superagent.get(url)
        .then(result => {

            // check if good data from google location API
            // render no results page if input data is bad
            if (result.body.results[0] === undefined) {
                response.render('pages/noResults', {})
            } else {

                let latitude = result.body.results[0].geometry.location.lat;
                let longitude = result.body.results[0].geometry.location.lng;

                let urlProximity = `https://adsbexchange-com1.p.rapidapi.com/json/lat/${latitude}/lon/${longitude}/dist/${request.query.radius}/`;

                superagent.get(urlProximity)
                    .set('x-rapidapi-host', `adsbexchange-com1.p.rapidapi.com`)
                    .set('x-rapidapi-key', `${process.env.FLIGHT_API_KEY}`)
                    .then(dataFromEndpoint => {

                        if (dataFromEndpoint.body.ac === null) {
                            response.render('pages/noResults', {})
                        } else {

                            const aircraftDataFromEndPoint = dataFromEndpoint.body.ac;

                            const aircraftArray = aircraftDataFromEndPoint.map(aircraftItem => {
                                const registration_number = aircraftItem.reg;
                                const aircraft_type = aircraftItem.type;
                                const squawk_code = aircraftItem.sqk;
                                const latitude = aircraftItem.lat;
                                const longitude = aircraftItem.lon;
                                const altitude = aircraftItem.alt;
                                return new Aircraft(registration_number, aircraft_type, squawk_code, latitude, longitude, altitude);
                            });

                            response.render('pages/results', { aircraftData: aircraftArray });
                        }

                    }).catch(err => handleError(err, response));

            }
        }).catch(err => handleError(err, response))
}
module.exports = handleLocationRequest;