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
    // console.log('CreatorPage props', this.props.params)
    // console.log('CreatorPage state', this.state)

    var creatorView = '';
    if (this.state.creator && this.state.creator) {
        var creatorView = <Creator creator={this.state.creator} key={this.state.creator.id} className="col-md-8 col-md-offset-2" displaySize="full" />
    } else {
        creatorView = <div className="m-loading"><p>Loading...</p></div>;
    }

    return (
      <div className={'row l-detail'}>
        {creatorView}
      </div>
    );
  }
});

module.exports = CreatorPage;