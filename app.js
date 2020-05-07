/*
 *  File    : app.js
 *  Desc.   : JS server | Node.js
 *  Project : Noise pollution | noise_pollution
 *  Author  : D. RS
 *  Source  : Parts of the file come from https://gitlab.com/oscarfrancois/nodejs__example/-/blob/master/index.js
*/

/* main project file */

// import section
const express = require('express');
const fs = require('fs');
const open = require('open');
const path = require('path');
const portfinder = require('portfinder');
const latlon = require('./js/latlon.js');
const fetch = require('node-fetch');

// instanciate the web server
const app = express();

let airports = {};


/* just send HTTP 200 code when /api/status is called */
app.get('/api/status', function (req, res) {
  res.sendStatus(200);
});

// Serve the api
app.get('/api/compute', (req, res) => {
  // Prepare return data array
  let data = { airports: [] };

  // Get request data
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);
  const distance = Number(req.query.distance);

  // Get airports and check the distances, keep only the ones within the user's input (distance)
  airports.forEach(airport => {

    // Get the distance
    let distBetweenLocAndAirport = latlon.getDistanceFromLatLonInKm(latitude, longitude, airport.lat, airport.lon);
    
    // Keep only airports which distance is <= the user's distance
    if (distBetweenLocAndAirport <= distance) {    
      data.airports.push({name: airport.name, distance: distBetweenLocAndAirport, lon: airport.lon, lat: airport.lat});
    }

  });

  // Response
  res.json(data);
});


// A fetch is done to keep the data in cache
fetch('https://www.flightradar24.com/_json/airports.php')
    .then(res => res.json())
    .then(res => airports = res.rows)
    .catch((err => console.log("Problem found")));


/* to serve static content */
app.use(express.static(__dirname));


/* listen on the first port available 
 * then browse this url
 */
portfinder.getPortPromise()
  .then((portFound) => {
    let server = app.listen(portFound, function () {
      let host = server.address().address;
      port = server.address().port;
      console.log("app listening at: http://%s:%s", host, port);
      open("http://localhost:" + port);
    })
  })
  .catch((err) => {
    console.log("can't find an available port within: [" + portfinder.basePort + ';' + portfinder.highestPort + ']');
  });
