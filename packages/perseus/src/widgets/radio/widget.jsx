/* eslint-disable react/sort-comp */
// @flow
import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as i18n from "@khanacademy/wonder-blocks-i18n";
import * as React from "react";
import _ from "underscore";

import Renderer from "../../renderer.jsx";
import Util from "../../util.js";
import PassageRef from "../passage-ref.jsx";

import BaseRadio from "./base-radio.jsx";

import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
} from "../../perseus-types.js";
import type {PerseusScore, WidgetProps} from "../../types.js";

// RenderProps is the return type for radio.jsx#transform
export type RenderProps = {|
    numCorrect: number,
    hasNoneOfTheAbove?: boolean,
    multipleSelect?: boolean,
    countChoices?: boolean,
    deselectEnabled?: boolean,
    choices: $ReadOnlyArray<PerseusRadioChoice>,
    selectedChoices: $ReadOnlyArray<PerseusRadioChoice["correct"]>,
    choiceStates?: $ReadOnlyArray<$FlowFixMe>,
|};

type UserInput = {|
    countChoices?: boolean,
    choicesSelected: $ReadOnlyArray<boolean>,
    numCorrect?: number,
    noneOfTheAboveIndex?: ?number,
    noneOfTheAboveSelected?: boolean,
|};
type Rubric = PerseusRadioWidgetOptions;
type Props = WidgetProps<RenderProps, Rubric>;

class Radio extends React.Component<Props> {
    static defaultProps: $FlowFixMe = {
        choices: [{}],
        displayCount: null,
        multipleSelect: false,
        countChoices: false,
        deselectEnabled: false,
        linterContext: linterContextDefault,
    };

    _renderRenderer: (string) => React.Node = (content) => {
        content = content || "";

        let nextPassageRefId = 1;
        const widgets = {};

        const modContent = content.replace(
            /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
            (match, passageNum, refNum, summaryText) => {
                const widgetId = "passage-ref " + nextPassageRefId;
                nextPassageRefId++;

                widgets[widgetId] = {
                    type: "passage-ref",
                    graded: false,
                    options: {
                        passageNumber: parseInt(passageNum),
                        referenceNumber: parseInt(refNum),
                        summaryText: summaryText,
                    },
                    version: PassageRef.version,
                };

                return "[[" + Util.snowman + " " + widgetId + "]]";
            },
        );

        // alwaysUpdate={true} so that passage-refs findWidgets
        // get called when the outer passage updates the renderer
        // TODO(aria): This is really hacky
        // We pass in a key here so that we avoid a semi-spurious
        // react warning when the ChoiceNoneAbove renders a
        // different renderer in the same place. Note this destroys
        // state, but since all we're doing is outputting
        // "None of the above", that is okay.
        // TODO(mdr): Widgets inside this Renderer are not discoverable through
        //     the parent Renderer's `findWidgets` function.
        return (
            <Renderer
                key="choiceContentRenderer"
                content={modContent}
                widgets={widgets}
                findExternalWidgets={this.props.findWidgets}
                alwaysUpdate={true}
                linterContext={{
                    ...this.props.linterContext,
                    blockHighlight: true,
                }}
            />
        );
    };

    // TODO(LP-10672): I think this might be unused right now. I can't find anywhere
    // that we pass a value to `.focus()` and it seems to have been used for
    // adding hints when editing.
    // See: https://github.com/Khan/perseus/blame/e18582b4b69959270b90e237ef1813899711ddfa/src/widgets/radio.js#L169
    focus: ($FlowFixMe) => boolean = (i) => {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.baseRadio.focus(i);
    };

    // When `BaseRadio`'s `onChange` handler is called, indicating a change in
    // our choices' state, we need to call our `onChange` handler in order to
    // persist those changes in the item's Perseus state.
    //
    // So, given the new values for each choice, construct the new
    // `choiceStates` objects, and pass them to `this.props.onChange`.
    //
    // `newValueLists` is an object with two keys: `checked` and `crossedOut`.
    // Each contains an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    //
    // NOTE(mdr): This method expects to be auto-bound. If this component is
    //     converted to an ES6 class, take care to auto-bind this method!
    updateChoices: ($FlowFixMe) => void = (newValueLists) => {
        const {choiceStates, choices} = this.props;

        // Construct the baseline `choiceStates` objects. If this is the user's
        // first interaction with the widget, we'll need to initialize them to
        // new objects with all fields set to the default values. Otherwise, we
        // should clone the old `choiceStates` objects, in preparation to
        // mutate them.
        let newChoiceStates;
        if (choiceStates) {
            newChoiceStates = choiceStates.map((state) => ({...state}));
        } else {
            newChoiceStates = choices.map(() => ({
                selected: false,
                crossedOut: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
                readOnly: false,
            }));
        }

        // Mutate the new `choiceState` objects, according to the new `checked`
        // and `crossedOut` values provided in `newValueLists`.
        newChoiceStates.forEach((choiceState, i) => {
            choiceState.selected = newValueLists.checked[i];
            choiceState.crossedOut = newValueLists.crossedOut[i];
        });

        this.props.onChange({choiceStates: newChoiceStates});
        this.props.trackInteraction();
    };

