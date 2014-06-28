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
    // console.log('creator props', this.props)
    var item = this.props.creator;
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';
    if (item.thumbnail && !item.thumbnail.path.match(/image_not_available$/)) {
      this.props.className = this.props.className + ' has-image';
    }

    return (
      <div className={'m-creator--container ' + this.props.className}>
        <div className="m-creator" style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>
          <h3 className="m-creator--title"><a className="m-creator--title--text" href={'/creator/' + item.id}>{item.fullName}</a></h3>
          <div className="m-creator--image">{thumbnail}</div>
        </div>
      </div>
    );
  }
});

module.exports = Creator;