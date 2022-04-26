// @flow
/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import allWidgets from "../all-widgets.js";
import * as Widgets from "../widgets.js";

export const registerAllWidgetsForTesting = () => {
    Widgets.registerWidgets(allWidgets);
};
