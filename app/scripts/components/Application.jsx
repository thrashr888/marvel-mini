/**
 * @jsx React.DOM
 */

'use strict';

var VERSION_NUMBER = '0.0.1';

var React = require('react/react.js');

/**
 * Application View
 */
var Application = React.createClass({
  componentWillMount: function() {
    // console.log(this);
  },

  getInitialState: function() {
    return {};
  },

  render: function () {
    return (
      <div className="container-fluid">
        <div className="header">
            <ul className="nav nav-pills pull-right">
                <li className="active"><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h3 className="text-muted">Marvel Mini</h3>
        </div>

        <div className="jumbotron">
            <h1>Marvel Mini</h1>
            <p className="lead">Always a pleasure scaffolding your apps.</p>
            <p><a className="btn btn-lg btn-success" href="#">Splendid!</a></p>
        </div>

        <div className="row marketing">
            <div className="col-lg-6">
                <h4>HTML5 Boilerplate</h4>
                <p>HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.</p>
            </div>
        </div>

        <div className="footer">
            <p>&copy; 2014 Paul Thrasher</p>
        </div>
      </div>
    );
  }
});

module.exports = Application;