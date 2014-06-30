/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var Comic = require('./Comic.jsx');

/**
 * Creator View
 */
var Creator = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log('creator props', this.props)
    function resourceURItoLocal(link, to) {
      return link.replace('http://gateway.marvel.com/v1/public', to||'');
    }

    var item = this.props.creator;
    var thumbnail = item.thumbnail ? <img src={item.thumbnail.path + '.' + item.thumbnail.extension} /> : '';

    this.props.className = this.props.className.replace(' has-image', '');
    if (item.thumbnail && !item.thumbnail.path.match(/image_not_available$/)) {
      this.props.className = this.props.className + ' has-image';
    }

    var comics = item.comics.items.map(function (comic, index) {
      return <li key={'cr-comics' + index}><a href={resourceURItoLocal(comic.resourceURI)}>{comic.name}</a></li>;
    });

    var featuredComics = null;
    // var featuredComics = item.comics.items.map(function (comic, index) {
    //   var id = parseInt(comic.resourceURI.replace('http://gateway.marvel.com/v1/public/comics/', ''));
    //   var fullComic = this.getFlux().store('ComicStore').getComic(id);
    //   // console.log('creator.fullComic', comic, fullComic)
    //   if (fullComic) {
    //     return <Comic comic={fullComic} className="col-lg-6 col-md-6 col-sm-12" key={'cr-comics-feat' + index + fullComic.id} />;
    //   }
    // }.bind(this));

    var events = item.events.items.map(function (event, index) {
      return <li key={'cr-events' + index}>{event.name}</li>;
    });
    var serieses = item.series.items.map(function (series, index) {
      return <li key={'cr-series' + index}>{series.name}</li>;
    });
    var stories = item.stories.items.map(function (story, index) {
      return <li key={'cr-stories' + index}>{story.name}</li>;
    });
    var urls = item.urls.map(function (url, index) {
      return <a key={'cr-urls' + index} href={url.url} className="btn btn-default">{url.type}</a>;
    });

    return (
      <div className={'m-creator--container ' + this.props.className + (this.props.displaySize === 'full' ? ' l-fullWidth' : '')}>
        <div className="m-creator" style={{backgroundImage: 'url(' + item.thumbnail.path + '.' + item.thumbnail.extension + ')'}}>

          <div className="m-creator--thumbnail col-sm-4">{thumbnail}</div>

          <h3 className={"m-creator--title " + (this.props.displaySize === 'full' ? 'col-sm-8' : '')}><a className="m-creator--title--text" href={'/creators/' + item.id}>{item.fullName}</a></h3>

          {featuredComics && featuredComics[0] ? <div className="m-creator--featured-comics row l-list col-md-12">
            <h4>Featured Comics</h4>
            {featuredComics}
          </div> : ''}

          <div className="l-meta col-sm-12">
            {comics && comics[0] ? <div className="col-sm-6 m-creator--comics">
              <h4>Comics</h4>
              <ul>{comics}</ul>
            </div> : ''}

            {events && events[0] ? <div className="col-sm-6 m-creator--events">
              <h4>Events</h4>
              <ul>{events}</ul>
            </div> : ''}

            {serieses && serieses[0] ? <div className="col-sm-6 m-creator--series">
              <h4>Series</h4>
              <ul>{serieses}</ul>
            </div> : ''}

            {stories && stories[0] ? <div className="col-sm-6 m-creator--stories">
              <h4>Stories</h4>
              <ul>{stories}</ul>
            </div> : ''}

            {urls && urls[0] ? <div className="col-sm-6 m-creator--urls">
              <h4>Urls</h4>
              <ul>{urls}</ul>
            </div> : ''}
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Creator;