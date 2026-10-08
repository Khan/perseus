import {createWidgetRegistry} from "@khanacademy/perseus-core";

import DeprecatedStandinEditor from "./widgets/deprecated-standin-editor";

type WidgetEditor = any;

const editors = createWidgetRegistry<WidgetEditor>(
    "Perseus widget editor registry",
    DeprecatedStandinEditor,
);

/**
 * Register widget editors, keyed by the type of widget each one edits.
 *
 * The keys are widget types as they appear in Perseus content (eg. `radio`),
 * which is what `getEditor` looks up when the editor page renders a widget.
 */
export const registerEditors = (
    editorsToRegister: Record<string, WidgetEditor>,
) => {
    Object.entries(editorsToRegister).forEach(([widgetType, editor]) => {
        editors.set(widgetType, editor);
    });
};

export const getEditor = (type: string): WidgetEditor | null => {
    return editors.get(type) ?? null;
};
