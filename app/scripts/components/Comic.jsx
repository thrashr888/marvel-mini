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
    // console.log(this.props.comic)

    var item = this.props.comic;
    var firstImage = item.images && item.images[0] ? <img src={item.images[0].path + '.' + item.images[0].extension} /> : '';
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';

    var urls = item.urls.map(function (url, index) {
      return <a href={url.url} className="btn btn-default" key={index}>{url.type}</a>;
    });
    var creators = item.creators.items.map(function (creator, index) {
      var uri = creator.resourceURI.replace('http://gateway.marvel.com/v1/public', '');
      return <a href={uri} className="btn btn-default" key={index}>{creator.name}</a>;
    });

    var textObjects = item.textObjects.map(function (text, index) {
      return <p key={index}>{text.text}</p>
    });

    return (
      <div className={'m-comic--container ' + this.props.className + (this.props.displaySize ? ' l-fullWidth' : '')}>
        <div className="m-comic" style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>

          <div className="m-comic--series"><a href={item.series.resourceURI}>{item.series.name}</a></div>
          <h3 className="m-comic--title"><a className="m-comic--title--text" href={'/comics/' + item.id}>{item.title}</a></h3>

          <div className="m-comic--image">{thumbnail}</div>

          <dl className="m-comic--meta">
            <dt>Price:</dt> <dd>{item.prices[0].price}</dd>
            <dt>On sale:</dt> <dd>{item.dates[0].date}</dd>
            <dt>Format:</dt> <dd>{item.format}</dd>
          </dl>

          <div className="m-comic--description">
            {textObjects}
          </div>

          <div className="m-comic--creators">
            <h4>Creators</h4>
            {creators}
          </div>

          <div className="m-comic--urls">
            <h4>Links</h4>
            {urls}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Comic;