/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var BasicPageContent = require('../stores/BasicPage.json');

var Config = require('../config.jsx');

/**
 * BasicPage View
 */
var BasicPage = React.createClass({
  mixins: [FluxChildMixin],

  getInitialState: function() {
    return {
      page: null
    };
  },

  render: function () {
    // console.log(this.props)
    this.state.page = BasicPageContent.pages.filter(function (page) {
        return page.id === this.props.params.id;
    }.bind(this))[0];

    if (this.state.page) {
      document.title = this.state.page.title + Config.htmlTitle;
    }

    return (
      <div className="l-page l-page-detail">
        <div className="row l-detail">
          <div className="m-basic--container col-sm-8 col-sm-offset-2">
            <div className="m-basic">
              <h2 className="m-basic--title col-sm-8 col-sm-offset-2">{this.state.page.title}</h2>
              <div className="m-basic--description col-sm-8 col-sm-offset-2" dangerouslySetInnerHTML={{__html: this.state.page.text}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BasicPage;