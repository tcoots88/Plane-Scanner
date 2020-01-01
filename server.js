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



app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));

