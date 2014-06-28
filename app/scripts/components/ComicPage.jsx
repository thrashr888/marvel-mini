/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

/**
 * ComicPage View
 */
var ComicPage = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props.item.input.split('\n').length)
    return (
      <div className={'row l-comic col-md-12'}>
        <h1>ComicPage</h1>
      </div>
    );
  }
});

module.exports = ComicPage;