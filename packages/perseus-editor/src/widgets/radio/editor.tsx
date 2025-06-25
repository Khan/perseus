/* eslint-disable jsx-a11y/anchor-is-valid */
import {Changeable} from "@khanacademy/perseus";
import {radioLogic, deriveNumCorrect} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {spacing, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Footnote} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";
import _ from "underscore";

import LabeledSwitch from "../../components/labeled-switch";

import {RadioOptionSettings} from "./radio-option-settings";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusRadioWidgetOptions,
    PerseusRadioChoice,
    RadioDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

// Exported for testing
export type RadioEditorProps = {
    apiOptions: APIOptions;
    countChoices: boolean;
    choices: PerseusRadioChoice[];
    randomize: boolean;
    hasNoneOfTheAbove: boolean;
    multipleSelect: boolean;
    deselectEnabled: boolean;
    static: boolean;
} & Changeable.ChangeableProps;

class RadioEditor extends React.Component<RadioEditorProps> {
    static widgetName = "radio" as const;

    static defaultProps: RadioDefaultWidgetOptions =
        radioLogic.defaultWidgetOptions;

    change: (...args: ReadonlyArray<unknown>) => any = (...args) => {
        // @ts-expect-error - TS2345 - Argument of type 'readonly unknown[]' is not assignable to parameter of type 'any[]'.
        return Changeable.change.apply(this, args);
    };

    // Called when the "Multiple selections" checkbox is toggled,
    // allowing the content author to specifiy multiple correct answers.
    onMultipleSelectChange: (arg1: any) => any = (allowMultiple) => {
        allowMultiple = allowMultiple.multipleSelect;

        const numCorrect = _.reduce(
            this.props.choices,
            function (memo, choice) {
                return choice.correct ? memo + 1 : memo;
            },
            0,
        );

        if (!allowMultiple && numCorrect > 1) {
            const choices = _.map(this.props.choices, function (choice) {
                return _.defaults(
                    {
                        correct: false,
                    },
                    choice,
                );
            });
            this.props.onChange({
                multipleSelect: allowMultiple,
                choices: choices,
            });
        } else {
            this.props.onChange({
                multipleSelect: allowMultiple,
            });
        }
    };

    // Called when the "Specify number correct" checkbox is toggled,
    // making it so that the title reads "Choose [number] answers"
    onCountChoicesChange: (arg1: any) => void = (count) => {
        count = count.countChoices;
        this.props.onChange({countChoices: count});
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
            };
        });

        this.props.onChange({
            choices: choices,
            numCorrect: deriveNumCorrect({
                ...this.props,
                choices,
                // When deriving numCorrect, we don't want to pass the current value,
                // as it has changed.
                numCorrect: undefined,
            }),
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
        this.props.onChange({choices: choices});
    };

    onDelete: (arg1: number) => void = (choiceIndex) => {
        const choices = this.props.choices.slice();
        const deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove:
                this.props.hasNoneOfTheAbove && !deleted.isNoneOfTheAbove,
        });
    };

    addChoice: (arg1: boolean, arg2: any) => void = (noneOfTheAbove, e) => {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const newChoice: PerseusRadioChoice = {
            isNoneOfTheAbove: noneOfTheAbove,
            content: "",
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

        return {
            choices,
            randomize,
            multipleSelect,
            countChoices,
            hasNoneOfTheAbove,
            deselectEnabled,
            numCorrect: deriveNumCorrect({
                ...this.props,
                // When deriving numCorrect, we don't want to pass the current value,
                // as it has changed.
                numCorrect: undefined,
            }),
        };
    }

    render(): React.ReactNode {
        const numCorrect = _.reduce(
            this.props.choices,
            function (memo, choice) {
                return choice.correct ? memo + 1 : memo;
            },
            0,
        );
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
                        key={`choice-${index}}`}
                        index={index}
                        choice={choice}
                        multipleSelect={this.props.multipleSelect}
                        onStatusChange={this.onStatusChange}
                        onContentChange={this.onContentChange}
                        onRationaleChange={this.onRationaleChange}
                        onDelete={() => this.onDelete(index)}
                        showDelete={this.props.choices.length >= 2}
                    />
                ))}

                <div className="add-choice-container">
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={plusIcon}
                        onClick={this.addChoice.bind(this, false)}
                    >
                        Add a choice
                    </Button>
                    <Strut size={spacing.large_24} />
                    <Button
                        size="small"
                        kind="tertiary"
                        startIcon={plusIcon}
                        onClick={this.addChoice.bind(this, true)}
                    >
                        None of the above
                    </Button>
                </div>
            </div>
        );
    }
}

export default RadioEditor;
