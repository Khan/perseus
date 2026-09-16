/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {initPerseus} from "@khanacademy/perseus/init";

import allEditors from "../all-editors";
import {registerEditors, replaceDeprecatedEditors} from "../editor-registry";

export const registerAllWidgetsAndEditorsForTesting = () => {
    // Registers each widget's core logic as well as its React component, and
    // applies the deprecated-widget replacements.
    initPerseus();
    registerEditors(allEditors);

    replaceDeprecatedEditors();
};
