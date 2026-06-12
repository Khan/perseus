import {View} from "@khanacademy/wonder-blocks-core";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import {SegmentedControl} from "../../components/segmented-control";

import styles from "./radio-editor.module.css";
import {RadioOptionContentAndImageEditor} from "./radio-option-content-and-image-editor";
import {RadioOptionSettingsActions} from "./radio-option-settings-actions";
import {RadioStatusPill} from "./radio-status-pill";

import type {RadioOptionContentAndImageEditorHandle} from "./radio-option-content-and-image-editor";
import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";

export type RadioOptionSettingsHandle = {
    focus: () => void;
};

interface RadioOptionSettingsProps {
    index: number;
    choice: PerseusRadioChoice;
    // Whether the whole editor is disabled (apiOptions.editingDisabled).
    editingDisabled: boolean;
    multipleSelect: boolean;
    onStatusChange: (choiceIndex: number, correct: boolean) => void;
    onContentChange: (choiceIndex: number, content: string) => void;
    onRationaleChange: (choiceIndex: number, rationale: string) => void;
    showDelete: boolean;
    showMove: boolean;
    onDelete: () => void;
    onMove: (choiceIndex: number, movement: ChoiceMovementType) => void;
}

export const RadioOptionSettings = React.forwardRef<
    RadioOptionSettingsHandle,
    RadioOptionSettingsProps
>(function RadioOptionSettings(
    {
        index,
        choice,
        editingDisabled,
        multipleSelect,
        onStatusChange,
        onContentChange,
        onRationaleChange,
        showDelete,
        showMove,
        onDelete,
        onMove,
    },
    ref,
) {
    const {content, rationale, correct, isNoneOfTheAbove} = choice;
    const uniqueId = React.useId();
    const rationaleTextAreaId = `${uniqueId}-rationale-textarea`;
    const contentEditorRef =
        React.useRef<RadioOptionContentAndImageEditorHandle>(null);

    // Forward focus to the content editor
    React.useImperativeHandle(ref, () => ({
        focus: () => {
            contentEditorRef.current?.focus();
        },
    }));

    return (
        <div className={styles.tile}>
            {/* Correct / Incorrect status selection */}
            <fieldset className="perseus-widget-row">
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <RadioStatusPill
                        index={index}
                        correct={correct}
                        multipleSelect={multipleSelect}
                    />
                    <BodyText
                        size="small"
                        weight="bold"
                        tag="span"
                        style={{marginInlineEnd: sizing.size_080}}
                    >
                        Status
                    </BodyText>
                    <SegmentedControl
                        aria-label="Choice status"
                        disabled={editingDisabled}
                        selectedValue={correct ? "correct" : "incorrect"}
                        onChange={(value) => {
                            onStatusChange(index, value === "correct");
                        }}
                        options={[
                            {value: "correct", label: "Correct"},
                            {value: "incorrect", label: "Incorrect"},
                        ]}
                    />
                </View>
            </fieldset>

            {/* Content and rationale text areas */}
            <RadioOptionContentAndImageEditor
                ref={contentEditorRef}
                content={content}
                choiceIndex={index}
                isNoneOfTheAbove={isNoneOfTheAbove ?? false}
                editingDisabled={editingDisabled}
                onContentChange={onContentChange}
            />

            <BodyText
                size="small"
                weight="bold"
                tag="label"
                htmlFor={rationaleTextAreaId}
                style={{
                    marginBlockStart: sizing.size_040,
                    marginBlockEnd: sizing.size_040,
                }}
            >
                Rationale
            </BodyText>
            <TextArea
                id={rationaleTextAreaId}
                value={rationale ?? ""}
                placeholder={`Why is this choice ${correct ? "correct" : "incorrect"}?`}
                disabled={editingDisabled}
                onChange={(value) => {
                    onRationaleChange(index, value);
                }}
                autoResize={true}
            />

            {/* Delete & reorder button */}
            <RadioOptionSettingsActions
                content={content}
                showDelete={showDelete}
                showMove={showMove}
                editingDisabled={editingDisabled}
                onDelete={onDelete}
                onMove={(movement) => onMove(index, movement)}
            />
        </div>
    );
});
