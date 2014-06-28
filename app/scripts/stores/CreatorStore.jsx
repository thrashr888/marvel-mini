/**
 * @jsx React.DOM
 */
/*globals $*/

'use strict';

var Fluxxor = require('fluxxor/index.js');

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
      this.creators.push({
        id: creator.id || uuid.v4(),
        name: creator.name
      });
    }
    this.emit('change');
  },

  onGetCreators: function onGetDocs(payload) {
      // console.log(payload)
    $.ajax({
      url: payload.url,
      dataType: 'json',
      success: function(res) {
        this.onAddCreators({creators: res.creators});
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