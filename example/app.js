const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const mongoose = require('./mongoose');
var healthCheck = require('../lib/index');
var path = require('path');

const mongoURI = 'mongodb://localhost:27017/local';
const mongooseConfigKey = 'mongooseClient';

// Initialize the application
const app = express(feathers())
  .use('/healthz', healthCheck.mongo(mongooseConfigKey));
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

// after two seconds disconnect from mongo
setTimeout(function() {
  mongooseClient.disconnect();
}, 1500);

app.listen(3030);

console.log('Feathers authentication app started on 127.0.0.1:3030');