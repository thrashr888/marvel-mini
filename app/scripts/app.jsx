/**
 * @jsx React.DOM
 */
/*globals document*/

'use strict';

var React = require('react/react.js');

var Application = require('./components/Application.jsx');

console.log('okay');

React.renderComponent(
  <Application />,
  document.getElementById('main')
);
