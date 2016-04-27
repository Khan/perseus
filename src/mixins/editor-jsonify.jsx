/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const _ = require("underscore");

const WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

const EditorJsonify = {
    serialize: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    },
};

module.exports = EditorJsonify;
