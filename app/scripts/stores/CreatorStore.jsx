/**
 * @jsx React.DOM
 */

'use strict';

var Fluxxor = require('fluxxor/index.js');
var $ = require('jquery');
var Config = require('../config.jsx');

var CreatorStore = Fluxxor.createStore({
  actions: {
    'ADD_CREATORS': 'onAddCreators',
    'GET_CREATORS': 'onGetCreators'
  },

  initialize: function initialize() {
    this.creators = [];
  },

  onAddCreators: function onAddCreators(payload) {
    for (var i = 0, l = payload.creators.length; i < l; i++) {
      var creator = payload.creators[i];
      // console.log(creator)
      // comics, events, firstName, fullName, id, lastName, middleName
      // modified, resourceURI, series, stories, suffix, thumbnail, urls
      this.creators.push(creator);
    }
    this.emit('change');
  },

  onGetCreators: function onGetDocs(payload) {
      // console.log(payload)
    $.ajax({
      url: Config.marvelApiEndpoint + payload.url + '&apikey=' + Config.marvelUserKey,
      dataType: 'json',
      success: function(res) {
        console.log('creators res', res)
        this.onAddCreators({creators: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(payload.url, status, err.toString());
      }.bind(this)
    });
  },

  getState: function getState() {
    return {
      creators: this.creators
    };
  }
});

module.exports = CreatorStore;