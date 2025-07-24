import {TextArea} from "@khanacademy/wonder-blocks-form";
import Pill from "@khanacademy/wonder-blocks-pill";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./radio-editor.module.css";
import {RadioOptionSettingsActions} from "./radio-option-settings-actions";
import {RadioStatusPill} from "./radio-status-pill";

import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";

interface RadioOptionSettingsProps {
    index: number;
    choice: PerseusRadioChoice;
    multipleSelect: boolean;
    onStatusChange: (choiceIndex: number, correct: boolean) => void;
    onContentChange: (choiceIndex: number, content: string) => void;
    onRationaleChange: (choiceIndex: number, rationale: string) => void;
    showDelete: boolean;
    showMove: boolean;
    onDelete: () => void;
    onMove: (choiceIndex: number, movement: ChoiceMovementType) => void;
}

export function RadioOptionSettings({
    index,
    choice,
    multipleSelect,
    onStatusChange,
    onContentChange,
    onRationaleChange,
    showDelete,
    showMove,
    onDelete,
    onMove,
}: RadioOptionSettingsProps) {
    const {content, rationale, correct, isNoneOfTheAbove} = choice;

    return (
        <div className={styles.tile}>
            {/* Correct / Incorrect status selection */}
            <fieldset className="perseus-widget-row">
                <RadioStatusPill
                    index={index}
                    correct={correct}
                    multipleSelect={multipleSelect}
                    onClick={() => {
                        onStatusChange(index, !correct);
                    }}
                />
                <HeadingXSmall
                    style={{
                        display: "inline",
                        marginInlineEnd: sizing.size_080,
                    }}
                >
                    Status
                </HeadingXSmall>
                <Pill
                    kind={correct ? "accent" : "transparent"}
                    onClick={() => {
                        onStatusChange(index, true);
                    }}
                    style={{
                        marginInlineEnd: sizing.size_080,
                        // Higher contrast on the default outline for
                        // secondary pills
                        outlineColor: correct
                            ? semanticColor.core.background.instructive.default
                            : semanticColor.core.border.neutral.default,
                    }}
                >
                    Correct
                </Pill>
                <Pill
                    kind={correct ? "transparent" : "accent"}
                    onClick={() => {
                        onStatusChange(index, false);
                    }}
                    style={{
                        marginInlineEnd: sizing.size_080,
                        // Higher contrast on the default outline for
                        // secondary pills
                        outlineColor: !correct
                            ? semanticColor.core.background.instructive.default
                            : semanticColor.core.border.neutral.default,
                    }}
                >
                    Incorrect
                </Pill>
            </fieldset>

            {/* Content and rationale text areas */}
            <HeadingXSmall tag="label" className={styles.contentHeading}>
                Content
                <TextArea
                    value={isNoneOfTheAbove ? "None of the above" : content}
                    disabled={isNoneOfTheAbove}
                    placeholder="Type a choice here..."
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    rows={1}
                    onChange={(value) => {
                        onContentChange(index, value);
                    }}
                />
            </HeadingXSmall>
            <HeadingXSmall tag="label">
                Rationale
                <TextArea
                    value={rationale ?? ""}
                    placeholder={`Why is this choice ${correct ? "correct" : "incorrect"}?`}
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    rows={1}
                    onChange={(value) => {
                        onRationaleChange(index, value);
                    }}
                />
            </HeadingXSmall>

            {/* Delete & reorder button */}
            <RadioOptionSettingsActions
                content={content}
                showDelete={showDelete}
                showMove={showMove}
                onDelete={onDelete}
                onMove={(movement) => onMove(index, movement)}
            />
        </div>
    );
}