    getUserInput: () => UserInput = () => {
        return Radio.getUserInputFromProps(this.props);
    };

    simpleValidate: (PerseusRadioWidgetOptions) => PerseusScore = (rubric) => {
        return Radio.validate(this.getUserInput(), rubric);
    };

    /**
     * Turn on rationale display for the currently selected choices. Note that
     * this leaves rationales on for choices that are already showing
     * rationales.
     */
    showRationalesForCurrentlySelectedChoices: (PerseusRadioWidgetOptions) => void =
        (rubric) => {
            const {choiceStates} = this.props;
            if (choiceStates) {
                const score = this.simpleValidate(rubric);
                const widgetCorrect =
                    score.type === "points" && score.total === score.earned;

                const newStates = choiceStates.map((state) => ({
                    ...state,
                    highlighted: state.selected,
                    // If the choice is selected, show the rationale now
                    rationaleShown:
                        state.selected ||
                        // If the choice already had a rationale, keep it shown
                        state.rationaleShown ||
                        // If the widget is correctly answered, show the rationale
                        // for all the choices
                        widgetCorrect,
                    // We use the same behavior for the readOnly flag as for
                    // rationaleShown, but we keep it separate in case other
                    // behaviors want to disable choices without showing rationales.
                    readOnly: state.selected || state.readOnly || widgetCorrect,
                    correctnessShown: state.selected || state.correctnessShown,
                    previouslyAnswered:
                        state.previouslyAnswered || state.selected,
                }));

                this.props.onChange(
                    {
                        choiceStates: newStates,
                    },
                    null, // cb
                    true, // silent
                );
            }
        };

    /**
     * Deselects any currently-selected choices that are not correct choices.
     */
    deselectIncorrectSelectedChoices: () => void = () => {
        if (this.props.choiceStates) {
            const newStates = this.props.choiceStates.map((state, i) => ({
                ...state,
                selected: state.selected && !!this.props.choices[i].correct,
                highlighted: false,
            }));

            this.props.onChange(
                {
                    choiceStates: newStates,
                },
                null, // cb
                false, // silent
            );
        }
    };

    render(): React.Node {
        let choices = this.props.choices;
        let choiceStates;
        if (this.props.static) {
            choiceStates = _.map(choices, (val) => ({
                selected: val.correct,
                crossedOut: val.crossedOut,
                readOnly: true,
                highlighted: false,
                rationaleShown: true,
                correctnessShown: true,
                previouslyAnswered: false,
            }));
        } else if (this.props.choiceStates) {
            choiceStates = this.props.choiceStates;
            // $FlowFixMe[prop-missing]
        } else if (this.props.values) {
            // Support legacy choiceStates implementation
            /* istanbul ignore next - props.values is deprecated */
            choiceStates = _.map(this.props.values, (val) => ({
                selected: val,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
            }));
        } else {
            choiceStates = _.map(choices, () => ({
                selected: false,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
            }));
        }

        choices = _.map(choices, (choice, i) => {
            const content =
                choice.isNoneOfTheAbove && !choice.content
                    ? // we use i18n._ instead of $_ here because the content
                      // sent to a renderer needs to be a string, not a react
                      // node (/renderable/fragment).
                      i18n._("None of the above")
                    : choice.content;

            const {
                selected,
                crossedOut,
                rationaleShown,
                correctnessShown,
                readOnly,
                highlighted,
                previouslyAnswered,
            } = choiceStates[i];

            const reviewChoice =
                this.props.reviewModeRubric &&
                this.props.reviewModeRubric.choices[i];

            return {
                content: this._renderRenderer(content),
                checked: selected,
                // Current versions of the radio widget always pass in the
                // "correct" value through the choices. Old serialized state
                // for radio widgets doesn't have this though, so we have to
                // pull the correctness out of the review mode rubric. This
                // only works because all of the places we use
                // `restoreSerializedState()` also turn on reviewMode, but is
                // fine for now.
                // TODO(emily): Come up with a more comprehensive way to solve
                // this sort of "serialized state breaks when internal
                // structure changes" problem.
                correct:
                    typeof choice.correct === "undefined"
                        ? !!reviewChoice && reviewChoice.correct
                        : choice.correct,
                disabled: readOnly,
                hasRationale: !!choice.clue,
                rationale: this._renderRenderer(choice.clue),
                showRationale: rationaleShown,
                showCorrectness: correctnessShown,
                isNoneOfTheAbove: choice.isNoneOfTheAbove,
                revealNoneOfTheAbove: this.props.questionCompleted && selected,
                crossedOut,
                highlighted,
                previouslyAnswered: previouslyAnswered,
            };
        });

        return (
            <BaseRadio
                // eslint-disable-next-line react/no-string-refs
                ref="baseRadio"
                labelWrap={true}
                multipleSelect={this.props.multipleSelect}
                countChoices={this.props.countChoices}
                numCorrect={this.props.numCorrect}
                choices={choices}
                onChange={this.updateChoices}
                reviewModeRubric={this.props.reviewModeRubric}
                deselectEnabled={this.props.deselectEnabled}
                apiOptions={this.props.apiOptions}
                isLastUsedWidget={this.props.isLastUsedWidget}
            />
        );
    }

