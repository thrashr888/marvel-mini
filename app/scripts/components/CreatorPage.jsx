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
      loading: flux.store('CreatorStore').getState().loading
    };
  },

  componentWillMount: function() {
    this.getFlux().actions.getCreators({
        page: 1,
        limit: 24
      });
  },

  componentWillReceiveProps: function(nextProps) {
    // we might get a new id to switch to
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      var flux = this.getFlux();
      this.setState({
        creator: flux.store('CreatorStore').getCreator(nextProps.params.id)
      });
    }
  },

  render: function () {
    console.log('CreatorPage props', this.props.params)
    console.log('CreatorPage state', this.state)

    var creatorView = '';
    if (this.state.creator && this.state.creator) {
        var creatorView = <Creator creator={this.state.creator} key={this.state.creator.id} className="col-md-8 col-md-offset-2" displaySize="full" />
    } else {
        creatorView = <div className="m-loading"><p>Loading...</p></div>;
    }

    return (

      <div className="l-page l-page--detail">
        <div className={'row l-detail'}>
          {creatorView}
        </div>
      </div>
    );
  }
});

module.exports = CreatorPage;