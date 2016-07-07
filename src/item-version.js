const allWidgets = require('./all-widgets.js');
const Widgets = require('./widgets.js');
const Version = require('./version.json');

Widgets.registerMany(allWidgets);

const ItemVersion = Widgets.getVersionVector();
ItemVersion['::renderer::'] = Version.itemDataVersion;

module.exports = ItemVersion;
