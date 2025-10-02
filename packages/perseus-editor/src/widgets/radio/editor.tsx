/* eslint-disable jsx-a11y/anchor-is-valid */
import {radioLogic, deriveNumCorrect} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import {sizing} from "@khanacademy/wonder-blocks-tokens";
import {Footnote} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";
import _ from "underscore";

import LabeledSwitch from "../../components/labeled-switch";

import {RadioOptionSettings} from "./radio-option-settings";
import {getMovedChoices} from "./utils";

import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {Changeable, APIOptions} from "@khanacademy/perseus";
import type {
    PerseusRadioWidgetOptions,
    PerseusRadioChoice,
    RadioDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

// Exported for testing
export interface RadioEditorProps extends Changeable.ChangeableProps {
    apiOptions: APIOptions;
    countChoices: boolean;
    choices: PerseusRadioChoice[];
    randomize: boolean;
    hasNoneOfTheAbove: boolean;
    multipleSelect: boolean;
    deselectEnabled: boolean;
    static: boolean;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a radio widget that allows users to select a single option from multiple choices.
 */
class RadioEditor extends React.Component<RadioEditorProps> {
    static widgetName = "radio" as const;

    static defaultProps: RadioDefaultWidgetOptions =
        radioLogic.defaultWidgetOptions;

    componentDidMount() {
        // Check if any choices need IDs and generate them immediately
        const needsIdUpdate = this.props.choices.some(
            (choice) => !choice.id || choice.id.trim() === "",
        );

        if (needsIdUpdate) {
            const updatedChoices = this.props.choices.map((choice, index) => ({
                ...choice,
                id: this.ensureValidIds(choice.id, index),
            }));
            this.props.onChange({choices: updatedChoices});
        }
    }

    // Called when the "Multiple selections" checkbox is toggled,
    // allowing the content author to specifiy multiple correct answers.
    onMultipleSelectChange: (arg1: any) => any = (allowMultiple) => {
        const isMultipleSelect = allowMultiple.multipleSelect;

        // When switching to single-select mode, we want to deselect all
        // choices if more than one choice is currently selected as correct.
        let choices = this.props.choices;
        if (!isMultipleSelect) {
            const numCorrect = deriveNumCorrect(choices);
            if (numCorrect > 1) {
                choices = choices.map((choice) => {
                    return {
                        ...choice,
                        correct: false,
                    };
                });
            }
        }

        // Update with the recalculated numCorrect and choices
        this.props.onChange({
            multipleSelect: isMultipleSelect,
            choices,
            numCorrect: deriveNumCorrect(choices),
        });
    };

    // Called when the "Specify number correct" checkbox is toggled,
    // making it so that the title reads "Choose [number] answers"
    onCountChoicesChange: (arg1: any) => void = (count) => {
        const countChoices = count.countChoices;
        this.props.onChange({
            countChoices,
        });
    };

    // Generate consistent choice IDs that match the parser format for existing content
    generateChoiceId = (index: number): string => {
        return `radio-choice-${index}`;
    };

    // Ensure all choices have valid non-empty IDs
    ensureValidIds = (choiceId: string, index: number): string => {
        if (!choiceId || choiceId.trim() === "") {
            return this.generateChoiceId(index);
        }
        return choiceId;
    };

    // Updates the `correct` values for each choice, as well as the new
    // `numCorrect` value as a result. Updates the props with the new values.
    onChange: (arg1: any) => void = ({checked}) => {
        const choices = this.props.choices.map((choice, i) => {
            return {
                ...choice,
                correct: checked[i],
                content:
                    choice.isNoneOfTheAbove && !checked[i]
                        ? ""
                        : choice.content,
                id: this.ensureValidIds(choice.id, i),
            };
        });

        this.props.onChange({
            choices,
            numCorrect: deriveNumCorrect(choices),
        });
    };

    // Called when there is a change to which choice(s) are correct to
    // calculate the new list of correct choices.
    // Calls `onChange` to update the props.
    onStatusChange: (choiceIndex: number, correct: boolean) => void = (
        choiceIndex,
        correct,
    ) => {
        // If we're checking a new answer and multiple-select is not on,
        // we should clear all choices to be unchecked. Otherwise, we should
        // copy the old checked values.
        let newCheckedList;

        if (correct && !this.props.multipleSelect) {
            newCheckedList = this.props.choices.map((_) => false);
        } else {
            newCheckedList = this.props.choices.map((c) => c.correct);
        }

        // Update these options' `correct` values.
        newCheckedList[choiceIndex] = correct;

        this.onChange({
            checked: newCheckedList,
        });
    };

    onContentChange: (arg1: any, arg2: any) => void = (
        choiceIndex,
        newContent,
    ) => {
        const choices = [...this.props.choices];
        choices[choiceIndex] = {
            ...choices[choiceIndex],
            content: newContent,
        };
        this.props.onChange({choices: choices});
    };

    onRationaleChange: (choiceIndex: number, newRationale: string) => void = (
        choiceIndex,
        newRationale,
    ) => {
        const choices = [...this.props.choices];
        choices[choiceIndex] = {
            ...choices[choiceIndex],
            rationale: newRationale,
        };
        if (newRationale === "") {
            delete choices[choiceIndex].rationale;
        }
        // eslint-disable-next-line no-console
        console.log("onRationaleChange, new choices:", choices);
        // eslint-disable-next-line no-console
        console.log("onRationaleChange, new rationale:", newRationale);
        this.props.onChange({choices: choices});
    };

    onDelete: (arg1: number) => void = (choiceIndex) => {
        const choices = this.props.choices.slice();
        const deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices,
            hasNoneOfTheAbove:
                this.props.hasNoneOfTheAbove && !deleted.isNoneOfTheAbove,
            numCorrect: deriveNumCorrect(choices),
        });
    };

    addChoice: (arg1: boolean, arg2: any) => void = (noneOfTheAbove, e) => {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const newChoice: PerseusRadioChoice = {
            isNoneOfTheAbove: noneOfTheAbove,
            content: "",
            id: crypto.randomUUID(),
        };
        const addIndex =
            choices.length - (this.props.hasNoneOfTheAbove ? 1 : 0);

        choices.splice(addIndex, 0, newChoice);

        this.props.onChange(
            {
                choices: choices,
                hasNoneOfTheAbove:
                    noneOfTheAbove || this.props.hasNoneOfTheAbove,
            },
            () => {
                // eslint-disable-next-line react/no-string-refs
                // @ts-expect-error - TS2339 - Property 'refs' does not exist on type 'ReactInstance'.
                this.refs[`choice-editor${addIndex}`].refs[
                    "content-editor"
                ].focus();
            },
        );
    };

    handleMove: (choiceIndex: number, movement: ChoiceMovementType) => void = (
        choiceIndex,
        movement,
    ) => {
        const newChoices = getMovedChoices(
            this.props.choices,
            this.props.hasNoneOfTheAbove,
            choiceIndex,
            movement,
        );

        this.props.onChange({choices: newChoices});
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        // @ts-expect-error - TS2339 - Property 'refs' does not exist on type 'ReactInstance'.
        this.refs["choice-editor0"].refs["content-editor"].focus();
        return true;
    };

    getSaveWarnings: () => ReadonlyArray<string> = () => {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["No choice is marked as correct."];
        }
        return [];
    };

    serialize(): PerseusRadioWidgetOptions {
        const {
            choices,
            randomize,
            multipleSelect,
            countChoices,
            hasNoneOfTheAbove,
            deselectEnabled,
        } = this.props;

        // eslint-disable-next-line no-console
        console.log("serialize, choices:", choices);

        return {
            choices,
            randomize,
            multipleSelect,
            countChoices,
            hasNoneOfTheAbove,
            deselectEnabled,
            numCorrect: deriveNumCorrect(choices),
        };
    }

    render(): React.ReactNode {
        const numCorrect = deriveNumCorrect(this.props.choices);
        return (
            <div>
                <Link
                    href="https://www.khanacademy.org/internal-courses/content-creation-best-practices/xe46daa512cd9c644:question-writing/xe46daa512cd9c644:multiple-choice/a/stems"
                    target="_blank"
                >
                    Multiple choice best practices
                </Link>
                <div className="perseus-widget-row">
                    <LabeledSwitch
                        label="Randomize order"
                        checked={this.props.randomize}
                        onChange={(value) => {
                            this.props.onChange({randomize: value});
                        }}
                        style={{marginBlockEnd: sizing.size_060}}
                    />
                    <LabeledSwitch
                        label="Multiple selections"
                        checked={this.props.multipleSelect}
                        onChange={(value) => {
                            this.onMultipleSelectChange({
                                multipleSelect: value,
                            });
                        }}
                        style={{marginBlockEnd: sizing.size_060}}
                    />
                    {this.props.multipleSelect && (
                        <>
                            <LabeledSwitch
                                label="Specify number correct"
                                checked={this.props.countChoices}
                                onChange={(value) => {
                                    this.onCountChoicesChange({
                                        countChoices: value,
                                    });
                                }}
                                style={{marginBlockEnd: sizing.size_060}}
                            />
                            <Footnote>
                                Current number correct: {numCorrect}
                            </Footnote>
                        </>
                    )}
                </div>

                {this.props.choices.map((choice, index) => (
                    <RadioOptionSettings
                        key={`choice-${choice.id}}`}
                        index={index}
                        choice={choice}
                        multipleSelect={this.props.multipleSelect}
                        onStatusChange={this.onStatusChange}
                        onContentChange={this.onContentChange}
                        onRationaleChange={this.onRationaleChange}
                        showDelete={this.props.choices.length >= 2}
                        showMove={
                            this.props.choices.length > 1 &&
                            !choice.isNoneOfTheAbove
                        }
                        onDelete={() => this.onDelete(index)}
                        onMove={this.handleMove}
                    />
                ))}

                <div className="add-choice-container">
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={plusIcon}
                        onClick={this.addChoice.bind(this, false)}
                        style={{marginInlineEnd: "2.4rem"}}
                    >
                        Add a choice
                    </Button>
                    {!this.props.hasNoneOfTheAbove && (
                        <Button
                            size="small"
                            kind="tertiary"
                            startIcon={plusIcon}
                            onClick={this.addChoice.bind(this, true)}
                        >
                            None of the above
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

export default RadioEditor;
