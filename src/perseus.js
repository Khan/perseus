/**
 * Main entry point
 */
const version = require("./version.json");

const Widgets = require("./widgets.js");
const basicWidgets = require("./basic-widgets.js");
Widgets.registerMany(basicWidgets);

module.exports = {
    apiVersion:             version.apiVersion,
    itemDataVersion:        version.itemDataVersion,
    init:                   require("./init.js"),
    ArticleRenderer:        require("./article-renderer.jsx"),
    ItemRenderer:           require("./item-renderer.jsx"),
    ServerItemRenderer:     require("./server-item-renderer.jsx"),
    HintsRenderer:          require("./hints-renderer.jsx"),
    Renderer:               require("./renderer.jsx"),
};
