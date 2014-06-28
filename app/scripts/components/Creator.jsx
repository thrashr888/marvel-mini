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
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';

    return (
      <div className={'row m-creator ' + this.props.className} style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>
        <h3 className="m-creator--title"><a href={'/creator/' + item.id}>{item.fullName}</a></h3>
        <div className="m-creator--image">{thumbnail}</div>
      </div>
    );
  }
});

module.exports = Creator;