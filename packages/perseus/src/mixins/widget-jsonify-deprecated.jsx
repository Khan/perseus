// @flow
/* Free implementation of getUserInput. This should be used sparingly, since it
 * just returns all the widget's props rather than picking out those which were
 * input by the user.
 */
import _ from "underscore";

import WIDGET_PROP_BLACKLIST from "./widget-prop-blacklist.js";

const WidgetJsonifyDeprecated = {
    getUserInput: function (): $FlowFixMe {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    },

    // Static version of `WidgetJsonifyDeprecated.getUserInput`
    getUserInputFromProps: function (props: $FlowFixMe): $FlowFixMe {
        // Omit props that get passed to all widgets
        return _.omit(props, WIDGET_PROP_BLACKLIST);
    },
};

export default WidgetJsonifyDeprecated;
