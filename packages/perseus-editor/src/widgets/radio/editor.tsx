/* eslint-disable jsx-a11y/anchor-is-valid */
import {BaseRadio} from "@khanacademy/perseus";
import {radioLogic, deriveNumCorrect} from "@khanacademy/perseus-core";
import Button from "@khanacademy/wonder-blocks-button";
import {Strut} from "@khanacademy/wonder-blocks-layout";
import Link from "@khanacademy/wonder-blocks-link";
import {spacing, sizing} from "@khanacademy/wonder-blocks-tokens";
import plusIcon from "@phosphor-icons/core/bold/plus-bold.svg";
import * as React from "react";
import _ from "underscore";

import LabeledSwitch from "../../components/labeled-switch";
import Editor from "../../editor";

import type {APIOptions, Changeable} from "@khanacademy/perseus";
import type {
    PerseusRadioWidgetOptions,
    PerseusRadioChoice,
    RadioDefaultWidgetOptions,
} from "@khanacademy/perseus-core";

type Contentful = {content?: string};
type ChoiceEditorProps = {
    apiOptions: APIOptions;
    choice: PerseusRadioChoice;
    showDelete: boolean;
    onRationaleChange: (newProps: Contentful) => void;
    onContentChange: (newProps: Contentful) => void;
    onDelete: () => void;
};

class ChoiceEditor extends React.Component<ChoiceEditorProps> {
    render(): React.ReactNode {
        const checkedClass = this.props.choice.correct
            ? "correct"
            : "incorrect";
        let placeholder = "Type a choice here...";

        if (this.props.choice.isNoneOfTheAbove) {
            placeholder = this.props.choice.correct
                ? "Type the answer to reveal to the user..."
                : "None of the above";
        }

        const editor = (
            <Editor
                // eslint-disable-next-line react/no-string-refs
                ref="content-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.choice.content || ""}
                widgetEnabled={false}
                placeholder={placeholder}
                disabled={
                    this.props.choice.isNoneOfTheAbove &&
                    !this.props.choice.correct
                }
                onChange={this.props.onContentChange}
            />
        );

        const rationaleEditor = (
            <Editor
                // eslint-disable-next-line react/no-string-refs
                ref="rationale-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.choice.rationale || ""}
                widgetEnabled={false}
                placeholder={`Why is this choice ${checkedClass}?`}
                onChange={this.props.onRationaleChange}
            />
        );
        const deleteLink = (
            <a
                className="simple-button orange delete-choice"
                href="#"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.props.onDelete();
                }}
                title="Remove this choice"
            >
                Remove this choice
            </a>
        );

        return (
            <div className="choice-rationale-editors">
                <div className={`choice-editor ${checkedClass}`}>{editor}</div>
                <div className="rationale-editor">{rationaleEditor}</div>
                {this.props.showDelete && deleteLink}
            </div>
        );
    }
}

type RadioEditorProps = {
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

    onMultipleSelectChange: (arg1: any) => any = (allowMultiple) => {
        const isMultipleSelect = allowMultiple.multipleSelect;

        // When switching to single-select mode, we want to deselect all
        // choices if more than one choice is currently selected as correct.
        let choices = this.props.choices;
        if (!isMultipleSelect) {
            const numCorrect = deriveNumCorrect(this.props);
            if (numCorrect > 1) {
                choices = choices.map((choice) => {
                    return {
                        ...choice,
                        correct: false,
                    };
                });
            }
        }

        // Update with the updated choices and recalculate numCorrect
        this.props.onChange({
            multipleSelect: isMultipleSelect,
            choices,
            numCorrect: deriveNumCorrect({
                ...this.props,
                choices,
            }),
        });
    };

    onCountChoicesChange: (arg1: any) => void = (count) => {
        const countChoices = count.countChoices;
        this.props.onChange({
            countChoices,
        });
    };

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
            }),
        });
    };

    onContentChange: (arg1: any, arg2: any) => void = (
        choiceIndex,
        newContent,
    ) => {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent,
        });
        this.props.onChange({choices: choices});
    };

    onRationaleChange(choiceIndex: number, newRationale: string): void {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            rationale: newRationale,
        });
        if (newRationale === "") {
            delete choices[choiceIndex].rationale;
        }
        this.props.onChange({choices: choices});
    }

    onDelete: (arg1: number) => void = (choiceIndex) => {
        const choices = this.props.choices.slice();
        const deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove:
                this.props.hasNoneOfTheAbove && !deleted.isNoneOfTheAbove,
            numCorrect: deriveNumCorrect({
                ...this.props,
                choices,
                numCorrect: undefined,
            }),
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
            numCorrect: deriveNumCorrect(this.props),
        };
    }

    render(): React.ReactNode {
        const numCorrect = deriveNumCorrect(this.props);
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
                    )}
                </div>

                <BaseRadio
                    multipleSelect={this.props.multipleSelect}
                    countChoices={this.props.countChoices}
                    numCorrect={numCorrect}
                    editMode={true}
                    labelWrap={false}
                    apiOptions={this.props.apiOptions}
                    reviewMode={false}
                    choices={this.props.choices.map((choice, i) => {
                        return {
                            content: (
                                <ChoiceEditor
                                    ref={`choice-editor${i}`}
                                    apiOptions={this.props.apiOptions}
                                    choice={choice}
                                    onContentChange={(newProps) => {
                                        if (newProps.content != null) {
                                            this.onContentChange(
                                                i,
                                                newProps.content,
                                            );
                                        }
                                    }}
                                    onRationaleChange={(newProps) => {
                                        if (newProps.content != null) {
                                            this.onRationaleChange(
                                                i,
                                                newProps.content,
                                            );
                                        }
                                    }}
                                    onDelete={() => this.onDelete(i)}
                                    showDelete={this.props.choices.length >= 2}
                                />
                            ),
                            isNoneOfTheAbove: choice.isNoneOfTheAbove,
                            checked: choice.correct,
                        } as any;
                    }, this)}
                    onChange={this.onChange}
                />

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
