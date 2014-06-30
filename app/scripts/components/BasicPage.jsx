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
      <div className={'l-page l-page-detail'}>
        <h2>{page.title}</h2>
        <div dangerouslySetInnerHTML={{__html: page.text}}></div>
      </div>
    );
  }
});

module.exports = BasicPage;