/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Comic = require('./Comic.jsx');
var Creator = require('./Creator.jsx');

/**
 * HomePage View
 */
var HomePage = React.createClass({
  // mixins: [FluxChildMixin],
  mixins: [FluxMixin, new StoreWatchMixin(
    'ComicStore',
    'CreatorStore'
  )],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Normally we'd use one key per store, but we only have one store, so
    // we'll use the state of the store as our entire state here.
    return {
      comics: flux.store('ComicStore').getState(),
      creators: flux.store('CreatorStore').getState(),
    };
  },

  componentDidMount: function() {
    // console.log('this', this);
    // console.log('this.context', this.context);
    // console.log('Flux', this.getFlux());
    // console.log('actions', this.getFlux().actions);
    this.getFlux().actions
      .getComics('/v1/public/comics?orderBy=-focDate&limit=24');
    this.getFlux().actions
      .getCreators('/v1/public/creators?orderBy=-modified&limit=48');
  },

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    // console.log(this.state)
    if (this.state.comics) {
      var featuredComicList = this.state.comics.comics.slice(0, 3).map(function (comic, index) {
        return <Comic comic={comic} key={comic.id} />
      });
      var comicList = this.state.comics.comics.slice(4, 28).map(function (comic, index) {
        return <Comic comic={comic} key={comic.id} />
      });
    } else {
      return <div><p>Loading...</p></div>
    }

    if (this.state.creators) {
      console.log(this.state.creators)
      var creatorList = this.state.creators.creators.slice(6, 12).map(function (creator, index) {
        return <Creator creator={creator} key={creator.id} />
      });
    } else {
      return <div><p>Loading...</p></div>
    }

    return (
      <div className={'l-home'}>
        <div className="jumbotron">
            <h1>Marvel Mini</h1>
            <p className="lead">Always a pleasure scaffolding your apps.</p>
            <p><a className="btn btn-lg btn-success" href="#">Splendid!</a></p>
        </div>
        <div className={'row col-md-12'}>
          <h2>Featured Comics</h2>
          {featuredComicList}
        </div>
        <div className={'row col-md-12'}>
          <h2>Creator List</h2>
          {creatorList}
        </div>
        <div className={'row col-md-12'}>
          <h2>Comic List</h2>
          {comicList}
        </div>
      </div>
    );
  }
});

module.exports = HomePage;