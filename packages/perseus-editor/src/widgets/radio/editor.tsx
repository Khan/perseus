/* eslint-disable jsx-a11y/anchor-is-valid */
import {components} from "@khanacademy/perseus";
import {radioLogic, deriveNumCorrect} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import Link from "@khanacademy/wonder-blocks-link";
import {semanticColor, sizing} from "@khanacademy/wonder-blocks-tokens";
import {Footnote} from "@khanacademy/wonder-blocks-typography";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";
import _ from "underscore";

import LabeledSwitch from "../../components/labeled-switch";

const {InfoTip} = components;

import {RadioOptionSettings} from "./radio-option-settings";
import {getMovedChoices} from "./utils";

import type {RadioOptionSettingsHandle} from "./radio-option-settings";
import type {ChoiceMovementType} from "./radio-option-settings-actions";
import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusRadioWidgetOptions,
    PerseusRadioChoice,
    RadioDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

type RadioSerializedOptions = PerseusRadioWidgetOptions & {
    _showShuffledPreview?: boolean;
};

// Exported for testing
export interface RadioEditorProps {
    apiOptions: APIOptions;
    countChoices: boolean;
    choices: PerseusRadioChoice[];
    randomize: boolean;
    hasNoneOfTheAbove: boolean;
    multipleSelect: boolean;
    deselectEnabled: boolean;
    static: boolean;
    _showShuffledPreview?: boolean;

    onChange: (
        values: Partial<RadioSerializedOptions>,
        callback?: (() => void) | null,
    ) => void;
}

// JSDoc will be shown in Storybook widget editor description
/**
 * An editor for adding a radio widget that allows users to select a single option from multiple choices.
 */
class RadioEditor extends React.Component<RadioEditorProps> {
    static widgetName = "radio" as const;

    static defaultProps: RadioDefaultWidgetOptions =
        radioLogic.defaultWidgetOptions;

    // Store refs to each choice editor for focus management
    // Using choice.id as key ensures refs remain valid after reorder/delete
    choiceRefs: Map<string, React.RefObject<RadioOptionSettingsHandle>> =
        new Map();

    componentDidMount() {
        // Recalculate numCorrect when multipleSelect and countChoices are enabled
        // This ensures stale values are corrected on load
        if (this.props.multipleSelect && this.props.countChoices) {
            this.props.onChange({
                numCorrect: deriveNumCorrect(this.props.choices),
            });
        }

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

    // Get or create a ref for a choice by its id
    getChoiceRef = (
        choiceId: string,
    ): React.RefObject<RadioOptionSettingsHandle> => {
        if (!this.choiceRefs.has(choiceId)) {
            this.choiceRefs.set(
                choiceId,
                React.createRef<RadioOptionSettingsHandle>(),
            );
        }
        return this.choiceRefs.get(choiceId)!;
    };

    // Called when the "Multiple selections" checkbox is toggled,
    // allowing the content author to specifiy multiple correct answers.
    onMultipleSelectChange: (options: {multipleSelect: boolean}) => void = (
        options,
    ) => {
        const isMultipleSelect = options.multipleSelect;

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
    onCountChoicesChange: (options: {countChoices: boolean}) => void = (
        options,
    ) => {
        const countChoices = options.countChoices;
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
    onChange: (options: {checked: ReadonlyArray<boolean | undefined>}) => void =
        ({checked}) => {
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

    onContentChange: (choiceIndex: number, newContent: string) => void = (
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

        // Clean up the ref for the deleted choice
        this.choiceRefs.delete(deleted.id);

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices,
            hasNoneOfTheAbove:
                this.props.hasNoneOfTheAbove && !deleted.isNoneOfTheAbove,
            numCorrect: deriveNumCorrect(choices),
        });
    };

    addChoice: (noneOfTheAbove: boolean, e: React.SyntheticEvent) => void = (
        noneOfTheAbove,
        e,
    ) => {
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
                // Focus the newly added choice editor
                this.getChoiceRef(newChoice.id).current?.focus();
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
        // Focus the first choice editor
        const firstChoice = this.props.choices[0];
        if (firstChoice?.id) {
            this.getChoiceRef(firstChoice.id).current?.focus();
        }
        return true;
    };

    // TODO(LEMS-3643): Remove `getSaveWarnings` once the frontend uses
    // the new linter rules for save warnings.
    getSaveWarnings: () => ReadonlyArray<string> = () => {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["No choice is marked as correct."];
        }
        return [];
    };

    serialize(): RadioSerializedOptions {
        const {
            choices,
            randomize,
            multipleSelect,
            countChoices,
            hasNoneOfTheAbove,
            deselectEnabled,
            _showShuffledPreview,
        } = this.props;

        const options: RadioSerializedOptions = {
            choices,
            randomize,
            multipleSelect,
            countChoices,
            hasNoneOfTheAbove,
            deselectEnabled,
            numCorrect: deriveNumCorrect(choices),
        };

        if (randomize && _showShuffledPreview) {
            options._showShuffledPreview = true;
        }

        return options;
    }

    render(): React.ReactNode {
        const numCorrect = deriveNumCorrect(this.props.choices);
        const isEditingDisabled = this.props.apiOptions.editingDisabled;

        return (
            <div>
                <Link
                    href="https://www.khanacademy.org/internal-courses/content-creation-best-practices/xe46daa512cd9c644:question-writing/xe46daa512cd9c644:multiple-choice/a/stems"
                    target="_blank"
                >
                    Multiple choice best practices
                </Link>
                <div className="perseus-widget-row">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: sizing.size_040,
                            marginBlockEnd: sizing.size_060,
                        }}
                    >
                        <LabeledSwitch
                            label="Randomize order"
                            checked={this.props.randomize}
                            disabled={isEditingDisabled}
                            onChange={(value) => {
                                this.props.onChange({
                                    randomize: value,
                                    ...(!value && {
                                        _showShuffledPreview: false,
                                    }),
                                });
                            }}
                        />
                        <InfoTip>
                            The editor preview shows choices unshuffled by
                            default. Use &quot;Shuffle preview&quot; to see the
                            randomized order. The Preview tab always shows the
                            randomized order when enabled.
                        </InfoTip>
                    </div>
                    <LabeledSwitch
                        label="Shuffle preview"
                        checked={this.props._showShuffledPreview ?? false}
                        disabled={!this.props.randomize || isEditingDisabled}
                        onChange={(value) => {
                            this.props.onChange({
                                _showShuffledPreview: value,
                            });
                        }}
                        style={{
                            marginBlockEnd: sizing.size_060,
                            ...(!this.props.randomize && {
                                color: semanticColor.core.foreground.disabled
                                    .default,
                            }),
                        }}
                    />
                    <LabeledSwitch
                        label="Multiple selections"
                        checked={this.props.multipleSelect}
                        disabled={isEditingDisabled}
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
                                disabled={isEditingDisabled}
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
                        key={`choice-${choice.id}`}
                        ref={this.getChoiceRef(choice.id)}
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
