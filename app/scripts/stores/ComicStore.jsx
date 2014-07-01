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
    'GET_COMICS': 'onGetComics',
    'GET_COMIC': 'onGetComic'
  },

  endpoint: '/v1/public/comics',
  loading: false,

  initialize: function initialize() {
    this.comics = [];
  },

  _translateCreatorsIds: function _translateComicsIds(creators) {
    for(var i in creators) {
      // console.log(creators[i]);
      creators[i].id = parseInt(creators[i].resourceURI.replace('http://gateway.marvel.com/v1/public/creators/', ''));
    }
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
      // this.comics.push(comic);
      this._translateCreatorsIds(comic.creators.items);
      this.comics[comic.id] = comic;
    }
    this.emit('change');
  },

  onGetComics: function onGetComics(payload) {
    // console.log(payload)
    var page = (payload.page || 1) - 1;
    var path = (payload.endpoint || this.endpoint) +
      '?offset=' + ((payload.limit || 24) * page) +
      '&orderBy=' + (payload.orderBy || '-onsaleDate') +
      '&limit=' + (payload.limit || 24);
    var url = Config.marvelApiEndpoint + path + '&apikey=' + Config.marvelUserKey;
    console.log('onGetComics.url', url)
    this.loading = true;
    this.emit('change');

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        // console.log('comics res', res)
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

  onGetComic: function onGetComic(id) {
    var path = this.endpoint + '/' + id;
    var url = Config.marvelApiEndpoint + path + '?apikey=' + Config.marvelUserKey;
    this.loading = true;
    this.emit('change');

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        // console.log('comic res', res)
        this.loading = false;
        this.emit('change');
        this.onAddComics({comics: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        this.loading = false;
        this.emit('change');
      }.bind(this)
    });
  },

  getComic: function getComic(id) {
    // console.log('getComic', parseInt(id))
    id = parseInt(id);
    var comics = this.comics.filter(function (comic) {
        // console.log('getComic', comic.id, id)
        return (comic.id === id);
      });
    if (!comics) {
      // TODO: test this
      return this.onGetComic(id);
    } else {
      return comics[0];
    }
  },

  sortByDate: function sortByDate(a, b) {
    return a.dates[0].date < b.dates[0].date;
  },

  getComics: function getComics(page, length) {
    page = (page || 1) - 1;
    var start = length * page,
      end = (length * page) + length;
    return {
      comics: this.comics.sort(this.sortByDate).slice(start, end)
    };
  },

  getFeaturedComics: function getFeaturedComics(count) {
    return {
      loading: this.loading,
      comics: this.comics.sort(this.sortByDate).slice(0, count || 4)
    };
  },

  getCreatorComics: function getCreatorComics(creatorId) {
    return {
      loading: this.loading,
      comics: this.comics.filter(function(comic){
          for(var i in comic.creators.items) {
            if (comic.creators.items[i].id === creatorId) {
              return comic;
            }
          }
        }).sort(this.sortByDate)
    };
  },

  getState: function getState() {
    return {
      loading: this.loading,
      comics: this.comics.sort(this.sortByDate)
    };
  }
});

module.exports = ComicStore;