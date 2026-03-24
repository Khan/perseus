import allWidgets from "../all-widgets";
import * as Widgets from "../widgets";

/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. This function registers all built-in widgets
 * (and registers the deprecated-standin for deprecated widgets).
 *
 * @hidden - not for use outside of the project.
 */
export const registerAllWidgetsForTesting = () => {
    Widgets.registerWidgets(allWidgets);
    Widgets.replaceDeprecatedWidgets();
};
