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
    // this.getFlux().actions.getCreators(this.props.config.marvelApiEndpoint + '/v1/public/creators');
  },

  getInitialState: function() {
    return {
    };
  },

  render: function () {
    console.log(this.state)
    // var comicList = [];
    if (this.state.comics) {
      var comicList = this.state.comics.comics.map(function (comic, index) {
        return <Comic comic={comic} key={comic.id} />
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
          [FEATURED COMICS]
        </div>
        <div className={'row col-md-12'}>
          [FEATURED CREATORS]
        </div>
        <div className={'row col-md-12'}>
          {comicList}
        </div>
      </div>
    );
  }
});

module.exports = HomePage;