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

  endpoint: '/v1/public/comics',
  loading: false,

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
    var page = (payload.page || 1) - 1;
    var path = this.endpoint +
      '?offset=' + (payload.limit * page) +
      '&orderBy=' + (payload.orderBy || '-focDate') +
      '&limit=' + (payload.limit || 24);
    var url = Config.marvelApiEndpoint + path + '&apikey=' + Config.marvelUserKey;
    // console.log('url', url)
    this.loading = true;
    this.emit('change');

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        console.log('comics res', res)
        this.loading = false;
        this.emit('change');
        this.onAddComics({comics: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(payload.url, status, err.toString());
        this.loading = false;
        this.emit('change');
      }.bind(this)
    });
  },

  getComic: function getComic(id) {
    // console.log('getComic', parseInt(id))
    id = parseInt(id);
    return this.comics.filter(function (comic) {
        // console.log('getComic', comic.id, id)
        return (comic.id === id);
      });
  },

  getComics: function getComics(page, length) {
    page = (page || 1) - 1;
    var start = length * page,
      end = (length * page) + length;
    return {
      comics: this.comics.slice(start, end)
    };
  },

  getFeaturedComics: function getFeaturedComics(count) {
    return {
      loading: this.loading,
      comics: this.comics.slice(0, count || 4)
    };
  },

  getState: function getState() {
    return {
      loading: this.loading,
      comics: this.comics
    };
  }
});

module.exports = ComicStore;