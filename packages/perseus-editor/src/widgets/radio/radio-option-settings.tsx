import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Pill from "@khanacademy/wonder-blocks-pill";
import {
    color,
    sizing,
    spacing,
    border,
} from "@khanacademy/wonder-blocks-tokens";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import checkIcon from "@phosphor-icons/core/bold/check-bold.svg";
import minusCircleIcon from "@phosphor-icons/core/bold/minus-circle-bold.svg";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

import type {PerseusRadioChoice} from "@khanacademy/perseus-core";

type Props = {
    index: number;
    choice: PerseusRadioChoice;
    multipleSelect: boolean;
    onStatusChange: (choiceIndex: number, correct: boolean) => void;
    onContentChange: (choiceIndex: number, content: string) => void;
    onRationaleChange: (choiceIndex: number, rationale: string) => void;
    showDelete: boolean;
    onDelete: () => void;
};

export const RadioOptionSettings = (props: Props) => {
    const {
        index,
        choice,
        multipleSelect,
        onStatusChange,
        onContentChange,
        onRationaleChange,
        showDelete,
        onDelete,
    } = props;

    const {content, clue, correct, isNoneOfTheAbove} = choice;

    const [contentInput, setContentInput] = React.useState(content);
    const [rationaleInput, setRationaleInput] = React.useState(clue);

    return (
        <PerseusEditorAccordion
            key={choice.content}
            header={
                <div
                    style={{
                        // display, overflow, and whiteSpace are needed
                        // for ellipsis text overflow to work.
                        display: "block",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        // Space between text and the close icon
                        marginInlineEnd: sizing.size_080,
                    }}
                >
                    <Pill
                        size="large"
                        style={{
                            // Space between the pill and the text
                            marginInlineEnd: sizing.size_080,
                            color: correct ? color.white : color.red,
                            backgroundColor: correct
                                ? color.activeGreen
                                : color.fadedRed8,
                            // Round for single select, square for multiple select
                            borderRadius: multipleSelect
                                ? border.radius.radius_040
                                : sizing.size_240,
                        }}
                    >
                        <span style={{display: "flex", alignItems: "center"}}>
                            <PhosphorIcon
                                size="small"
                                icon={correct ? checkIcon : minusCircleIcon}
                                style={{marginInlineEnd: sizing.size_060}}
                                color={correct ? color.white : color.red}
                            />
                            {String.fromCharCode(65 + index)}
                        </span>
                    </Pill>
                    {content ?? ""}
                </div>
            }
            expanded={true}
        >
            <fieldset className="perseus-widget-row direction-row">
                <legend className="inline-options">Status</legend>
                <Pill
                    kind={correct ? "accent" : "transparent"}
                    onClick={() => {
                        onStatusChange(index, true);
                    }}
                    style={{marginInlineEnd: sizing.size_080}}
                >
                    Correct
                </Pill>
                <Pill
                    kind={correct ? "transparent" : "accent"}
                    onClick={() => {
                        onStatusChange(index, false);
                    }}
                    style={{marginInlineEnd: sizing.size_080}}
                >
                    Wrong
                </Pill>
            </fieldset>

            <LabelMedium tag="label">
                Choice label
                <TextArea
                    value={
                        isNoneOfTheAbove ? "None of the above" : contentInput
                    }
                    disabled={isNoneOfTheAbove}
                    placeholder="Type a choice here..."
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        setContentInput(value);
                    }}
                    onBlur={() => {
                        onContentChange(index, contentInput);
                    }}
                />
            </LabelMedium>
            <Strut size={spacing.small_12} />
            <LabelMedium tag="label">
                Rationale
                <TextArea
                    value={rationaleInput || ""}
                    placeholder="Why is this choice correct?"
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        setRationaleInput(value);
                    }}
                    onBlur={() => {
                        onRationaleChange(index, rationaleInput || "");
                    }}
                />
            </LabelMedium>
            {showDelete && (
                <Button
                    size="small"
                    kind="tertiary"
                    startIcon={trashIcon}
                    onClick={onDelete}
                >
                    Remove this choice
                </Button>
            )}
        </PerseusEditorAccordion>
    );
};
