import Button from "@khanacademy/wonder-blocks-button";
import {Checkbox, TextField} from "@khanacademy/wonder-blocks-form";
import {LabeledField} from "@khanacademy/wonder-blocks-labeled-field";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import InfoTip from "../../components/info-tip";
import PerseusEditorAccordion from "../../components/perseus-editor-accordion";
import ScrolllessNumberTextField from "../../components/scrollless-number-text-field";

import {getChoiceDisplayName} from "./choice-display-name";
import styles from "./fill-in-the-blank-editor.module.css";

import type {PerseusFillInTheBlankTile} from "@khanacademy/perseus-core";

// Keep the InfoTip next to the label instead of at the far end of the row.
const contextLabelStyles = {contextLabel: {marginInlineEnd: "auto"}};

type Props = {
    tile: PerseusFillInTheBlankTile;
    index: number;
    editingDisabled: boolean;
    onChange: (changes: Partial<PerseusFillInTheBlankTile>) => void;
    onRemove: () => void;
};

/**
 * The settings for one choice in the choice bank: what its tile shows, how
 * screen readers announce it, and how many blanks it can fill.
 */
export function ChoiceSettings({
    tile,
    index,
    editingDisabled,
    onChange,
    onRemove,
}: Props) {
    const {maxUses} = tile;
    const unlimited = maxUses === "unlimited";
    const displayName = getChoiceDisplayName(tile, index);
    // Start collapsed so a long choice bank stays scannable, except for a
    // choice that was just added and still needs filling in.
    const [expanded, setExpanded] = React.useState(tile.content === "");

    return (
        <PerseusEditorAccordion
            header={`Choice ${index + 1}: ${displayName}`}
            // Nested under the editor's "Choices" heading (an h3).
            tag="h4"
            expanded={expanded}
            onToggle={setExpanded}
        >
            <div className={styles.choiceFields}>
                <LabeledField
                    label="Answer"
                    contextLabel={
                        <InfoTip>
                            What the tile shows. Supports Markdown and TeX.
                        </InfoTip>
                    }
                    styles={contextLabelStyles}
                    field={
                        <TextField
                            value={tile.content}
                            onChange={(content) => onChange({content})}
                            disabled={editingDisabled}
                        />
                    }
                />
                <LabeledField
                    label="Aria label"
                    contextLabel={
                        <InfoTip>
                            How screen readers announce this choice.
                        </InfoTip>
                    }
                    styles={contextLabelStyles}
                    field={
                        <TextField
                            value={tile.label}
                            onChange={(label) => onChange({label})}
                            disabled={editingDisabled}
                        />
                    }
                />
                <Checkbox
                    label="Unlimited uses"
                    checked={unlimited}
                    onChange={(checked) =>
                        onChange({maxUses: checked ? "unlimited" : 1})
                    }
                    disabled={editingDisabled}
                />
                {/* The count means nothing while uses are unlimited, so the
                    field is hidden rather than shown with a stale value. */}
                {!unlimited && (
                    <LabeledField
                        label="Max uses"
                        contextLabel={
                            <InfoTip>
                                How many blanks this choice can fill.
                            </InfoTip>
                        }
                        styles={contextLabelStyles}
                        field={
                            <ScrolllessNumberTextField
                                value={maxUses}
                                min={1}
                                onChange={(newMaxUses) => {
                                    // A tile is used a whole number of times,
                                    // and at least once.
                                    if (
                                        Number.isInteger(newMaxUses) &&
                                        newMaxUses >= 1
                                    ) {
                                        onChange({maxUses: newMaxUses});
                                    }
                                }}
                                disabled={editingDisabled}
                            />
                        }
                    />
                )}
                <div className={styles.choiceActions}>
                    <Button
                        kind="tertiary"
                        size="small"
                        startIcon={trashIcon}
                        onClick={() => {
                            if (
                                // eslint-disable-next-line no-alert
                                window.confirm(`Remove "${displayName}"?`)
                            ) {
                                onRemove();
                            }
                        }}
                        disabled={editingDisabled}
                    >
                        Remove choice
                    </Button>
                </div>
            </div>
        </PerseusEditorAccordion>
    );
}
