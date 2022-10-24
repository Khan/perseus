/* eslint-disable jsx-a11y/anchor-is-valid, react/forbid-prop-types, react/sort-comp */
// @flow
import {
    components,
    icons,
    ApiOptions,
    BaseRadio,
    Changeable,
} from "@khanacademy/perseus";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import Editor from "../../editor.jsx";

const {InlineIcon, PropCheckBox} = components;
const {iconPlus, iconTrash} = icons;

class ChoiceEditor extends React.Component<$FlowFixMe> {
    static propTypes = {
        apiOptions: ApiOptions.propTypes,

        choice: PropTypes.object,
        showDelete: PropTypes.bool,
        onClueChange: PropTypes.func,
        onContentChange: PropTypes.func,
        onDelete: PropTypes.func,
    };

    render(): React.Node {
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

        const clueEditor = (
            <Editor
                // eslint-disable-next-line react/no-string-refs
                ref="clue-editor"
                apiOptions={this.props.apiOptions}
                content={this.props.choice.clue || ""}
                widgetEnabled={false}
                placeholder={i18n._(
                    "Why is this choice %(correctOrIncorrect)s?",
                    {correctOrIncorrect: checkedClass},
                )}
                onChange={this.props.onClueChange}
            />
        );

        const deleteLink = (
            <a
                className="simple-button orange delete-choice"
                href="#"
                onClick={this.props.onDelete}
                title="Remove this choice"
            >
                <InlineIcon {...iconTrash} />
            </a>
        );

        return (
            <div className="choice-clue-editors">
                <div className={`choice-editor ${checkedClass}`}>{editor}</div>
                <div className="clue-editor">{clueEditor}</div>
                {this.props.showDelete && deleteLink}
            </div>
        );
    }
}

class RadioEditor extends React.Component<$FlowFixMe> {
    static propTypes = {
        ...Changeable.propTypes,
        apiOptions: ApiOptions.propTypes,
        choices: PropTypes.arrayOf(
            PropTypes.shape({
                content: PropTypes.string,
                clue: PropTypes.string,
                correct: PropTypes.bool,
            }),
        ),
        displayCount: PropTypes.number,
        randomize: PropTypes.bool,
        hasNoneOfTheAbove: PropTypes.bool,
        multipleSelect: PropTypes.bool,
        countChoices: PropTypes.bool,

        // TODO(kevinb): DEPRECATED: This is be used to force deselectEnabled
        // behavior on mobile but not on desktop.  When enabled, the user can
        // deselect a radio input by tapping on it again.
        deselectEnabled: PropTypes.bool,

        static: PropTypes.bool,
    };

    static widgetName: string = "radio";

    static defaultProps: $FlowFixMe = {
        choices: [{}, {}],
        displayCount: null,
        randomize: false,
        hasNoneOfTheAbove: false,
        multipleSelect: false,
        countChoices: false,
        deselectEnabled: false,
    };

