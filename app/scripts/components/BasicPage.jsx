/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var BasicPageContent = require('../stores/BasicPage.json');

/**
 * BasicPage View
 */
var BasicPage = React.createClass({
  mixins: [FluxChildMixin],

  render: function () {
    // console.log(this.props)
    var page = BasicPageContent.pages.filter(function (page) {
        return page.id === this.props.params.id;
    }.bind(this))[0];

    return (
      <div className="l-page l-page-detail">
        <div className="row l-detail">
          <div className="m-basic--container col-sm-8 col-sm-offset-2">
            <div className="m-basic">
              <h2 className="m-basic--title col-sm-8 col-sm-offset-2">{page.title}</h2>
              <div className="m-basic--description col-sm-8 col-sm-offset-2" dangerouslySetInnerHTML={{__html: page.text}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BasicPage;