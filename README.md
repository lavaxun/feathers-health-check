# health-check

[![Build Status](https://travis-ci.org/https://github.com/axnux/health-check.png?branch=master)](https://travis-ci.org/https://github.com/axnux/health-check)
[![Code Climate](https://codeclimate.com/github/https://github.com/axnux/health-check/badges/gpa.svg)](https://codeclimate.com/github/https://github.com/axnux/health-check)
[![Test Coverage](https://codeclimate.com/github/https://github.com/axnux/health-check/badges/coverage.svg)](https://codeclimate.com/github/https://github.com/axnux/health-check/coverage)
[![Dependency Status](https://img.shields.io/david/https://github.com/axnux/health-check.svg?style=flat-square)](https://david-dm.org/https://github.com/axnux/health-check)
[![Download Status](https://img.shields.io/npm/dm/health-check.svg?style=flat-square)](https://www.npmjs.com/package/health-check)

> a plugin to perform healthcheck for feathers application

## Installation

```
npm install health-check --save
```

## Documentation

TBD

## Complete Example

Here's an example of a Feathers server that uses `health-check`. 

```js
const feathers = require('@feathersjs/feathers');
const plugin = require('health-check');

// Initialize the application
const app = feathers();

// Initialize the plugin
app.configure(plugin());
```

## License

Copyright (c) 2018

Licensed under the [MIT license](LICENSE).
