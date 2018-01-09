class Service {
  constructor(options = {}) {
    this.options = options;
  }

  find (params) {
    const promisesList = this.options;
    const app = this.app;
    let promiseChain;
    
    for (var i = 0; i < promisesList.length; i++) {
      const index = i;
      const checker = promisesList[index];
      if (checker.setup) {
        checker.setup(app);
      }
      if (!promiseChain) {
        promiseChain = checker.find();
      } else {
        promiseChain = promiseChain.then(function(debug) {
          return checker.find();
        });
      }
    }
    
    return promiseChain;
  }

  setup(app) {
    this.app = app;
  }
}

module.exports = function init (options) {
  return new Service(options);
}
