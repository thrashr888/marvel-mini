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

  getComics: function getComics(payload, callback) {
    payload.callback = callback;
    this.dispatch('GET_COMICS', payload);
  },

  getComic: function getComic(payload, callback) {
    payload.callback = callback;
    this.dispatch('GET_COMIC', payload);
  },

  getCreators: function getCreators(payload, callback) {
    payload.callback = callback;
    this.dispatch('GET_CREATORS', payload);
  },

  getCreator: function getCreator(payload, callback) {
    payload.callback = callback;
    this.dispatch('GET_CREATOR', payload);
  }
};

module.exports = actions;