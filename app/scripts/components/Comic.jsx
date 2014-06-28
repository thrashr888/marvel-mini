/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

/**
 * Comic View
 */
var Comic = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props.item.input.split('\n').length)
    var item = this.props.comic;
    return (
      <div className={'row l-list col-md-12'}>
        <h2>{item.title}</h2>
      </div>
    );
  }
});

module.exports = Comic;