/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

require("./all-widgets.js");
var Version = require("./version.json");
var Widgets = require("./widgets.js");

var ItemVersion = _.clone(Widgets.getVersionVector());
ItemVersion['::renderer::'] = Version.itemDataVersion;

module.exports = ItemVersion;
