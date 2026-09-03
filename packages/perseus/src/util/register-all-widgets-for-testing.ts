import allWidgetRegistrations from "../all-widget-registrations";
import * as Widgets from "../widgets";

/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. This function registers all built-in widgets,
 * along with their core logic (and registers the deprecated-standin for
 * deprecated widgets).
 *
 * @hidden - not for use outside of the project.
 */
export const registerAllWidgetsForTesting = () => {
    Widgets.registerWidgets(allWidgetRegistrations);
    Widgets.replaceDeprecatedWidgets();
};
