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
    };
  },

  componentWillMount: function() {
    this.getFlux().actions.getCreators({
        page: 1,
        limit: 24
      });
  },

  render: function () {
    console.log('CreatorPage props', this.props.params)
    console.log('CreatorPage state', this.state)

    if (this.state.creator && this.state.creator[0]) {
        var creatorView = <Creator creator={this.state.creator[0]} key={this.state.creator[0].id} />
    } else {
        var creatorView = <div><p>Loading...</p></div>
    }
    return (
      <div className={'row l-detail col-md-12'}>
        {creatorView}
      </div>
    );
  }
});

module.exports = CreatorPage;