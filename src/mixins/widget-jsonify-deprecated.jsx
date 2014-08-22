/* Free implementation of getUserInput. This should be used sparingly, since it
 * just returns all the widget's props rather than picking out those which were
 * input by the user.
 */
var WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

var WidgetJsonifyDeprecated = {
    getUserInput: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = WidgetJsonifyDeprecated;
