import Button from "@khanacademy/wonder-blocks-button";
import {TextArea} from "@khanacademy/wonder-blocks-form";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Pill from "@khanacademy/wonder-blocks-pill";
import {sizing, spacing} from "@khanacademy/wonder-blocks-tokens";
import {HeadingXSmall} from "@khanacademy/wonder-blocks-typography";
import trashIcon from "@phosphor-icons/core/bold/trash-bold.svg";
import * as React from "react";

import PerseusEditorAccordion from "../../components/perseus-editor-accordion";

import styles from "./radio-option-settings.module.css";
import {RadioStatusPill} from "./radio-status-pill";

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

    return (
        <PerseusEditorAccordion
            key={index}
            header={
                <div className={styles.accordionHeader}>
                    <RadioStatusPill
                        index={index}
                        correct={correct}
                        multipleSelect={multipleSelect}
                    />
                    {isNoneOfTheAbove ? "None of the above" : content}
                </div>
            }
            expanded={true}
        >
            {/* Incorrect / Wrong status selection */}
            <fieldset className="perseus-widget-row">
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

            {/* Content and rationale text areas */}
            <HeadingXSmall tag="label">
                Content
                <TextArea
                    value={isNoneOfTheAbove ? "None of the above" : content}
                    disabled={isNoneOfTheAbove}
                    placeholder="Type a choice here..."
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        onContentChange(index, value);
                    }}
                />
            </HeadingXSmall>
            <Strut size={spacing.small_12} />
            <HeadingXSmall tag="label">
                Rationale
                <TextArea
                    value={clue ?? ""}
                    placeholder="Why is this choice correct?"
                    // This unfortunately doesn't match the dynamic resizing
                    // behavior that it had before, but we should be able to add
                    // that in after WB-1843 is completed.
                    resizeType="vertical"
                    onChange={(value) => {
                        onRationaleChange(index, value);
                    }}
                />
            </HeadingXSmall>

            {/* Delete button */}
            {showDelete && (
                <Button
                    size="small"
                    kind="tertiary"
                    startIcon={trashIcon}
                    onClick={onDelete}
                    style={{alignSelf: "flex-start"}}
                >
                    Remove this choice
                </Button>
            )}
        </PerseusEditorAccordion>
    );
};
