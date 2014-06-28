/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var page = require('page');

/**
 * Comic View
 */
var Comic = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props.item.input.split('\n').length)
    var item = this.props.comic;
    var firstImage = item.images && item.images[0] ? <img src={item.images[0].path + '.' + item.images[0].extension} /> : '';
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';

    var urls = item.urls.map(function (url) {
      return <a href={url.url} key={url.url}>{url.title}</a>;
    });

    return (
      <div className={'row m-comic ' + this.props.className} style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>
        <h3 className="m-comic--title"><a href={'/comic/' + item.id}>{item.title}</a></h3>
        <div className="m-comic--image">{thumbnail}</div>
        <div>{urls}</div>
      </div>
    );
  }
});

module.exports = Comic;