/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var _ = require("underscore");

var WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

var EditorJsonify = {
    serialize: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = EditorJsonify;
