require("../lib/babel-polyfills.min.js");
const _ = require("../lib/underscore.js");

const fs = require("fs");
const path = require("path");
const src = path.normalize(path.join(__dirname, "..", "src"));
const babelrc = JSON.parse(fs.readFileSync(
    path.join(__dirname, "..", ".babelrc")
));

const options = _.extend({}, babelrc, {
    // Generate a regexp that matches files we want to babelify. For now, this
    // is things in src/, react-components, and math-input
    only: new RegExp(src + "|react-components|math-input"),
    extensions: [".js", ".jsx"],
});
require("babel-core/register")(options);

const jsdom = require("jsdom");
global.jsdom = jsdom;

const common = require("./common.js");

global.Khan = window.Khan = {};
global.KhanUtil = window.KhanUtil = Khan.KhanUtil = {};

require("../lib/mathquill/mathquill-basic.js");
common.updateGlobals();

// KaTeX needs this, otherwise it throws errors and then we try to use MathJax,
// which breaks everything
Object.defineProperty(global.document, "compatMode", {
    get: function() {
        return "CSS1Compat";
    },
});
global.katex = common.window.katex = require("../lib/katex/katex.js");

global.KAS = {};
require("../lib/kas.js");
window.KAS = global.KAS; // don't ask--check out the KAS source.

// Hacky assertion functions for jest compatibility
// TODO(aria): Change tests to not use these, or choose jest vs mocha
const assert = require("assert");
global.expect = function(thing) {
    return {
        toEqual: function(other) {
            assert(_.isEqual(thing, other), "" + thing + " != " + other);
        },
        toBe: function(other) {
            assert(thing === other, "" + thing + " != " + other);
        },
    };
};

global.navigator = {userAgent: "Node"};
