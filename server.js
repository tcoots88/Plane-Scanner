'use strict';

// global dependencies 
const express = require('express');
// const methodoverride = require('method-override');

// local dependencies
const locationRequest = require('./public/modules/location').handleLocationRequest;
const aircraftRequest = require('./public/modules/aircraft').handleAircraftRequest;

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

// get routes
app.get('/', (req, res) => {
  res.render('./index');
});

// REG NUM route
app.get('/regNumSearchPage', (req, res) => {
  res.render('pages/RegNumSearch');
});

// SQUAWK CODE route
app.get('/squawkSearchPage', (req, res) => {
  res.render('pages/SquawkSearch');
});

// LOCATION route
app.get('/LocationSearchPage', (req, res) => {
  res.render('pages/proximitySearch');
});

app.get('/results', aircraftRequest);
app.post('/save', saveAircraftToDatabase);
app.post('/delete', deleteAircraft);
app.post('/retrieve', retrieveAircraftFromDatabase);



function retrieveAircraftFromDatabase(request, response) {

  client.query(`SELECT * FROM aircrafts;`).then(savedAircraft => {
    console.log("saved aircraft is " + savedAircraft);
    response.render('pages/results', { aircrafts: savedAircraft.rows });
  }).catch(err => handleError(err, response));
}

function saveAircraftToDatabase (response, request){
var instruction = `INSERT INTO aircrafts(
  registration_number, aircraft_type, squawk_code, latitude, longitude, altitude
  ) VALUES (
    $1, $2, $3, $4, $5, $6
    )`;
  client.query(instruction, [request.body.reg, request.body.type, request.body.sqk, request.body.lat, request.body.lon, request.body.alt]);
    request.render('pages/favoriteAircraft')
}
// showAircraftFromDatabase;


// function updateAircraft(request, respond) {
//   const instruction = `UPDATE aircrafts SET registration_number=$1, aircraft_type=$2, squawk_code=$3, latitude=$4, longitude=$5, altitude=$6 WHERE id=$7`;

//   let values = [request.body.reg, request.body.type, request.body.sqk, request.body.lat, request.body.lon, request.body.alt, request.params.id];

//   client.query(instruction, values).then(() => {
//     respond.redirect(`/detail/${request.params.id}`);
//   })
// }

function deleteAircraft (request, respond){
  client.query('DELETE FROM aircrafts WHERE id=$1', [req.params.id]).then(data => {
    respond.redirect('/');
}).catch(err => errorHandler(err, response));}

function handleError(err, response) {
  console.log(err);
  if (response) response.status(500).send('You are wrong. Merry Christmas');
}

app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));

