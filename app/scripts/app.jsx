/**
 * @jsx React.DOM
 */
/*globals document*/

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');

var actions = require('./actions.jsx');
var config = require('./config.jsx');

var Application = require('./components/Application.jsx');
var ComicStore = require('./stores/ComicStore.jsx');
var CreatorStore = require('./stores/CreatorStore.jsx');

var stores = {
  ComicStore: new ComicStore(),
  CreatorStore: new CreatorStore()
};

var flux = new Fluxxor.Flux(stores, actions);
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

React.renderComponent(
  <Application flux={flux} />,
  document.getElementById('main')
);
