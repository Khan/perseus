import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import * as React from "react";

import type {PerseusFillInTheBlankTile} from "@khanacademy/perseus-core";

type Props = {
    /** The blank's widget id, e.g. "blank 1". */
    blankId: string;
    correctId: string;
    tiles: ReadonlyArray<PerseusFillInTheBlankTile>;
    editingDisabled: boolean;
    onCorrectIdChange: (correctId: string) => void;
};

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
    const selectedValue = tiles.some((tile) => tile.id === correctId)
        ? correctId
        : "";

    return (
        <LabeledField
            label={`Correct answer for ${blankId}`}
            description={
                tiles.length === 0 ? "Add a choice below first." : undefined
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
                            label={
                                tile.content.trim() ||
                                tile.label.trim() ||
                                // A choice that was just added is still empty,
                                // and an option needs a name to be announced.
                                `Choice ${index + 1}`
                            }
                        />
                    ))}
                </SingleSelect>
            }
        />
    );
}
