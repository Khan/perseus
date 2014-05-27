var jsdom = require("jsdom");

// Helper function for loading react; see comment when we load react
var withNavigator = function(lambda) {
    var oldNavigator = global.navigator;
    global.navigator = { userAgent: "Node" };
    var result = lambda();
    global.navigator = oldNavigator;
    return result;
};

// Enable jsx files (with es6)
require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

var _ = require("../lib/underscore.js");
global._ = _;

// Fake being a web browser
global.document = jsdom.jsdom();
global.window = document.parentWindow;

// Create a function to copy globals from `window` to `global`
var jsdomWindowProps = _.clone(global.window);
var updateGlobals = function() {
    // Update only things we add to window, but not properties created by
    // jsdom, since making those globals can confuse jsdom.
    // We can't use a plain _.each(global.window) here because window has
    // a .length property (set to 0), which makes _ think it's array-like
    _.each(_.keys(global.window), function(key) {
        if (!_.has(jsdomWindowProps, key)) {
            global[key] = global.window[key];
        }
    });
};

// Third-party global dependencies
global.React = withNavigator(function() {
    // react-with-addons requires global.navigator to be defined,
    // but some other deps (including requirejs) require it to be
    // undefined to detect that we are running in Node.
    // We therefore define it only while loading React.
    return require("../lib/react-with-addons.js");
});
require("../lib/jquery.js");
markedReact = require("../lib/marked.js");
updateGlobals();

// First-party global dependencies
require("./i18n-shim.js");
updateGlobals();
require("./ke-deps-shim.js");
updateGlobals();

// Hacky assertion functions for jest compatibility
// TODO(jack): Change tests to not use these, or choose jest vs mocha
var assert = require("assert");
global.expect = function(thing) {
    return {
        toEqual: function(other) {
            assert(_.isEqual(thing, other), "" + thing + " != " + other);
        },
        toBe: function(other) {
            assert(thing === other, "" + thing + " != " + other);
        }
    };
};

