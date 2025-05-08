/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {Widgets, widgets} from "@khanacademy/perseus";
import {registerCoreWidgets} from "@khanacademy/perseus-core";

import allEditors from "../all-editors";

export const registerAllWidgetsAndEditorsForTesting = () => {
    registerCoreWidgets();
    Widgets.registerWidgets(widgets);
    Widgets.registerEditors(allEditors);

    Widgets.replaceDeprecatedWidgets();
    Widgets.replaceDeprecatedEditors();
};
