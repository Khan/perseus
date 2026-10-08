/**
 * Some tests require some or all of the widgets and editors to be registered
 * in order for them to work. Requiring this file will register all of the
 * widgets and editors.
 */
import {Widgets, widgets} from "@khanacademy/perseus";

import allEditors from "../all-editors";
import * as WidgetEditorRegistry from "../widget-editor-registry";

export const registerAllWidgetsAndEditorsForTesting = () => {
    Widgets.registerWidgets(widgets);
    WidgetEditorRegistry.registerEditors(allEditors);
};
