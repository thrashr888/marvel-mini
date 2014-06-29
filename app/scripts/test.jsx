/** @jsx React.DOM **/

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
// require('react-test-utils');
// or var ReactTestUtils = require('react-test-utils');

module('TestSuiteName', {
    setup: function() {
        'use strict';
        var f = jasmine.getFixtures();
        f.fixturesPath = 'base';
        f.load('src/test/js/TestFixture.html');

        var app = require('./app.jsx');
        var ReactTestUtils = React.addons.ReactTestUtils;
    },
    teardown: function() {
        'use strict';
        var f = jasmine.getFixtures();
        f.cleanUp();
        f.clearCache();
    }
});

// var onMusicAdd = sinon.spy();

// test('Player', function(t) {
//   var player = <Player test='testing' />;
//   ReactTestUtils.renderIntoDocument(player);
//   t.plan(1);
//   t.equal(player.props.test, 'testing', 'test property should exists');
// });

// test('Player: simulate drag music', function(t) {
//   var player = <Player test='testing' onMusicAdd={onMusicAdd}/>;
//   var files = [
//     {name: 'test.mp3', type: 'audio/mp3'}
//   ];
//   var fakeEvt = {
//     dataTransfer: {
//       files: files
//     }
//   };
//   ReactTestUtils.renderIntoDocument(player);

//   t.plan(3);

//   ReactTestUtils.Simulate.drop(player.refs.el);
//   t.notOk(onMusicAdd.called, 'onMusicAdd should not be called');

//   ReactTestUtils.Simulate.drop(player.refs.el, fakeEvt);
//   t.ok(onMusicAdd.called, 'onMusicAdd should be called');
//   t.ok(onMusicAdd.calledWith(files), 'onMusicAdd shoule be called with mock files');
// });