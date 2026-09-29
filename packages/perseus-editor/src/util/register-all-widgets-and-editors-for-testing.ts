/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {registerAllWidgetsForTesting, Widgets} from "@khanacademy/perseus";

import allEditors from "../all-editors";

export const registerAllWidgetsAndEditorsForTesting = () => {
    // Registers each widget's core logic as well as its React component, and
    // applies the deprecated-widget replacements.
    registerAllWidgetsForTesting();
    Widgets.registerEditors(allEditors);

    Widgets.replaceDeprecatedEditors();
};