    render(): React.Node {
        const numCorrect = _.reduce(
            this.props.choices,
            function (memo, choice) {
                return choice.correct ? memo + 1 : memo;
            },
            0,
        );
        return (
            <div>
                <div className="perseus-widget-row">
                    <a
                        href={
                            // This is an editor component, not user-facing.
                            "https://docs.google.com/document/d/1frZf7yrWVWb1n4tVjqlzqVUiv1pn4cZXbxgP62-JDBY/edit#heading=h.8ng1isya19nu"
                        }
                        target="_blank"
                    >
                        Multiple choice style guide
                    </a>
                    <br />
                    <div className="perseus-widget-left-col">
                        <PropCheckBox
                            label="Multiple selections"
                            labelAlignment="right"
                            multipleSelect={this.props.multipleSelect}
                            onChange={this.onMultipleSelectChange}
                        />
                    </div>
                    <div className="perseus-widget-right-col">
                        <PropCheckBox
                            label="Randomize order"
                            labelAlignment="right"
                            randomize={this.props.randomize}
                            onChange={this.props.onChange}
                        />
                    </div>
                    {this.props.multipleSelect && (
                        <div className="perseus-widget-left-col">
                            <PropCheckBox
                                label="Specify number correct"
                                labelAlignment="right"
                                countChoices={this.props.countChoices}
                                onChange={this.onCountChoicesChange}
                            />
                        </div>
                    )}
                </div>

                <BaseRadio
                    multipleSelect={this.props.multipleSelect}
                    countChoices={this.props.countChoices}
                    numCorrect={numCorrect}
                    editMode={true}
                    labelWrap={false}
                    apiOptions={this.props.apiOptions}
                    choices={this.props.choices.map(function (choice, i) {
                        return {
                            content: (
                                <ChoiceEditor
                                    ref={`choice-editor${i}`}
                                    apiOptions={this.props.apiOptions}
                                    choice={choice}
                                    onContentChange={(newProps) => {
                                        if ("content" in newProps) {
                                            this.onContentChange(
                                                i,
                                                newProps.content,
                                            );
                                        }
                                    }}
                                    onClueChange={(newProps) => {
                                        if ("content" in newProps) {
                                            this.onClueChange(
                                                i,
                                                newProps.content,
                                            );
                                        }
                                    }}
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onDelete={this.onDelete.bind(this, i)}
                                    showDelete={this.props.choices.length >= 2}
                                />
                            ),
                            isNoneOfTheAbove: choice.isNoneOfTheAbove,
                            checked: choice.correct,
                        };
                    }, this)}
                    onChange={this.onChange}
                />

                <div className="add-choice-container">
                    <a
                        className="simple-button orange"
                        href="#"
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={this.addChoice.bind(this, false)}
                    >
                        <InlineIcon {...iconPlus} /> Add a choice{" "}
                    </a>

                    {!this.props.hasNoneOfTheAbove && (
                        <a
                            className="simple-button"
                            href="#"
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={this.addChoice.bind(this, true)}
                        >
                            <InlineIcon {...iconPlus} /> None of the above{" "}
                        </a>
                    )}
                </div>
            </div>
        );
    }

    change: (...args: $ReadOnlyArray<mixed>) => $FlowFixMe = (...args) => {
        // $FlowFixMe[incompatible-call]
        return Changeable.change.apply(this, args);
    };

    onMultipleSelectChange: ($FlowFixMe) => $FlowFixMe = (allowMultiple) => {
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

    onCountChoicesChange: ($FlowFixMe) => void = (count) => {
        count = count.countChoices;
        this.props.onChange({countChoices: count});
    };

    onChange: ($FlowFixMe) => void = ({checked}) => {
        const choices = _.map(this.props.choices, (choice, i) => {
            return _.extend({}, choice, {
                correct: checked[i],
                content:
                    choice.isNoneOfTheAbove && !checked[i]
                        ? ""
                        : choice.content,
            });
        });

        this.props.onChange({choices: choices});
    };

    onContentChange: ($FlowFixMe, $FlowFixMe) => void = (
        choiceIndex,
        newContent,
    ) => {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent,
        });
        this.props.onChange({choices: choices});
    };

    onClueChange: ($FlowFixMe, $FlowFixMe) => void = (choiceIndex, newClue) => {
        const choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            clue: newClue,
        });
        if (newClue === "") {
            delete choices[choiceIndex].clue;
        }
        this.props.onChange({choices: choices});
    };

    onDelete: (number, $FlowFixMe) => void = (choiceIndex, e) => {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const deleted = choices[choiceIndex];

        choices.splice(choiceIndex, 1);

        this.props.onChange({
            choices: choices,
            hasNoneOfTheAbove:
                this.props.hasNoneOfTheAbove && !deleted.isNoneOfTheAbove,
        });
    };

    addChoice: (boolean, $FlowFixMe) => void = (noneOfTheAbove, e) => {
        e.preventDefault();

        const choices = this.props.choices.slice();
        const newChoice = {isNoneOfTheAbove: noneOfTheAbove};
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
                this.refs[`choice-editor${addIndex}`].refs[
                    "content-editor"
                ].focus();
            },
        );
    };

    setDisplayCount: (number) => void = (num) => {
        this.props.onChange({displayCount: num});
    };

    focus: () => boolean = () => {
        // eslint-disable-next-line react/no-string-refs
        this.refs["choice-editor0"].refs["content-editor"].focus();
        return true;
    };

    getSaveWarnings: () => $ReadOnlyArray<string> = () => {
        if (!_.some(_.pluck(this.props.choices, "correct"))) {
            return ["No choice is marked as correct."];
        }
        return [];
    };

    serialize: () => $FlowFixMe = () => {
        return _.pick(
            this.props,
            "choices",
            "randomize",
            "multipleSelect",
            "countChoices",
            "displayCount",
            "hasNoneOfTheAbove",
            "deselectEnabled",
        );
    };
}

export default RadioEditor;
