'use strict';
const superagent = require('superagent');
const getLocation = require('./location.js');

function handleError(err, response) {
    if (response) response.status(500).send('You are wrong. Merry Christmas');
}

function Aircraft(registration_number, aircraft_type, squawk_code, latitude, longitude, altitude) {

    this.registration_number = validateAircraftStringInput(registration_number),
    this.aircraft_type = validateAircraftStringInput(aircraft_type),
    this.squawk_code = validateAircraftIntegerInput(squawk_code),
    this.latitude = validateAircraftFloatInput(latitude),
    this.longitude = validateAircraftFloatInput(longitude),
    this.altitude = validateAircraftIntegerInput(altitude)
}

function validateAircraftStringInput(value) {
    
    if (value === '') {
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


function handleAircraftRequest(request, response) {

    let url = 'empty';

    // gets API URL endpoint from user's search type
    switch (request.query.searchType) {
        case "squawkURL":
            url = `https://adsbexchange-com1.p.rapidapi.com/sqk/${request.query.squawk}/`;
            break;
        case "registrationURL":
            url = `https://adsbexchange-com1.p.rapidapi.com/registration/${request.query.registration}/`;
            break;
        case "proximityUrl":
            getLocation(request, response);
            break;
    }

    if (url !== 'empty') {

        superagent.get(url)
            .set('x-rapidapi-host', `adsbexchange-com1.p.rapidapi.com`)
            .set('x-rapidapi-key', `${process.env.FLIGHT_API_KEY}`)
            .then(dataFromEndpoint => {

                // if aircraft data is empty, show a no results page
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
}
exports.handleAircraftRequest = handleAircraftRequest;