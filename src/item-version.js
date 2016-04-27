const _ = require("underscore");

require("./all-widgets.js");
const Version = require("./version.json");
const Widgets = require("./widgets.js");

const ItemVersion = _.clone(Widgets.getVersionVector());
ItemVersion['::renderer::'] = Version.itemDataVersion;

module.exports = ItemVersion;
