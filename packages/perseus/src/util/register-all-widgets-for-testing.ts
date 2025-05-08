/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {registerCoreWidgets} from "@khanacademy/perseus-core";

import allWidgets from "../all-widgets";
import * as Widgets from "../widgets";

export const registerAllWidgetsForTesting = () => {
    registerCoreWidgets();
    Widgets.registerWidgets(allWidgets);
    Widgets.replaceDeprecatedWidgets();
};
