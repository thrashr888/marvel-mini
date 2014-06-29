/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var page = require('page');

var moment = require('moment');

/**
 * Comic View
 */
var Comic = React.createClass({
  mixins: [FluxChildMixin],

  componentDidMount: function() {
    setInterval(function () {
      this.state.jumboIndex++;
      if (!this.props.comic.images[this.state.jumboIndex]) {
        this.state.jumboIndex = 0;
      }

      if (this.props.comic.images[this.state.jumboIndex] &&
        !this.props.comic.images[this.state.jumboIndex].path.match(/image_not_available$/)) {
        // only update if there's a good image
        this.forceUpdate();
      }
    }.bind(this), 2000);
  },

  getInitialState: function() {
    return {
      jumboIndex: 0
    };
  },

  render: function () {
    // console.log(this.props.comic)
    function resourceURItoLocal(link) {
      return link.replace('http://gateway.marvel.com/v1/public', '');
    }

    var item = this.props.comic;
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';

    this.props.className = this.props.className.replace(' has-image', '');
    if (item.thumbnail && !item.thumbnail.path.match(/image_not_available$/)) {
      this.props.className = this.props.className + ' has-image';
    }

    var images = item.images.map(function (image, index) {
      return <img src={image.path + '.' + image.extension} key={index} />;
    });
    var urls = item.urls.map(function (url, index) {
      return <a href={url.url} className="btn btn-default" key={index}>{url.type}</a>;
    });
    var creators = item.creators.items.map(function (creator, index) {
      return <li><a href={resourceURItoLocal(creator.resourceURI)} key={index}>{creator.name}</a></li>;
    });

    var textObjects = item.textObjects.map(function (text, index) {
      return <p key={index}>{text.text}</p>
    });

    if (this.props.displaySize === 'full' && images[this.state.jumboIndex]) {
      var jumboImage = images[this.state.jumboIndex];
    } else {
      var jumboImage = '';
    }

    return (
      <div className={'m-comic--container ' + this.props.className + (this.props.displaySize ? ' l-fullWidth' : '')}>
        <div className="m-comic" style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>

          {images ? <div className="m-comic--images col-sm-4">{jumboImage}</div> : <div className="m-comic--thumbnail col-sm-3">{thumbnail}</div>}

          <div className="m-comic--series col-sm-8">{item.series.name + (item.issueNumber ? ' #' + item.issueNumber : '')}</div>
          <h3 className="m-comic--title col-sm-8"><a className="m-comic--title--text" href={'/comics/' + item.id}>{item.title}</a></h3>

          <div className="m-comic--description col-sm-8">
            {textObjects}
          </div>

          <div className="l-meta col-sm-12">
            <dl className="row col-sm-6 m-comic--meta">
              <h4>More Details</h4>

              <dt>Price:</dt><dd>${item.prices[0].price}</dd>
              <dt>Format:</dt><dd>{item.format}</dd>
              <dt>Pages:</dt><dd>{item.pageCount}</dd>
              <dt>On sale:</dt><dd title={item.dates[0].date}>{moment(item.dates[0].date, 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ').fromNow()}</dd>
              <dt>FOC Date:</dt><dd title={item.dates[0].date}>{moment(item.dates[0].date, 'YYYY-MM-DD[T]HH:mm:ss.SSSZZ').format('MMMM d, YYYY')}</dd>
            </dl>

            <div className="col-sm-6 m-comic--creators">
              <h4>Creators</h4>
              <ul>{creators}</ul>
            </div>

            <div className="col-sm-6 m-comic--urls">
              <h4>Links at Marvel.com</h4>
              {urls}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Comic;