const mongoose = require('mongoose');

module.exports = function(mongoURI) {
  return function (app) {
    mongoose.connect(mongoURI, {
      useMongoClient: true
    });
    mongoose.Promise = global.Promise;

    app.set('mongooseClient', mongoose);
  };
};