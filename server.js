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

// HOME route
app.get('/', (req, res) => {
  res.render('./index');
});

// FAV AIRCRAFT route
app.get('/favAircraftPage', (req, res) => {
  res.render('pages/favoriteAircraft');
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

// ABOUT TRANSPONDERS route
app.get('/aboutTransponderPage', (req, res) => {
  res.render('pages/learnAboutTransponders');
});

// ABOUT DEV TEAM route
app.get('/aboutDevs', (req, res) => {
  res.render('pages/learnAboutDevs');
});




app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));

