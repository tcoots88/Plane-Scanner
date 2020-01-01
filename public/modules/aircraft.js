'use strict';
const superagent = require('superagent');
const getLocation = require('./location.js');

function handleError(err, response) {
    if (response) response.status(500).send('You are wrong. Merry Christmas');
}

function Aircraft(registration_number = 'No Record', aircraft_type = 'No Record', squawk_code = 'No Record', latitude = 'No Record', longitude = 'No Record', altitude = 'No Record') {
    this.registration_number = registration_number,
        this.aircraft_type = aircraft_type,
        this.squawk_code = squawk_code,
        this.latitude = latitude,
        this.longitude = longitude,
        this.altitude = altitude
}

function handleAircraftRequest(request, response) {
    
    let url;

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

    if (url !== undefined) {

    superagent.get(url)
        .set('x-rapidapi-host', `adsbexchange-com1.p.rapidapi.com`)
        .set('x-rapidapi-key', `${process.env.FLIGHT_API_KEY}`)
        .then(dataFromEndpoint => {

            if (dataFromEndpoint.body.ac === null) {
                response.render('pages/noResults', {})
            }

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
        }).catch(err => handleError(err, response));
    }
}
exports.handleAircraftRequest = handleAircraftRequest;