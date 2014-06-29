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

  interval: null,

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Normally we'd use one key per store, but we only have one store, so
    // we'll use the state of the store as our entire state here.
    return {
      featuredComics: flux.store('ComicStore').getFeaturedComics(2),
      comics: flux.store('ComicStore').getState(),
      creators: flux.store('CreatorStore').getFeaturedCreators(6),
    };
  },

  componentWillMount: function() {
    // console.log('this', this);
    // console.log('this.context', this.context);
    // console.log('Flux', this.getFlux());
    // console.log('actions', this.getFlux().actions);
    this.getFlux().actions.getComics({
        page: this.state.page,
        limit: 24
      });
    this.getFlux().actions.getCreators({
        page: 1,
        limit: 24
      });
  },

  componentDidMount: function() {
    this.interval = setInterval(function () {
      this.state.jumboIndex++;
      if (!this.state.comics.comics[this.state.jumboIndex]) {
        this.state.jumboIndex = 0;
      }

      if (this.state.comics.comics[this.state.jumboIndex].thumbnail &&
        !this.state.comics.comics[this.state.jumboIndex].thumbnail.path.match(/image_not_available$/)) {
        // only update if there's a good image
        this.forceUpdate();
      }
    }.bind(this), 2000);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  loadMoreComics: function (event) {
    event.preventDefault();

    this.state.page = this.state.page + 1;
    this.getFlux().actions.getComics({
        page: this.state.page,
        limit: 24
      });
  },

  getInitialState: function() {
    return {
      jumboIndex: 0,
      page: 1
    };
  },

  render: function () {
    // console.log('homepage state', this.state)

    if (this.state.comics) {
      var featuredComicList = this.state.featuredComics.comics.map(function (comic, index) {
        return <Comic comic={comic} key={'feat-comics' + comic.id + index} className="col-lg-6 col-md-6 col-sm-12" />;
      });
      var comicList = this.state.comics.comics.map(function (comic, index) {
        return <Comic comic={comic} key={'comics' + comic.id + index} className="col-lg-3 col-md-4 col-sm-6" />;
      });
    } else {
      return <div><p>Loading...</p></div>;
    }

    if (this.state.creators) {
      var creatorList = this.state.creators.creators.map(function (creator, index) {
        return <Creator creator={creator} key={'creators' + creator.id + index} className="col-lg-2 col-md-3 col-sm-4" />;
      });
    } else {
      return <div><p>Loading...</p></div>;
    }

    if (this.state.comics.comics && this.state.comics.comics[this.state.jumboIndex]) {
      var thumbnail = this.state.comics.comics[this.state.jumboIndex].thumbnail;
      var jumboStyles = {
        backgroundImage: 'url(' + thumbnail.path + '.' + thumbnail.extension + ')'
      };
    } else {
      var jumboStyles = {};
    }

    var loadingView = '';
    if (this.state.comics.loading) {
      loadingView = <div className="m-loading"><p><img src="/images/loading-spin.svg" alt="Loading icon" /><br />Loading…</p></div>;
    }

    return (
      <div className="l-page l-page--home">

        <div className={"row jumbotron l-featured m-hero " + (this.state.featuredComics.loading ? 'is-loading' : '')} style={jumboStyles}>
          <div className="m-hero--block">
            <h1 className="m-hero--title">Marvel Mini</h1>
            <p className="lead m-hero--lead">A showcase of Marvel comics and creators.</p>
          </div>
        </div>

        <div className={"row l-list l-featured l-featured--comics " + (this.state.featuredComics.loading ? 'is-loading' : '')}>
          {featuredComicList}
        </div>

        <div className={"row l-list l-featured l-featured--creators " + (this.state.creators.loading ? 'is-loading' : '')}>
          <h2 className="col-md-12"><span>Latest Creators</span></h2>
          {creatorList}
        </div>

        <div className={"row l-list " + (this.state.comics.loading && !this.state.comics.comics ? 'is-loading' : '')}>
          <h2 className="col-md-12"><span>Latest Comics</span></h2>
          {comicList}
        </div>

        <div className="row l-content" style={{marginBottom: '45px'}}>
          <div className="col-md-6 col-md-offset-3">
            {loadingView ? loadingView : <a onClick={this.loadMoreComics} href="#" className="btn btn-default btn-lg btn-block">Load More</a>}
          </div>
        </div>

      </div>
    );
  }
});

module.exports = HomePage;