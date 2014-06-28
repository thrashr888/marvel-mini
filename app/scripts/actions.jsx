/**
 * @jsx React.DOM
 */

'use strict';

/**
 * Flux Actions
 */
var actions = {
  addComics: function addComics(comics) {
    this.dispatch('ADD_COMICS', {comics: comics});
  },

  addCreators: function addCreators(creators) {
    this.dispatch('ADD_CREATORS', {creators: creators});
  },

  getComics: function getComics(payload) {
    this.dispatch('GET_COMICS', payload);
  },

  getCreators: function getCreators(payload) {
    this.dispatch('GET_CREATORS', payload);
  }
};

module.exports = actions;