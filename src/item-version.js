require("./all-widgets.js");
var Version = require("./version.json");
var Widgets = require("./widgets.js");

var ItemVersion = _.clone(Widgets.getVersionVector());
ItemVersion['::renderer::'] = Version.itemDataVersion;

module.exports = ItemVersion;
