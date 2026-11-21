import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import ToggleableCaret from "../../components/toggleable-caret";

import styles from "./fill-in-the-blank-editor.module.css";

import type {PerseusFillInTheBlankTile} from "@khanacademy/perseus-core";

type Props = {
    /** The blank's widget id, e.g. "blank 1". */
    blankId: string;
    correctId: string;
    tiles: ReadonlyArray<PerseusFillInTheBlankTile>;
    editingDisabled: boolean;
    onCorrectIdChange: (correctId: string) => void;
};

function getChoiceName(tile: PerseusFillInTheBlankTile, index: number) {
    return tile.content.trim() || tile.label.trim() || `Choice ${index + 1}`;
}

/**
 * Picks which choice from the choice bank correctly fills one blank.
 */
export function BlankEditor({
    blankId,
    correctId,
    tiles,
    editingDisabled,
    onCorrectIdChange,
}: Props) {
    // A blank can point at a choice that was since removed. Show it as unset
    // rather than as a value the select has no option for.
    const correctIndex = tiles.findIndex((tile) => tile.id === correctId);
    const selectedValue = correctIndex === -1 ? "" : correctId;

    // Start collapsed so a long list of blanks stays scannable, except for a
    // blank that still needs an answer.
    const [expanded, setExpanded] = React.useState(selectedValue === "");
    const headerId = React.useId();
    const panelId = React.useId();

    // "blank 1" -> "Blank 1"
    const blankName = blankId.charAt(0).toUpperCase() + blankId.slice(1);
    const header =
        correctIndex === -1
            ? blankName
            : `${blankName}: ${getChoiceName(tiles[correctIndex], correctIndex)}`;

    return (
        // Make the Blank settings look like the settings of any other widget.
        <div className="perseus-widget-editor">
            <div
                className={
                    "perseus-widget-editor-title " +
                    (expanded ? "open" : "closed")
                }
            >
                {/* Nested under the editor's "Blanks" heading (an h3). */}
                <h4 className={styles.blankTitle}>
                    <button
                        type="button"
                        id={headerId}
                        className={styles.blankToggle}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => setExpanded(!expanded)}
                    >
                        <ToggleableCaret isExpanded={expanded} />
                        <span>{header}</span>
                    </button>
                </h4>
            </div>
            {expanded && (
                <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className={
                        "perseus-widget-editor-content " + styles.blankContent
                    }
                >
                    <LabeledField
                        label="Correct answer"
                        description={
                            tiles.length === 0
                                ? "Add a choice below first."
                                : undefined
                        }
                        field={
                            <SingleSelect
                                placeholder="Select a choice"
                                selectedValue={selectedValue}
                                onChange={onCorrectIdChange}
                                disabled={editingDisabled || tiles.length === 0}
                            >
                                {tiles.map((tile, index) => (
                                    <OptionItem
                                        key={tile.id}
                                        value={tile.id}
                                        label={getChoiceName(tile, index)}
                                    />
                                ))}
                            </SingleSelect>
                        }
                    />
                </div>
            )}
        </div>
    );
}
