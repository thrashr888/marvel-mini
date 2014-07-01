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
    'GET_CREATORS': 'onGetCreators',
    'GET_CREATOR': 'onGetCreator'
  },

  endpoint: '/v1/public/creators',
  loading: false,

  initialize: function initialize() {
    this.creators = [];
  },

  _translateComicsIds: function _translateComicsIds(comics) {
    for(var i in comics) {
      // console.log(comics[i]);
      comics[i].id = parseInt(comics[i].resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', ''));
    }
    // console.log('translated comics', comics);
  },

  onAddCreators: function onAddCreators(payload) {
    for (var i = 0, l = payload.creators.length; i < l; i++) {
      var creator = payload.creators[i];
      // console.log(creator)
      // comics, events, firstName, fullName, id, lastName, middleName
      // modified, resourceURI, series, stories, suffix, thumbnail, urls
      // this.creators.push(creator);
      this._translateComicsIds(creator.comics.items);
      this.creators[creator.id] = creator;
    }
    this.emit('change');
  },

  onGetCreators: function onGetDocs(payload) {
      // console.log(payload)
    var path = this.endpoint +
      '?orderBy=' + (payload.orderBy || '-modified') +
      '&limit=' + (payload.limit || 48);
    var url = Config.marvelApiEndpoint + path + '&apikey=' + Config.marvelUserKey;
    this.loading = true;
    this.emit('change');

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        // console.log('creators res', res)
        this.loading = false;
        this.emit('change');
        this.onAddCreators({creators: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(payload.url, status, err.toString());
        this.loading = false;
        this.emit('change');
      }.bind(this)
    });
  },

  onGetCreator: function onGetCreator(id) {
    var path = this.endpoint + '/' + id;
    var url = Config.marvelApiEndpoint + path + '?apikey=' + Config.marvelUserKey;
    this.loading = true;
    this.emit('change');

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(res) {
        // console.log('creator res', res)
        this.loading = false;
        this.emit('change');
        this.onAddCreators({creators: res.data.results});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        this.loading = false;
        this.emit('change');
      }.bind(this)
    });
  },

  getCreator: function getCreator(id) {
    // console.log('getComic', parseInt(id))
    id = parseInt(id);
    var creators = this.creators.filter(function (creator) {
        // console.log('CreatorStore.getCreator', creator.id, id, creator)
        return (creator.id === id);
      });
    if (!creators) {
      // TODO test this
      return this.onGetCreator(id);
    } else {
      return creators[0];
    }
  },

  sortByDate: function sortByDate(a, b) {
    return a.modified < b.modified;
  },

  getCreators: function getCreators(page, length) {
    page = (page || 1) - 1;
    var start = length * page,
      end = (length * page) + length;
    return {
      creators: this.creators.sort(this.sortByDate).slice(start, end)
    };
  },

  getFeaturedCreators: function getFeaturedCreators(count) {
    return {
      loading: this.loading,
      creators: this.creators.sort(this.sortByDate).slice(0, count || 4)
    };
  },

  getState: function getState() {
    return {
      loading: this.loading,
      creators: this.creators.sort(this.sortByDate)
    };
  }
});

module.exports = CreatorStore;