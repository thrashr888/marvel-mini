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

  page: 1,

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Normally we'd use one key per store, but we only have one store, so
    // we'll use the state of the store as our entire state here.
    return {
      featuredComics: flux.store('ComicStore').getFeaturedComics(),
      comics: flux.store('ComicStore').getState(),
      creators: flux.store('CreatorStore').getState(),
    };
  },

  componentWillMount: function() {
    // console.log('this', this);
    // console.log('this.context', this.context);
    // console.log('Flux', this.getFlux());
    // console.log('actions', this.getFlux().actions);
    this.getFlux().actions.getComics({
        page: this.page,
        limit: 24
      });
    this.getFlux().actions.getCreators({
        page: 1,
        limit: 48
      });
  },

  loadMoreComics: function (event) {
    event.preventDefault();

    this.page = this.page + 1;
    this.getFlux().actions.getComics({
        page: this.page,
        limit: 24
      });
  },

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    // console.log(this.state)
    if (this.state.comics) {
      var featuredComicList = this.state.featuredComics.comics.map(function (comic, index) {
        return <Comic comic={comic} key={comic.id + index + 'featured'} className="col-sm-6 col-md-6 col-lg-6" />
      });
      var comicList = this.state.comics.comics.map(function (comic, index) {
        return <Comic comic={comic} key={comic.id + index} className="col-sm-3 col-md-3 col-lg-3" />
      });
    } else {
      return <div><p>Loading...</p></div>
    }

    if (this.state.creators) {
      // console.log(this.state.creators)
      var creatorList = this.state.creators.creators.map(function (creator, index) {
        // console.log(creator.id, index)
        return <Creator creator={creator} className="col-sm-3 col-md-3 col-lg-3" />
      });
    } else {
      return <div><p>Loading...</p></div>
    }

    if (this.state.featuredComics.comics && this.state.featuredComics.comics[0]) {
      var item = this.state.featuredComics.comics[0];
      console.log('this.state.featuredComics.comics', this.state.featuredComics.comics);
      var jumboStyles = {
        backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'
      };
    } else {
      var jumboStyles = {};
    }

    return (
      <div className="container-fluid l-home">
        <div className="jumbotron" style={jumboStyles}>
            <h1>Marvel Mini</h1>
            <p className="lead">Always a pleasure scaffolding your apps.</p>
            <p><a className="btn btn-lg btn-success" href="#">Splendid!</a></p>
        </div>
        <div className={'row l-list col-md-12'}>
          <h2>Featured Comics</h2>
          {featuredComicList}
        </div>
        <div className={'row l-list col-md-12'}>
          <h2>Creator List</h2>
          {creatorList}
        </div>
        <div className={'row l-list col-md-12'}>
          <h2>Comic List</h2>
          {comicList}
        </div>
        <div className="row col-md-12"><a onClick={this.loadMoreComics} href="#" className="btn btn-lg">Load More</a></div>
      </div>
    );
  }
});

module.exports = HomePage;