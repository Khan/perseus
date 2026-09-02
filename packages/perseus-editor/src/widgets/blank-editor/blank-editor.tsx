import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {TypedSingleSelect} from "../../components/typed-single-select";
import {FillInTheBlankEditorContext} from "../fill-in-the-blank-editor/fill-in-the-blank-editor-context";

import styles from "./blank-editor.module.css";

import type {APIOptions, FillInTheBlankTile} from "@khanacademy/perseus";
import type {PerseusBlankWidgetOptions} from "@khanacademy/perseus-core";
import type {StyleType} from "@khanacademy/wonder-blocks-core";

// Matches the shorter select the image widget's "Alignment" control uses
// (`components/alignment-select.tsx`). Passed to `style`, which Wonder Blocks
// types as `StyleType` and which does not accept a CSS-module className.
const selectStyle: StyleType = {height: sizing.size_260};

const defaultOptions: PerseusBlankWidgetOptions = {
    displayType: "normal",
    correctId: "",
};

const displayTypeOptions = {
    normal: "Normal",
    superscript: "Superscript",
    subscript: "Subscript",
} as const satisfies Record<PerseusBlankWidgetOptions["displayType"], string>;

/**
 * A choice's option label in the correct-answer dropdown.
 *
 * Numbered to match the Choices list below it, because two choices are allowed
 * to hold identical content — without the number the dropdown could show the
 * same text twice with no way to tell which is which.
 */
function describeChoice(tile: FillInTheBlankTile, index: number): string {
    // The tiles come from the parent's options, which may have been
    // hand-edited as JSON — a field the type promises can still be absent.
    const read = (value: unknown) =>
        typeof value === "string" ? value.trim() : "";
    const shown = read(tile?.content) || read(tile?.label) || "(empty)";
    return `${index + 1}. ${shown}`;
}

/** Imperative API that `WidgetEditor` calls. */
export interface BlankEditorHandle {
    serialize: () => PerseusBlankWidgetOptions;
}

type Props = PerseusBlankWidgetOptions & {
    onChange: (newOptions: Partial<PerseusBlankWidgetOptions>) => void;
    /** Supplied by `WidgetEditor` alongside the widget's options. */
    apiOptions?: APIOptions;
};

// JSDoc will be shown in Storybook widget editor description
/**
 * TODO(LEMS-4371): Register this in `all-editors.ts`. Note it is an editor for
 * a `hidden` widget, which is unusual and worth flagging in review: `blank` is
 * hidden from the widget dropdown, but without a registered editor `Editor`
 * treats every `[[☃ blank n]]` marker as an error and paints it red.
 *
 * TODO(LEMS-4371): Both selects are named by their visible label alone, so
 * every blank panel on a page has one called "Display". The choice card solves
 * the same problem by composing `aria-labelledby` from the choice's name and
 * the field's; these could do likewise if `WidgetEditor` exposed the id of the
 * header showing "blank 1".
 *
 * An editor for a blank — Fill in the Blank's inline drop slot.
 *
 * Shows how the blank is typeset and which choice fills it. The choices come
 * from `FillInTheBlankEditorContext`, because `correctId` names a tile in the
 * parent's choice bank and this editor is rendered by the nested `Editor`, not
 * by Fill in the Blank. Outside a Fill in the Blank there is no choice bank,
 * so only the display type is offered.
 */
const BlankEditor = React.forwardRef<BlankEditorHandle, Props>(
    function BlankEditor(
        {
            displayType = defaultOptions.displayType,
            correctId = defaultOptions.correctId,
            onChange,
            apiOptions,
        },
        ref,
    ) {
        // A read-only authoring context must leave nothing editable.
        const editingDisabled = apiOptions?.editingDisabled ?? false;
        const fillInTheBlank = React.useContext(FillInTheBlankEditorContext);
        const tiles = fillInTheBlank?.tiles;
        // The visible label names the control, rather than an `aria-label`
        // repeating it — the pattern `AlignmentSelect` uses.
        const displayLabelId = React.useId();
        const correctLabelId = React.useId();

        React.useImperativeHandle(
            ref,
            () => ({
                serialize: () => ({displayType, correctId}),
            }),
            [displayType, correctId],
        );

        // Keys are tile ids, so the selection survives reordering and
        // re-wording of the choices — only deleting a choice can invalidate
        // it.
        const choiceOptions = Object.fromEntries(
            (tiles ?? []).map((tile, index) => [
                tile.id,
                describeChoice(tile, index),
            ]),
        );

        // A `correctId` can outlive the choice it names if the options were
        // edited outside this editor. Falling back to the placeholder makes
        // that recoverable rather than merely broken; the parent's save
        // warnings flag it.
        const selectedChoice =
            correctId !== "" && correctId in choiceOptions ? correctId : null;

        return (
            <div className={styles.settings}>
                <div className={styles.field}>
                    <BodyText id={displayLabelId} tag="span">
                        Display
                    </BodyText>
                    <TypedSingleSelect
                        aria-labelledby={displayLabelId}
                        options={displayTypeOptions}
                        selectedValue={displayType}
                        onChange={(value) => onChange({displayType: value})}
                        style={selectStyle}
                        disabled={editingDisabled}
                    />
                </div>
                {tiles != null && (
                    <div className={styles.field}>
                        <BodyText id={correctLabelId} tag="span">
                            Correct answer
                        </BodyText>
                        <TypedSingleSelect
                            aria-labelledby={correctLabelId}
                            placeholder="Select a choice"
                            options={choiceOptions}
                            selectedValue={selectedChoice}
                            onChange={(value) => onChange({correctId: value})}
                            style={selectStyle}
                            disabled={editingDisabled}
                        />
                    </div>
                )}
            </div>
        );
    },
);

export default Object.assign(BlankEditor, {
    // `Widgets.registerEditors` keys the registry off this, the same way the
    // class editors declare `static widgetName`.
    widgetName: "blank" as const,
    // Read directly by `Editor` to seed the options of a newly inserted blank.
    // `correctId` is empty rather than the generator's placeholder, so a new
    // blank reads as unanswered and the parent's save warning fires.
    defaultProps: defaultOptions,
});
