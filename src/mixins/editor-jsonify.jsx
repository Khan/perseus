var WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

var EditorJsonify = {
    serialize: function() {
        var props = this.props;
        if (this.hasOwnProperty("getPropsOverride") && typeof(this.getPropsOverride) == "function") {
            props = this.getPropsOverride();
        }

        // Omit props that get passed to all widgets
        return _.omit(props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = EditorJsonify;
