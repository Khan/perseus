// @flow
/* Free implementation of getUserInput. This should be used sparingly, since it
 * just returns all the widget's props rather than picking out those which were
 * input by the user.
 */
import {removeDenylistProps} from "./widget-prop-denylist.js";

const WidgetJsonifyDeprecated = {
    getUserInput: function (): {...} {
        // Omit props that get passed to all widgets
        return removeDenylistProps(this.props);
    },

    // Static version of `WidgetJsonifyDeprecated.getUserInput`
    getUserInputFromProps: function (props: {...}): {...} {
        // Omit props that get passed to all widgets
        return removeDenylistProps(props);
    },
};

export default WidgetJsonifyDeprecated;
