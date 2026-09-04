import type {WidgetRegistration} from "@khanacademy/perseus";

// Editors are plain React components. Which widget an editor edits is external
// metadata — the key it registers under — not a property on the component, so
// there is nothing on `editor` to type against.
type EditorComponent = unknown;

/**
 * The pairing of one widget type's editor with the registration of the widget
 * it edits. The widget type comes from `widgetRegistration`, which is what
 * `registerEditors` keys the editor under.
 *
 * A registration is inert data; registering it is the caller's job.
 *
 * Deliberately not `Readonly<{...}>`: tsc only keeps this alias's name in
 * emitted declarations for a plain object type. Expanded, the type reaches
 * perseus internals with no public import path and declaration emit fails.
 */
export type EditorRegistration<TName extends string = string> = {
    widgetRegistration: WidgetRegistration<TName>;
    editor: EditorComponent;
};

/**
 * Pair an editor with the registration of the widget it edits. Returns its
 * input unchanged.
 */
export function defineEditorRegistration<TName extends string>(
    registration: EditorRegistration<TName>,
): EditorRegistration<TName> {
    return registration;
}
