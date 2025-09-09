import Pill from "@khanacademy/wonder-blocks-pill";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {AutoResizingTextArea} from "../../components/auto-resizing-text-area";

import styles from "./radio-editor.module.css";
import {RadioOptionContentAndImageEditor} from "./radio-option-content-and-image-editor";
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
    const uniqueId = React.useId();
    const rationaleTextAreaId = `${uniqueId}-rationale-textarea`;

    return (
        <div className={styles.tile} data-choice-id={choice.id}>
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
            <RadioOptionContentAndImageEditor
                content={content}
                choiceIndex={index}
                isNoneOfTheAbove={isNoneOfTheAbove ?? false}
                onContentChange={onContentChange}
            />

            <HeadingXSmall
                tag="label"
                htmlFor={rationaleTextAreaId}
                style={{
                    marginBlockStart: sizing.size_040,
                    marginBlockEnd: sizing.size_040,
                }}
            >
                Rationale
            </HeadingXSmall>
            <AutoResizingTextArea
                id={rationaleTextAreaId}
                value={rationale ?? ""}
                placeholder={`Why is this choice ${correct ? "correct" : "incorrect"}?`}
                onChange={(value) => {
                    onRationaleChange(index, value);
                }}
            />

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
