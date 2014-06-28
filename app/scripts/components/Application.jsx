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
    {keyword: 'homeHub', path: '/', component: HomePage},
    {keyword: 'comicDetail', path: '/comic/:id', component: ComicPage},
    {keyword: 'creatorDetail', path: '/creator/:id', component: CreatorPage},
    {keyword: 'basicDetail', path: '/page/:id', component: BasicPage},
    {keyword: 'notFound', path: '*', component: PageNotFoundPage}
  ],

  componentDidMount: function() {
    /*
      Routing Init
    */
    var self = this;
    this.routes.forEach(function (route) {
      var url = route.path;
      var keyword = route.keyword;
      var Component = route.component;
      page(url, function (ctx) {
        self.setState({
          componentKeyword: keyword,
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
    // console.log('app state', this.state)
    var topNav = null;
    if (this.state.componentKeyword !== 'homeHub') {
      topNav = <div className="header">
            <ul className="nav nav-pills pull-right">
                <li className="active"><a href="/">Home</a></li>
            </ul>
            <h3 className="text-muted">Marvel Mini</h3>
        </div>;
    }

    return (
      <div className="container-fluid">

        {topNav}

        {this.state.component}

        <div className="footer row col-md-12">
            <p>&copy; 2014 Paul Thrasher</p>
        </div>
      </div>
    );
  }
});

module.exports = Application;