/** @jsx React.DOM **/
/*globals describe, beforeEach*/

/*
    Polyfill required for Function.bind() in PhantomJS.
    https://github.com/swannodette/om/wiki/Testing
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
*/
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    'use strict';
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

var React = require('react/addons');
// var jasmine = require('karma-jasmine');
// require('react-test-utils');
// var ReactTestUtils = require('react-test-utils');

// var f = jasmine.getFixtures();
// f.fixturesPath = 'base';
// f.load('../index.html');
// var ReactTestUtils = require('react-test-utils');

var actions = require('./actions.jsx');
var config = require('./config.jsx');

var Application = require('./components/Application.jsx');
var ComicStore = require('./stores/ComicStore.jsx');
var CreatorStore = require('./stores/CreatorStore.jsx');



describe('Label Test',function(){
    'use strict';

    beforeEach(function() {
        ReactTestUtils = require('react-test-utils');
    });

    it('Check Text Assignment', function () {
        var label = <p>Some Text We Need for Test</p>;
        console.log(ReactTestUtils)
        // ReactTestUtils.renderIntoDocument(label);
        // expect(label.refs.p).toBeDefined();
        // expect(label.refs.p.props.children).toBe('Some Text We Need for Test')
    });

    it('Click', function () {
        var label  = <p>Some Text We Need to Test</p>;
        // ReactTestUtils.renderIntoDocument(label);

        // ReactTestUtils.Simulate.click(label.refs.p);
        // expect(label.refs.p.props.children).toBe('Text After Click');
    });

});
