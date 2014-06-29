/** @jsx React.DOM **/
/*globals describe, beforeEach*/

/*
    Polyfill required for Function.bind() in PhantomJS.
    https://github.com/facebook/react/issues/945
    TODO: Try to include this instead:
          https://github.com/facebook/react/blob/master/src/test/phantomjs-shims.js
*/
if (!Function.prototype.bind) {
    var Empty = function(){};
    Function.prototype.bind = function bind(that) { // .length is 1
      var target = this;
      if (typeof target != "function") {
        throw new TypeError("Function.prototype.bind called on incompatible " + target);
      }
      var args = Array.prototype.slice.call(arguments, 1); // for normal call
      var binder = function () {
        if (this instanceof bound) {
          var result = target.apply(
              this,
              args.concat(Array.prototype.slice.call(arguments))
          );
          if (Object(result) === result) {
              return result;
          }
          return this;
        } else {
          return target.apply(
              that,
              args.concat(Array.prototype.slice.call(arguments))
          );
        }
      };
      var boundLength = Math.max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs.push("$" + i);
      }
      var bound = Function("binder", "return function(" + boundArgs.join(",") + "){return binder.apply(this,arguments)}")(binder);

      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        // Clean up dangling references.
        Empty.prototype = null;
      }
      return bound;
    };
  }

var React = require('react/addons');
// var jasmine = require('karma-jasmine');
var Fluxxor = require('fluxxor/index.js');

var actions = require('./actions.jsx');
var config = require('./config.jsx');

var Application = require('./components/Application.jsx');
var ComicStore = require('./stores/ComicStore.jsx');
var CreatorStore = require('./stores/CreatorStore.jsx');

var stores = {
  ComicStore: new ComicStore(),
  CreatorStore: new CreatorStore()
};

var flux = new Fluxxor.Flux(stores, actions);


// A simple test case to make sure we're working properly
var Label = React.createClass({
    handleClick: function(){
        console.log('Click');
        this.props.children = 'Text After Click';
        this.setState({liked: false});
    },

    render: function () {
        console.log('Render');
        return (
            <p ref="p" onClick={this.handleClick}>{this.props.children}</p>
            );
    }
});

describe('Label Test',function(){
    'use strict';

    beforeEach(function() {
        ReactTestUtils = React.addons.TestUtils;
    });

    it('Check Text Assignment', function () {
        var label = <Label>Some Text We Need for Test</Label>;
        // console.log(label.refs)
        ReactTestUtils.renderIntoDocument(label);
        expect(label.refs.p).toBeDefined();
        expect(label.refs.p.props.children).toBe('Some Text We Need for Test')
    });

    it('Click', function () {
        var label  = <Label>Some Text We Need to Test</Label>;
        ReactTestUtils.renderIntoDocument(label);
        // console.log(label.refs)

        ReactTestUtils.Simulate.click(label.refs.p);
        expect(label.refs.p.props.children).toBe('Text After Click');
    });

});
