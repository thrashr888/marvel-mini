/** @jsx React.DOM **/
/*globals describe, beforeEach, it*/

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
var Comic = require('./components/Comic.jsx');
var ComicPage = require('./components/ComicPage.jsx');
var Creator = require('./components/Creator.jsx');
var CreatorPage = require('./components/CreatorPage.jsx');
var ComicStore = require('./stores/ComicStore.jsx');
var CreatorStore = require('./stores/CreatorStore.jsx');

var stores = {
  ComicStore: new ComicStore(),
  CreatorStore: new CreatorStore()
};

var comicFixtures = require('./tests/comic-fixtures.json');
var creatorFixtures = require('./tests/creator-fixtures.json');
var mockComics = comicFixtures.data.results;
var mockCreators = creatorFixtures.data.results;
stores.ComicStore.comics = mockComics;
stores.CreatorStore.creators = mockCreators;
// console.log('mockCreators', keys, mockCreators)

var flux = new Fluxxor.Flux(stores, actions);

// A simple test case to make sure we're working properly
var Label = React.createClass({
    handleClick: function(){
        'use strict';
        console.log('Click');
        this.props.children = 'Text After Click';
        this.setState({liked: false});
    },
    render: function () {
        'use strict';
        console.log('Render');
        return (<p ref="p" onClick={this.handleClick}>{this.props.children}</p>);
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

describe('Component',function(){
    'use strict';

    beforeEach(function() {
        ReactTestUtils = React.addons.TestUtils;
    });

    it('CreatorStore', function(){
        var creator1 = flux.store('CreatorStore').getCreator(mockCreators[0].id);
        expect(creator1).toBeDefined();
        expect(creator1).toEqual(mockCreators[0]);
    });

    it('ComicStore', function(){
        var comic1 = flux.store('ComicStore').getComic(mockComics[0].id);
        expect(comic1).toBeDefined();
        expect(comic1).toEqual(mockComics[0]);
    });

    it('CreatorPage', function(){
        var params = {id: mockCreators[0].id};

        var creatorPage = <CreatorPage params={params} config={config} flux={flux} />;
        ReactTestUtils.renderIntoDocument(creatorPage);
        expect(creatorPage.state.creator).toBeDefined();
        expect(creatorPage.state.creator.id).toEqual(mockCreators[0].id);


        var creatorPage = <CreatorPage params={params} config={config} flux={flux} />;
        var creatorPageString = React.renderComponentToString(creatorPage);
        expect(creatorPageString).toMatch(/The ALL-NEW ULTIMATES face off/);
    });

    // * The FluxChildMixin makes these untestable on their own.
    // Need to figured out how to pass `this.context.flux` to a child component.

    // it('Creator', function(){
    //     var creator = <Creator creator={mockCreators[0]} className="col-md-8 col-md-offset-2" displaySize="full" flux={flux} />;

    //     ReactTestUtils.renderIntoDocument(creator);
    //     console.log(creator)
    //     expect(creator.refs).toBeDefined();

    //     var creatorString = React.renderComponentToString(creator);
    //     expect(creatorString).toMatch(/The ALL-NEW ULTIMATES face off/);
    // });

    // it('Comic', function(){
    //     var comic = <Comic comic={mockComics[0]} className="col-md-8 col-md-offset-2" displaySize="full" flux={flux} />;
    //     comic.getFlux = function () {
    //         return flux;
    //     }
    //     ReactTestUtils.renderIntoDocument(comic);
    //     console.log(comic)
    //     expect(comic.refs).toBeDefined();
    // });
});
