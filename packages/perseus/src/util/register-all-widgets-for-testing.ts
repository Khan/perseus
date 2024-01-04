/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import allWidgets from "../all-widgets";
import * as Widgets from "../widgets";

export const registerAllWidgetsForTesting = () => {
    Widgets.registerWidgets(allWidgets);

    // When it's time to replace the transformer widget
    // uncomment this line
    // Widgets.replaceWidget("transformer", "deprecated-standin");
};
