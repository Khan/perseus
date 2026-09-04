import {
    Errors,
    PerseusError,
    Registry,
    resetRegistry,
    strictGet,
} from "@khanacademy/perseus-core";

// Editors are plain React components; there is no shared interface to type
// them against yet.
type Editor = any;

const editors = new Registry<Editor>("Perseus widget editor registry");

/**
 * Register widget editors, keyed by the widget type each one edits.
 *
 * The keys are widget types as they appear in Perseus content (e.g. `radio`),
 * which is what `getEditor` looks up. The type is the caller's to supply — an
 * editor component carries no record of which widget it edits.
 */
export const registerEditors = (editorsToRegister: Record<string, Editor>) => {
    Object.entries(editorsToRegister).forEach(([widgetType, editor]) => {
        editors.set(widgetType, editor);
    });
};

/**
 * Point the `type` editor at the editor registered for `replacementType`.
 *
 * e.g. replaceEditor("transformer", "deprecated-standin") makes the
 * transformer widget edit through the deprecated stand-in's editor.
 */
export const replaceEditor = (type: string, replacementType: string) => {
    const substituteEditor = editors.get(replacementType);

    if (!substituteEditor) {
        throw new PerseusError(
            `Failed to replace editor ${type} with ${replacementType}`,
            Errors.Internal,
        );
    }

    editors.replace(type, substituteEditor);
};

export const replaceDeprecatedEditors = () => {
    replaceEditor("transformer", "deprecated-standin");
    replaceEditor("lights-puzzle", "deprecated-standin");
    replaceEditor("reaction-diagram", "deprecated-standin");
    replaceEditor("sequence", "deprecated-standin");
    replaceEditor("simulator", "deprecated-standin");
    replaceEditor("unit-input", "deprecated-standin");
    replaceEditor("passage", "deprecated-standin");
    replaceEditor("passage-ref", "deprecated-standin");
    replaceEditor("passage-ref-target", "deprecated-standin");
    replaceEditor("molecule-renderer", "deprecated-standin");
};

export const getEditor = (type: string): Editor | null => {
    return (
        strictGet(
            editors,
            type,
            `registerEditors({${type}: ...}) with the ${type} editor module`,
        ) ?? null
    );
};

/**
 * Whether `type` has an editor, tolerating a miss even under strict
 * registration. Content can name widget types this build doesn't know.
 */
export const isEditorRegistered = (type: string): boolean => {
    return editors.has(type);
};

/**
 * Empty the editor registry.
 *
 * Package-internal: tests and Storybook use it to isolate registrations.
 */
export function resetEditorRegistry(): void {
    resetRegistry(editors);
}
