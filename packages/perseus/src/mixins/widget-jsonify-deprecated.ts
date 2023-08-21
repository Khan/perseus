/* Free implementation of getUserInput. This should be used sparingly, since it
 * just returns all the widget's props rather than picking out those which were
 * input by the user.
 */
import _ from "underscore";

import WIDGET_PROP_DENYLIST from "./widget-prop-denylist";

const WidgetJsonifyDeprecated = {
    getUserInput: function (): any {
        // Omit props that get passed to all widgets
        // @ts-expect-error - TS2339 - Property 'props' does not exist on type '{ readonly getUserInput: () => any; readonly getUserInputFromProps: (props: any) => any; }'.
        return _.omit(this.props, WIDGET_PROP_DENYLIST);
    },

    // Static version of `WidgetJsonifyDeprecated.getUserInput`
    getUserInputFromProps: function (props: any): any {
        // Omit props that get passed to all widgets
        return _.omit(props, WIDGET_PROP_DENYLIST);
    },
} as const;

export default WidgetJsonifyDeprecated;
