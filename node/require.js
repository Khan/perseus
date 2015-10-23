// This is a file like environment.js that allows for perseus to be bundled
// into a package that can be required in node. See src/node-perseus.js.
var jsdom = __non_webpack_require__("jsdom");
global.jsdom = jsdom;

var common = require("./common.js");

// First-party global dependencies
global.Khan = common.window.Khan = {};
global.KhanUtil = common.window.KhanUtil = Khan.KhanUtil = {};

// Like React in common.js, khan-exercises (notably raphael) requires
// navigator to be set, but requirejs doesn't allow it, so we
// temporarily set it here.
var oldNavigator = global.navigator;
global.navigator = { userAgent: "Node" };
require("../ke-deps.js");
global.navigator = oldNavigator;

common.updateGlobals();
