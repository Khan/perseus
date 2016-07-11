// This is a file of things that both the perseus environment and node-perseus
// need

// Helper function for loading react; see comment when we load react
const withNavigator = function(lambda) {
    const oldNavigator = global.navigator;
    global.navigator = {userAgent: "Node"};
    const result = lambda();
    global.navigator = oldNavigator;
    return result;
};

// Fake being a web browser
global.document = global.jsdom.jsdom();
const window = global.window = document.defaultView; // @Nolint

// Mock out window.getSelection for react
// TODO(jack): Remove this once
// https://github.com/facebook/react/commit/2347abf75c2acb40b4b6ba10750f0461a5b837ad
// makes it into our version of react
if (!window.getSelection) {
    window.getSelection = function() {
        return {
            rangeCount: 0,
        };
    };
}

const _ = require("../lib/underscore.js");
global._ = window._ = _;

// Add window.btoa polyfill
const btoa = require("btoa");
global.btoa = window.btoa = btoa;

// Create a function to copy globals from `window` to `global`
const jsdomWindowProps = _.clone(global.window);
const updateGlobals = function() {
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
    require("../lib/react-with-addons.js");
    return window.React;
});
require("../lib/jquery.js");
updateGlobals();

// First-party global dependencies
require("../lib/i18n.js");
updateGlobals();

global.__EDITOR__ = true;

module.exports = {
    updateGlobals: updateGlobals,
    window: window,
};
