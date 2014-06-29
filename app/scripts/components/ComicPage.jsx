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
      featuredComics: flux.store('ComicStore').getFeaturedComics(12),
      comic: flux.store('ComicStore').getComic(this.props.params.id),
      loading: flux.store('ComicStore').getState().loading
    };
  },

  componentWillMount: function() {
    this.getFlux().actions.getComics({
        page: 1,
        limit: 24
      });
  },

  componentWillReceiveProps: function(nextProps) {
    // we might get a new id to switch to
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      var flux = this.getFlux();
      this.setState({
        comic: flux.store('ComicStore').getComic(nextProps.params.id)
      });
    }
  },

  render: function () {
    // console.log('ComicPage props', this.props.params)
    // console.log('ComicPage state', this.state)

    var featuredComicList = this.state.featuredComics.comics.map(function (comic, index) {
      return <Comic comic={comic} className="col-lg-4 col-md-6 col-sm-12" />;
    });

    var comicView = '';
    if (this.state.comic) {
      comicView = <Comic comic={this.state.comic} key={this.state.comic.id} className="col-sm-8 col-sm-offset-2" displaySize="full" />;
    } else {
      comicView = <div className="m-loading"><p>Loading...</p></div>;
    }

    return (
      <div className="l-page l-page--detail">
        <div className={'row l-detail'}>
          {comicView}
        </div>

        <div className="row l-list--container">
          <div className={"col-sm-8 col-sm-offset-2 l-list l-featured--comics " + (this.state.featuredComics.loading ? 'is-loading' : '')}>
            <h2 className="col-sm-12"><span>Featured Comics</span></h2>
            {featuredComicList}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ComicPage;