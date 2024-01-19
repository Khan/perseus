/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {Widgets} from "@khanacademy/perseus";

import allEditors from "../all-editors";
import allWidgets from "../all-widgets";

export const registerAllWidgetsAndEditorsForTesting = () => {
    Widgets.registerWidgets(allWidgets);
    Widgets.registerEditors(allEditors);

    // When it's time to ship transformer's deprecation uncomment
    // Widgets.replaceEditor("transformer", "deprecated-standin");
    // Widgets.replaceWidget("transformer", "deprecatd-standin");
};
