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
    {keyword: 'comicDetail', path: '/comics/:id', component: ComicPage},
    {keyword: 'creatorDetail', path: '/creators/:id', component: CreatorPage},
    {keyword: 'basicDetail', path: '/pages/:id', component: BasicPage},
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
        ctx.params.id = parseInt(ctx.params.id);
        self.setState({
          componentKeyword: keyword,
          component: <Component
            params={ctx.params}
            querystring={ctx.querystring}
            config={Config}
            flux={self.props.flux} />
        });
        window.scrollTo(0,0);
      });
    });

    page.start();
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
      topNav = (<div className="row m-header--container">
          <div className="col-md-8 col-md-offset-2 header m-header">
              <ul className="nav pull-right m-header--nav">
                  <li className="active m-header--link"><a href="/">Home</a></li>
              </ul>
              <h3 className="text-muted m-header--logo"><a href="/">Marvel Mini</a></h3>
          </div>
        </div>);
    }

    return (
      <div className="container-fluid">

        {topNav}

        {this.state.component}

        <div className="m-footer--container row">
          <div className="m-footer col-md-12">
            <div className="m-footer--links col-sm-6 col-sm-offset-2">
              <ul className="list-inline">
                <li><a href="/pages/about">About</a></li>
                <li><a href="/pages/tos">TOS</a></li>
                <li><a href="/pages/privacy">Privacy</a></li>
              </ul>
            </div>
            <div className="m-footer--copyright col-sm-2">
              <p>&copy; 2014 Paul Thrasher</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Application;