    static validate(userInput: UserInput, rubric: Rubric): PerseusScore {
        const numSelected = _.reduce(
            userInput.choicesSelected,
            (sum, selected) => {
                return sum + (selected ? 1 : 0);
            },
            0,
        );

        if (numSelected === 0) {
            return {
                type: "invalid",
                message: null,
            };
        }
        // $FlowFixMe[invalid-compare]
        if (userInput.numCorrect > 1 && numSelected !== userInput.numCorrect) {
            return {
                type: "invalid",
                message: i18n._("Please choose the correct number of answers."),
            };
            // If NOTA and some other answer are checked, ...
        }
        if (userInput.noneOfTheAboveSelected && numSelected > 1) {
            return {
                type: "invalid",
                message: i18n._(
                    "'None of the above' may not be selected " +
                        "when other answers are selected.",
                ),
            };
        }
        /* jshint -W018 */
        const correct = _.all(userInput.choicesSelected, (selected, i) => {
            let isCorrect;
            if (userInput.noneOfTheAboveIndex === i) {
                isCorrect = _.all(rubric.choices, (choice, j) => {
                    return i === j || !choice.correct;
                });
            } else {
                isCorrect = !!rubric.choices[i].correct;
            }
            return isCorrect === selected;
        });
        /* jshint +W018 */

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null,
        };
    }

    static getUserInputFromProps(props: Props): UserInput {
        // Return checked inputs in the form {choicesSelected: [bool]}. (Dear
        // future timeline implementers: this used to be {value: i} before
        // multiple select was added)
        if (props.choiceStates) {
            let noneOfTheAboveIndex = null;
            let noneOfTheAboveSelected = false;

            const choiceStates = props.choiceStates;
            const choicesSelected = choiceStates.map(() => false);
            const countChoices = props.countChoices;
            const numCorrect = props.numCorrect;

            for (let i = 0; i < choicesSelected.length; i++) {
                // $FlowFixMe[prop-missing]
                const index = props.choices[i].originalIndex;
                // $FlowFixMe[incompatible-use]
                choicesSelected[index] = choiceStates[i].selected;

                if (props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;

                    if (choicesSelected[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }

            return {
                countChoices,
                choicesSelected,
                numCorrect,
                noneOfTheAboveIndex,
                noneOfTheAboveSelected,
            };
            // Support legacy choiceState implementation
        }
        /* istanbul ignore if - props.values is deprecated */
        // $FlowFixMe[prop-missing]
        if (props.values) {
            let noneOfTheAboveIndex = null;
            let noneOfTheAboveSelected = false;

            const values = props.values.slice();
            const countChoices = props.countChoices;
            const numCorrect = props.numCorrect;

            for (let i = 0; i < props.values.length; i++) {
                const index = props.choices[i].originalIndex;
                values[index] = props.values[i];

                if (props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;
                    if (values[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }
            return {
                choicesSelected: values,
                noneOfTheAboveIndex,
                noneOfTheAboveSelected,
                countChoices,
                numCorrect,
            };
        }
        // Nothing checked
        return {
            choicesSelected: _.map(props.choices, () => false),
        };
    }
}

export default Radio;
