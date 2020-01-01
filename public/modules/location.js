'use strict';

const superagent = require('superagent');

function Aircraft(registration_number = 'No Record', aircraft_type = 'No Record', squawk_code = 'No Record', latitude = 'No Record', longitude = 'No Record', altitude = 'No Record') {
    this.registration_number = registration_number,
        this.aircraft_type = aircraft_type,
        this.squawk_code = squawk_code,
        this.latitude = latitude,
        this.longitude = longitude,
        this.altitude = altitude
}

function handleError(err, response) {
    // console.log(err);
    if (response) response.status(500).send('You are wrong. Merry Christmas');
}

function handleLocationRequest(request, response) {

    
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.proximity}&key=${process.env.LOCATION_API_KEY}`;
    
    superagent.get(url)
    .then(result => {
        
        //console.log(result.body.results[0].geometry.location);

        let latitude = result.body.results[0].geometry.location.lat;
        let longitude = result.body.results[0].geometry.location.lng;

        
        let urlProximity = `https://adsbexchange-com1.p.rapidapi.com/json/lat/${latitude}/lon/${longitude}/dist/${request.query.radius}/`;

        //console.log(urlProximity);

        superagent.get(urlProximity)
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
        

    }).catch(err => handleError(err, response))
}
module.exports = handleLocationRequest;