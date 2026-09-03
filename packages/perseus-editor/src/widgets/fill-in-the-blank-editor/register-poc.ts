import {
    FillInTheBlankWidget,
    pocFillInTheBlankWidgetLogic,
    Widgets,
} from "@khanacademy/perseus";
import {CoreWidgetRegistry} from "@khanacademy/perseus-core";

import BlankEditor from "../blank-editor";

import FillInTheBlankEditor from "./fill-in-the-blank-editor";

/**
 * TODO(LEMS-4371): Delete this file once the widget is registered in
 * `extra-widgets.ts` and its editors in `all-editors.ts`. Everything here
 * exists only because the POC registers from its stories instead; the normal
 * `Editors/EditorPage` story will then host the widget with no special setup.
 *
 * Registers the Fill in the Blank POC so Storybook can author and render it.
 *
 * The widget is deliberately absent from `extra-widgets.ts`, `all-editors.ts`
 * and the core widget registry, because its options shape has not landed in
 * `perseus-core` yet. Registering from the stories keeps that true while still
 * letting the widget be inserted, authored and previewed the way a content
 * creator would meet it.
 *
 * Both registrations below are needed before `Editor` can insert one:
 * `Widgets.registerWidget` puts it in the "Add a widget…" dropdown and renders
 * it, while `CoreWidgetRegistry.registerWidget` supplies the alignment and
 * version that `Editor._addWidgetToContent` reads — that one *throws* for an
 * unregistered type, so without it the dropdown blows up rather than doing
 * nothing.
 */
export function registerFillInTheBlankWidget() {
    Widgets.registerWidget("fill-in-the-blank", FillInTheBlankWidget);
    CoreWidgetRegistry.registerWidget(
        "fill-in-the-blank",
        pocFillInTheBlankWidgetLogic,
    );
}

/**
 * Registers the editor panels as well. Only the editor page needs these; the
 * preview iframe renders the widgets but never edits them.
 *
 * `BlankEditor` comes along because `Editor` treats a widget with no
 * registered editor as an error and paints its marker red in the textarea
 * underlay — the same red a duplicate widget id gets. `blank` ships without an
 * editor (it is `hidden`, and until now nothing authored one), so every
 * `[[☃ blank n]]` in the answer zone looked broken.
 */
export function registerFillInTheBlankEditor() {
    registerFillInTheBlankWidget();
    Widgets.registerEditors([FillInTheBlankEditor, BlankEditor]);
}
