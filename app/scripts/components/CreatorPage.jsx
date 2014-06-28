/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

/**
 * CreatorPage View
 */
var CreatorPage = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props.item.input.split('\n').length)
    return (
      <div className={'row l-creator col-md-12'}>
        <h1>CreatorPage</h1>
      </div>
    );
  }
});

module.exports = CreatorPage;