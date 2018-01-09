class Service {
  constructor(options = {}) {
    this.options = options;
  }

  find (params) {
    const mongoClientKey = this.options || 'mongooseClient';
    const mongooseClient = this.app.get(mongoClientKey);
    if (mongooseClient.connection.readyState === 1) {
      return Promise.resolve('Connected');
    }
    throw new Error('Disconnected');
  }

  setup(app) {
    this.app = app;
  }
}

module.exports = function init (options) {
  return new Service(options);
}
