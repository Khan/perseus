var jsdom = require("jsdom");
global.jsdom = jsdom;

// Enable jsx files (with es6)
require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

var common = require("./common.js");

// First-party global dependencies
require("./ke-deps-shim.js");
common.updateGlobals();

require("../lib/mathquill/mathquill-basic.js");
common.updateGlobals();

// KaTeX needs this, otherwise it throws errors and then we try to use MathJax,
// which breaks everything
global.document.compatMode = "CSS1Compat";
global.katex = common.window.katex = require("../lib/katex/katex.js");

global.KAS = {};
require("../lib/kas.js");
window.KAS = global.KAS; // don't ask--check out the KAS source.

// Hacky assertion functions for jest compatibility
// TODO(aria): Change tests to not use these, or choose jest vs mocha
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

