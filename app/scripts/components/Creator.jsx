/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

/**
 * Creator View
 */
var Creator = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props.item.input.split('\n').length)
    var item = this.props.creator;
    return (
      <div className={'row l-list col-md-12'}>
        <h3>{item.fullName}</h3>
      </div>
    );
  }
});

module.exports = Creator;