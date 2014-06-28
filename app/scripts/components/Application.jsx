/**
 * @jsx React.DOM
 */

'use strict';

var VERSION_NUMBER = '0.0.0';

var React = require('react/react.js');
var Fluxxor = require('fluxxor/index.js');
var FluxMixin = Fluxxor.FluxMixin(React),
    FluxChildMixin = Fluxxor.FluxChildMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var page = require('page');

var HomePage = require('./HomePage.jsx');
var ComicPage = require('./ComicPage.jsx');
var CreatorPage = require('./CreatorPage.jsx');
var BasicPage = require('./BasicPage.jsx');
var PageNotFoundPage = require('./PageNotFoundPage.jsx');

var Config = require('../config.jsx');

/**
 * Application View
 */
var Application = React.createClass({

  routes: [
    {path: '/', component: HomePage},
    {path: '/comic/:id', component: ComicPage},
    {path: '/creator/:id', component: CreatorPage},
    {path: '/page/:id', component: BasicPage},
    {path: '*', component: PageNotFoundPage}
  ],

  componentDidMount: function() {
    /*
      Routing Init
    */
    var self = this;
    this.routes.forEach(function (route) {
      var url = route.path;
      var Component = route.component;

      page(url, function (ctx) {
        self.setState({
          component: <Component
            params={ctx.params}
            querystring={ctx.querystring}
            config={Config}
            flux={self.props.flux} />
        });
      });
    });
    page();
  },

  getInitialState: function() {
    return {
      component: <div />
    };
  },

  render: function () {
    // console.log('app props', this.props)
    return (
      <div className="container-fluid">

        <div className="header">
            <ul className="nav nav-pills pull-right">
                <li className="active"><a href="#">Home</a></li>
            </ul>
            <h3 className="text-muted">Marvel Mini</h3>
        </div>

        {this.state.component}

        <div className="footer">
            <p>&copy; 2014 Paul Thrasher</p>
        </div>
      </div>
    );
  }
});

module.exports = Application;