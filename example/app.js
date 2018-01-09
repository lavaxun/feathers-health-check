const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const requestObj = require('request');

const mongoose = require('./mongoose');
var healthCheck = require('../lib/index');

const mongoURI = 'mongodb://localhost:27017/local';
const mongooseConfigKey = 'mongooseClient';

// Initialize the application
const app = express(feathers());
app.configure(express.rest());
app.use('/healthz', healthCheck.mongo(mongooseConfigKey));
app.use('/ping', healthCheck.http('http://google.com'));
app.use('/multi', healthCheck.multi([healthCheck.mongo(mongooseConfigKey), healthCheck.http('http://google.com')]));
app.configure(mongoose(mongoURI));

const mongooseClient = app.get(mongooseConfigKey);
var healthService = app.service('healthz');

mongooseClient.connection.on('connected', function(connected) {
  healthService.find().then(result => {
    console.log('[expected] connected and healthy', result);
    return result;
  }).catch(error => {
    console.log('[unexpected] connected but not healthy', error);
    throw error;
  });
});

mongooseClient.connection.on('disconnected', function (disconnected) {
  healthService.find().then(result => {
    console.log('[unexpected] not connected but healthy', result);
    return result;
  }).catch(error => {
    console.log('[expected] not connected and not healthy', error);
    throw error;
  });
});

// after 2.5 seconds disconnect from mongo
setTimeout(function() {
  mongooseClient.disconnect();
}, 2500);

// after 2 seconds ping health endpoint
setTimeout(function () {
  requestObj('http://localhost:3030/ping', function(err, res, body) {
    if(err) {
      console.log('[unexpected] system is offline');
      return;
    }

    console.log('[expected] system is online');
  });
}, 2000);


// after 1.5 seconds ping health endpoint
setTimeout(function () {
  requestObj('http://localhost:3030/multi', function (err, res, body) {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('[expected] system is healthy');
      return;
    }

    console.log('[unexpected] system is not healthy');
  });
}, 1500);


app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');