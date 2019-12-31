'use strict';
const superagent = require('superagent');
function handleError(err, response) {
    // console.log(err);
    if (response) response.status(500).send('You are wrong. Merry Christmas');
}
function Location(query, response) {
    this.search_query = query;
    this.formatted_query = response.body.results[0].formatted_address;
    this.latitude = response.body.results[0].geometry.location.lat;
    this.longitude = response.body.results[0].geometry.location.lng;
}
function handleLocationRequest(request, response) {
    superagent.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env._LOCATION_API_KEY}`
    ).then(result => {
        const place = new Location(request.query.data, result);
        // console.log(place)
        response.send(place)
    }).catch(err => handleError(err, response))
}
module.exports = handleLocationRequest;