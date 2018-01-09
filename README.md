# feathers-health-check

[![Build Status](https://travis-ci.org/https://github.com/axnux/feathers-health-check.png?branch=master)](https://travis-ci.org/https://github.com/axnux/feathers-health-check)
[![Code Climate](https://codeclimate.com/github/https://github.com/axnux/feathers-health-check/badges/gpa.svg)](https://codeclimate.com/github/https://github.com/axnux/feathers-health-check)
[![Test Coverage](https://codeclimate.com/github/https://github.com/axnux/feathers-health-check/badges/coverage.svg)](https://codeclimate.com/github/https://github.com/axnux/feathers-health-check/coverage)
[![Dependency Status](https://img.shields.io/david/https://github.com/axnux/feathers-health-check.svg?style=flat-square)](https://david-dm.org/https://github.com/axnux/feathers-health-check)
[![Download Status](https://img.shields.io/npm/dm/feathers-health-check.svg?style=flat-square)](https://www.npmjs.com/package/feathers-health-check)

> a plugin to perform healthcheck for feathers application

## Installation

```
npm install feathers-health-check --save
```

## Documentation

TBD

## Complete Example

Here's an example of a Feathers server that uses `feathers-health-check`. 

```js
const feathers = require('@feathersjs/feathers');
const healthCheck = require('feathers-health-check');
const mongoose = require('./mongoose');

// Initialize the application
const app = feathers();

// you must have configure mongooseClient using 'feathers-mongoose'
app.configure(mongoose());

// Initialize the plugin
app.configure(healthCheck.mongo('mongooseClient'));
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
