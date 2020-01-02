'use strict';

// global dependencies 
const express = require('express');
const methodoverride = require('method-override');

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

// HOME route
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

// DISPLAY RESULTS route
app.get('/results', aircraftRequest);
app.post('/save', saveAircraftToDatabase);
app.post('/delete', deleteAircraft);

// favAircraftPage
// FAV AIRCRAFT route
app.get('/favAircraftPage', retrieveAircraftFromDatabase);
app.post('/retrieve', retrieveAircraftFromDatabase);

// ABOUT TRANSPONDERS route
app.get('/aboutTransponderPage', (req, res) => {
  res.render('pages/learnAboutTransponders');
});

// ABOUT DEV TEAM route
app.get('/aboutDevs', (req, res) => {
  res.render('pages/learnAboutDevs');
});

function retrieveAircraftFromDatabase(request, response) {

  client.query(`SELECT * FROM aircrafts;`).then(savedAircraft => {
    response.render('pages/favoriteAircraft', { aircrafts: savedAircraft.rows });
  }).catch(err => handleError(err, response));
}


function saveAircraftToDatabase(request, response) {
  var instruction = `INSERT INTO aircrafts(
  registration_number, aircraft_type, squawk_code, latitude, longitude, altitude
  ) VALUES (
    $1, $2, $3, $4, $5, $6
    )`;
  // console.log('request.body isis', request.body.reg)
  client.query(instruction, [request.body.reg, request.body.type, request.body.sqk, request.body.lat, request.body.lon, request.body.alt]);
  response.redirect('/results')
}


function deleteAircraft(request, respond) {
  client.query('DELETE FROM aircrafts WHERE id=$1', [request.body.aircraftToDelete]).then(data => {
    respond.redirect('/favAircraftPage');
  }).catch(err => errorHandler(err, response));
}

function handleError(err, response) {
  console.log(err);
  if (response) response.status(500).send('You are wrong. Merry Christmas');
}

app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));




