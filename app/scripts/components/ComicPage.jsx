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
 * ComicPage View
 */
var ComicPage = React.createClass({
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
      comic: flux.store('ComicStore').getComic(this.props.params.id),
    };
  },

  componentWillMount: function() {
    this.getFlux().actions.getComics({
        page: 1,
        limit: 24
      });
  },

  render: function () {
    // console.log('ComicPage props', this.props.params)
    // console.log('ComicPage state', this.state)

    var comicView = '';
    if (this.state.comic) {
        comicView = <Comic comic={this.state.comic} key={this.state.comic.id} className="col-md-8 col-md-offset-2" displaySize="full" />;
    } else {
        comicView = <div className="m-loading"><p>Loading...</p></div>;
    }

    return (
      <div className={'row l-detail'}>
        {comicView}
      </div>
    );
  }
});

module.exports = ComicPage;