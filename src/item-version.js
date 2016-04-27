/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const _ = require("underscore");

require("./all-widgets.js");
const Version = require("./version.json");
const Widgets = require("./widgets.js");

const ItemVersion = _.clone(Widgets.getVersionVector());
ItemVersion['::renderer::'] = Version.itemDataVersion;

module.exports = ItemVersion;
