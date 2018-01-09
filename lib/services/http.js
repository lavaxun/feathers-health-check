var requestObj = require('request');

class Service {
  constructor(options = {}) {
    this.options = options;
  }

  find (params) {
    const url = this.options;
    return new Promise(function(resolve, reject) {
      requestObj(url, function(err, res, body) {
        if (err) {
          return reject(new Error('Offline'));
        }

        return resolve('Online');
      });
    });
  }
}

module.exports = function init (options) {
  return new Service(options);
}
