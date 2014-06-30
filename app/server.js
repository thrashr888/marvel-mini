'use strict';

var express = require('express');
var app = express();

var reactMiddleware = require('react-page-middleware');
var REACT_LOCATION = __dirname + '/node_modules/react-tools/src';
var ROOT_DIR = '/Users/thrashr888/workspace/marvel-mini/dist/scripts';

app.use(reactMiddleware.provide({
    logTiming: true,
    pageRouteRoot: ROOT_DIR,            // URLs based in this directory
    useSourceMaps: true,                // Generate client source maps.
    projectRoot: ROOT_DIR,              // Search for sources from
    ignorePaths: function(p) {          // Additional filtering
      return p.indexOf('__tests__') !== -1;
    }
  }))
  .use(express['static'](__dirname + '/src/static_files'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});