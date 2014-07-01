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

var Config = require('../config.jsx');

/**
 * CreatorPage View
 */
var CreatorPage = React.createClass({
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
      creator: flux.store('CreatorStore').getCreator(this.props.params.id),
      featuredComics: flux.store('ComicStore').getCreatorComics(this.props.params.id),
      loading: flux.store('CreatorStore').getState().loading
    };
  },

  componentWillMount: function() {
    this.getFlux().actions.getCreator(this.props.params.id);
    this.getFlux().actions.getComics({
      endpoint: '/v1/public/creators/' + this.props.params.id + '/comics',
      page: 1
    });
  },

  componentWillReceiveProps: function(nextProps) {
    // we might get a new id to switch to
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.setState({
        creator: this.getFlux().store('CreatorStore').getCreator(nextProps.params.id)
      });
    }
  },

  loadMoreComics: function (event) {
    event.preventDefault();

    this.state.page = this.state.page + 1;
    this.getFlux().actions.getComics({
      endpoint: '/v1/public/creators/' + this.props.params.id + '/comics',
      limit: 24,
      page: this.state.page
    });
  },

  getInitialState: function() {
    return {
      page: 1
    };
  },

  render: function () {
    // console.log('CreatorPage props', this.props.params)
    console.log('CreatorPage state', this.state)

    if (this.state.creator && this.state.creator.fullName) {
      document.title = this.state.creator.fullName + Config.htmlTitle;
    }

    var creatorView = '';
    if (this.state.creator) {
        creatorView = <Creator creator={this.state.creator} key={this.state.creator.id} className="col-md-8 col-md-offset-2" displaySize="full" />
    } else {
        creatorView = <div className="m-loading"><p><img src="/images/loading-spin.svg" alt="Loading icon" /><br />Loading…</p></div>;
    }

    var featuredComicList = this.state.featuredComics.comics.map(function (comic, index) {
      return <Comic comic={comic} key={'hp-feat-co' + comic.id + index} className="col-lg-6 col-md-6 col-sm-12" />;
    });

    return (

      <div className="l-page l-page--detail">
        <div className={'row l-detail'}>
          {creatorView}
        </div>

        {featuredComicList && featuredComicList[0] && this.state.creator ? <div className={'row l-list--container'}>
          <div className={'l-list col-md-8 col-md-offset-2 '}>
            <h2><span>{this.state.creator.fullName + '’s Comics'}</span></h2>
            {featuredComicList}
          </div>
        </div> : ''}

        {featuredComicList && featuredComicList[0] ? <div className={'row l-content--container'}>
          <div className="row l-content col-md-8 col-md-offset-2">
            <div className="col-md-6 col-md-offset-3" style={{marginBottom: '45px'}}>
              <a onClick={this.loadMoreComics} href="#" className="btn btn-default btn-lg btn-block">Load More</a>
            </div>
          </div>
        </div> : ''}

      </div>
    );
  }
});

module.exports = CreatorPage;