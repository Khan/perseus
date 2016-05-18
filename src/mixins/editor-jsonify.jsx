const _ = require("underscore");

const WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

const EditorJsonify = {
    serialize: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    },
};

module.exports = EditorJsonify;
