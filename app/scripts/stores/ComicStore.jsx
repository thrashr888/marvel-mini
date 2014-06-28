/**
 * @jsx React.DOM
 */

'use strict';

var Fluxxor = require('fluxxor/index.js');
var $ = require('jquery');
var Config = require('../config.jsx');

var ComicStore = Fluxxor.createStore({
  actions: {
    'ADD_COMICS': 'onAddComics',
    'GET_COMICS': 'onGetComics'
  },

  initialize: function initialize() {
    this.comics = [];
  },

  onAddComics: function onAddComics(payload) {
    for (var i = 0, l = payload.comics.length; i < l; i++) {
      var comic = payload.comics[i];
      // console.log(comic)
      // characters, collectedIssues, collections, creators, dates,
      // description, diamondCode, digitalId, ean, events, formats,
      // id, images, isbn, issn, issueNumber, modified, pageCount,
      // prices, resourceURI, series, stories, textObjects, thumbnail,
      // title, upc, urls, variantDescription, variants
      this.comics.push(comic);
    }
    this.emit('change');
  },

  onGetComics: function onGetComics(payload) {
      // console.log(payload)
    $.ajax({
      url: Config.marvelApiEndpoint + payload.url + '&apikey=' + Config.marvelUserKey,
      dataType: 'json',
      success: function(res) {
        console.log('comics res', res)
        this.onAddComics({comics: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(payload.url, status, err.toString());
      }.bind(this)
    });
  },

  getState: function getState() {
    return {
      comics: this.comics
    };
  }
});

module.exports = ComicStore;