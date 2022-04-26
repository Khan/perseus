// @flow
/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {Widgets} from "@khanacademy/perseus";

import allEditors from "../all-editors.js";
import allWidgets from "../all-widgets.js";

export const registerAllWidgetsAndEditorsForTesting = () => {
    Widgets.registerWidgets(allWidgets);
    Widgets.registerEditors(allEditors);
};
