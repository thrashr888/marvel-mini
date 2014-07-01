/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Creator = require('./Creator.jsx');

/**
 * CreatorHubPage View
 */
var CreatorHubPage = React.createClass({
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
      creators: flux.store('CreatorStore').getState(),
      featuredCreators: flux.store('CreatorStore').getFeaturedCreators(4),
    };
  },

  componentWillMount: function() {
    // console.log('this', this);
    // console.log('this.context', this.context);
    // console.log('Flux', this.getFlux());
    // console.log('actions', this.getFlux().actions);
    this.getFlux().actions.getCreators({
        page: this.state.page,
        limit: 24
      });
  },

  componentDidMount: function() {
    this.interval = setInterval(function () {
      this.state.jumboIndex++;
      if (!this.state.creators.creators[this.state.jumboIndex]) {
        this.state.jumboIndex = 0;
      }

      if (this.state.creators.creators[this.state.jumboIndex].thumbnail &&
        !this.state.creators.creators[this.state.jumboIndex].thumbnail.path.match(/image_not_available$/)) {
        // only update if there's a good image
        this.forceUpdate();
      }
    }.bind(this), 2500);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },

  loadMoreCreators: function (event) {
    event.preventDefault();

    this.state.page = this.state.page + 1;
    this.getFlux().actions.getCreators({
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
    // console.log('CreatorHubpage state', this.state)

    document.title = 'Creators - Marvel Mini';

    if (this.state.creators) {
      var featuredCreatorList = this.state.featuredCreators.creators.map(function (creator, index) {
        return <Creator creator={creator} key={'hp-feat-cr' + creator.id + index} className="col-lg-6 col-md-6 col-sm-12" />;
      });
      var creatorList = this.state.creators.creators.map(function (creator, index) {
        return <Creator creator={creator} key={'hp-cr' + creator.id + index} className="col-lg-3 col-md-6 col-sm-6" />;
      });
    }

    if (this.state.creators.creators && this.state.creators.creators[this.state.jumboIndex]) {
      var thumbnail = this.state.creators.creators[this.state.jumboIndex].thumbnail;
      var jumboStyles = {
        backgroundImage: 'url(' + thumbnail.path + '.' + thumbnail.extension + ')'
      };
    } else {
      var jumboStyles = {};
    }

    var loadingView = '';
    if (this.state.creators.loading) {
      loadingView = <div className="m-loading"><p><img src="/images/loading-spin.svg" alt="Loading icon" /><br />Loading…</p></div>;
    }

    return (
      <div className="l-page l-page--home">

        <div className={"row jumbotron l-featured m-hero " + (this.state.featuredCreators.loading ? 'is-loading' : '')} style={jumboStyles}>
          <div className="m-hero--block">
            <h1 className="m-hero--title">Marvel Creators</h1>
          </div>
        </div>

        <div className={"row l-list l-featured l-featured--creators " + (this.state.featuredCreators.loading ? 'is-loading' : '')}>
          {featuredCreatorList}
        </div>

        <div className={"row l-list" + (this.state.creators.loading ? 'is-loading' : '')}>
          <h2 className="col-md-12"><span>Latest Creators</span></h2>
          {creatorList}
        </div>

        <div className="row l-content" style={{marginBottom: '45px'}}>
          <div className="col-md-6 col-md-offset-3">
            {loadingView ? loadingView : <a onClick={this.loadMoreCreators} href="#" className="btn btn-default btn-lg btn-block">Load More</a>}
          </div>
        </div>

      </div>
    );
  }
});

module.exports = CreatorHubPage;