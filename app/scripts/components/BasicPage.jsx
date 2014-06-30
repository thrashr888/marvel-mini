/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

/**
 * BasicPage View
 */
var BasicPage = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props)
    return (
      <div className={'row l-creator col-md-12'}>
        <h1>BasicPage</h1>
      </div>
    );
  }
});

module.exports = BasicPage;