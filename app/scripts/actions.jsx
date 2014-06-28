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

  getComics: function getComics(url) {
    this.dispatch('GET_COMICS', {url: url});
  },

  getCreators: function getCreators(url) {
    this.dispatch('GET_CREATORS', {url: url});
  }
};

module.exports = actions;