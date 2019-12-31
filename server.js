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

// get routes 
app.get('/locationPacket', handleLocationRequest);
app.get('/results', handleAircraftRequest);

app.listen(PORT, () => console.log(`Now we cooking on port ${PORT}`));