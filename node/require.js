/* eslint-disable no-var */

/* globals __non_webpack_require__ */
require("../lib/babel-polyfills.min.js");
// This is a file like environment.js that allows for perseus to be bundled
// into a package that can be required in node. See src/node-perseus.js.
var jsdom = __non_webpack_require__("jsdom");
global.jsdom = jsdom;

var common = require("./common.js");

// First-party global dependencies
global.Khan = common.window.Khan = {};
global.KhanUtil = common.window.KhanUtil = Khan.KhanUtil = {};

global.navigator = {userAgent: "Node"};

common.updateGlobals();
