import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {PerseusI18nContext} from "../../components/i18n-context";
import Renderer from "../../renderer";
import Util from "../../util";
import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import PassageRef from "../passage-ref/passage-ref";

import BaseRadio from "./base-radio";
import scoreRadio from "./score-radio";

import type {FocusFunction, ChoiceType} from "./base-radio";
import type {
    PerseusRadioChoice,
    PerseusRadioWidgetOptions,
    ShowSolutions,
} from "../../perseus-types";
import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {
    PerseusRadioScoringData,
    PerseusRadioUserInput,
} from "../../validation.types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

// RenderProps is the return type for radio.jsx#transform
export type RenderProps = {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    selectedChoices: ReadonlyArray<PerseusRadioChoice["correct"]>;
    showSolutions?: ShowSolutions;
    choiceStates?: ReadonlyArray<ChoiceState>;
    // Depreciated; support for legacy way of handling changes
    // Adds proptype for prop that is used but was lacking type
    values?: ReadonlyArray<boolean>;
};

type Props = WidgetProps<RenderProps, PerseusRadioScoringData>;

type DefaultProps = Required<
    Pick<
        Props,
        | "choices"
        | "multipleSelect"
        | "countChoices"
        | "deselectEnabled"
        | "linterContext"
        | "showSolutions"
    >
>;

export type RadioChoiceWithMetadata = PerseusRadioChoice & {
    originalIndex: number;
    correct: boolean;
};

class Radio extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    // @ts-expect-error - TS2564 - Property 'focusFunction' has no initializer and is not definitely assigned in the constructor.
    focusFunction: FocusFunction;

    static defaultProps: DefaultProps = {
        choices: [],
        multipleSelect: false,
        countChoices: false,
        deselectEnabled: false,
        linterContext: linterContextDefault,
        showSolutions: "none",
    };

    static getUserInputFromProps(
        props: Props,
        unshuffle: boolean = true,
    ): PerseusRadioUserInput {
        // Return checked inputs in the form {choicesSelected: [bool]}. (Dear
        // future timeline implementers: this used to be {value: i} before
        // multiple select was added)
        if (props.choiceStates) {
            const choiceStates = props.choiceStates;
            const choicesSelected = choiceStates.map(() => false);

            for (let i = 0; i < choicesSelected.length; i++) {
                const index = unshuffle ? props.choices[i].originalIndex : i;

                choicesSelected[index] = choiceStates[i].selected;
            }

            return {
                choicesSelected,
            };
            // Support legacy choiceState implementation
        }
        /* c8 ignore if - props.values is deprecated */
        const {values} = props;
        if (values) {
            const choicesSelected = [...values];
            const valuesLength = values.length;

            for (let i = 0; i < valuesLength; i++) {
                const index = unshuffle ? props.choices[i].originalIndex : i;
                choicesSelected[index] = values[i];
            }
            return {
                choicesSelected,
            };
        }
        // Nothing checked
        return {
            choicesSelected: props.choices.map(() => false),
        };
    }

    componentDidUpdate(prevProps: Props) {
        if (
            this.props.showSolutions === "selected" &&
            prevProps.showSolutions !== "selected"
        ) {
            this.showRationalesForCurrentlySelectedChoices(this.props);
        }
    }

    _renderRenderer: (content?: string) => React.ReactElement = (
        content = "",
    ) => {
        let nextPassageRefId = 1;
        const widgets: Record<string, any> = {};

        const modContent = content.replace(
            /\{\{passage-ref (\d+) (\d+)(?: "([^"]*)")?\}\}/g,
            (
                match: string,
                passageNum: string,
                refNum: string,
                summaryText: string,
            ) => {
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
                    // @ts-expect-error - TS2322 - Type '{ blockHighlight: true; contentType: string; highlightLint: boolean; paths: readonly string[]; stack: readonly string[]; }' is not assignable to type 'LinterContextProps'.
                    blockHighlight: true,
                }}
                strings={this.context.strings}
            />
        );
    };

    // TODO(LP-10672): I think this might be unused right now. I can't find anywhere
    // that we pass a value to `.focus()` and it seems to have been used for
    // adding hints when editing.
    // See: https://github.com/Khan/perseus/blame/e18582b4b69959270b90e237ef1813899711ddfa/src/widgets/radio.js#L169
    focus(choiceIndex?: number | null): boolean {
        if (this.focusFunction) {
            return this.focusFunction(choiceIndex);
        }

        return false;
    }

    // lets BaseRadio regiser a focus callback so widget
    // can focus an individual choice
    registerFocusFunction(fun: FocusFunction): void {
        this.focusFunction = fun;
    }

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
    updateChoices: (
        newValueLists: Readonly<{
            checked: ReadonlyArray<boolean>;
            crossedOut: ReadonlyArray<boolean>;
        }>,
    ) => void = (newValueLists) => {
        const {choiceStates, choices} = this.props;

        // Construct the baseline `choiceStates` objects. If this is the user's
        // first interaction with the widget, we'll need to initialize them to
        // new objects with all fields set to the default values. Otherwise, we
        // should clone the old `choiceStates` objects, in preparation to
        // mutate them.
        const newChoiceStates = choiceStates
            ? choiceStates.map((state: ChoiceState) => ({...state}))
            : choices.map(() => ({
                  selected: false,
                  crossedOut: false,
                  highlighted: false,
                  rationaleShown: false,
                  correctnessShown: false,
                  previouslyAnswered: false,
                  readOnly: false,
              }));

        // Mutate the new `choiceState` objects, according to the new `checked`
        // and `crossedOut` values provided in `newValueLists`.
        newChoiceStates.forEach((choiceState: ChoiceState, i) => {
            choiceState.selected = newValueLists.checked[i];
            choiceState.crossedOut = newValueLists.crossedOut[i];
        });

        this.props.onChange({choiceStates: newChoiceStates});
        this.props.trackInteraction();
    };

    getUserInput(): PerseusRadioUserInput {
        return Radio.getUserInputFromProps(this.props);
    }

    getPromptJSON(): RadioPromptJSON {
        const userInput = Radio.getUserInputFromProps(this.props, false);
        return _getPromptJSON(this.props, userInput);
    }

    /**
     * Turn on rationale display for the currently selected choices. Note that
     * this leaves rationales on for choices that are already showing
     * rationales.
     * @deprecated Internal only. Use `showSolutions` prop instead.
     */
    showRationalesForCurrentlySelectedChoices: (
        arg1: PerseusRadioWidgetOptions,
    ) => void = (scoringData) => {
        const {choiceStates} = this.props;
        if (choiceStates) {
            const score = scoreRadio(
                this.getUserInput(),
                scoringData,
                this.context.strings,
            );
            const widgetCorrect =
                score.type === "points" && score.total === score.earned;

            const newStates: ReadonlyArray<ChoiceState> = choiceStates.map(
                (state: ChoiceState): ChoiceState => ({
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
                    readOnly:
                        state.selected ||
                        state.readOnly ||
                        widgetCorrect ||
                        this.props.showSolutions !== "none",
                    correctnessShown: state.selected || state.correctnessShown,
                    previouslyAnswered:
                        state.previouslyAnswered || state.selected,
                }),
            );

            this.props.onChange(
                {
                    choiceStates: newStates,
                },
                // @ts-expect-error - TS2345 - Argument of type 'null' is not assignable to parameter of type '(() => unknown) | undefined'.
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
            const newStates: ReadonlyArray<ChoiceState> =
                this.props.choiceStates.map(
                    (state: ChoiceState, i): ChoiceState => ({
                        ...state,
                        selected:
                            state.selected && !!this.props.choices[i].correct,
                        highlighted: false,
                    }),
                );

            this.props.onChange(
                {
                    choiceStates: newStates,
                },
                // @ts-expect-error - TS2345 - Argument of type 'null' is not assignable to parameter of type '(() => unknown) | undefined'.
                null, // cb
                false, // silent
            );
        }
    };

    render(): React.ReactNode {
        const {choices} = this.props;
        const {strings} = this.context;
        let choiceStates: ReadonlyArray<ChoiceState>;
        if (this.props.static) {
            choiceStates = choices.map((choice) => ({
                selected: !!choice.correct,
                crossedOut: false,
                readOnly: true,
                highlighted: false,
                rationaleShown: true,
                correctnessShown: true,
                previouslyAnswered: false,
            }));
        } else if (this.props.showSolutions === "all") {
            choiceStates = choices.map(({correct}) => ({
                selected: correct, // to draw the eye to the correct answer
                crossedOut: false,
                readOnly: true,
                highlighted: false, // has no effect in this mode
                rationaleShown: true,
                correctnessShown: true,
                previouslyAnswered: false,
            }));
        } else if (this.props.choiceStates) {
            choiceStates = this.props.choiceStates;
        } else if (this.props.values) {
            // Support legacy choiceStates implementation
            /* c8 ignore next - props.values is deprecated */
            choiceStates = this.props.values.map((val) => ({
                selected: val,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
            }));
        } else {
            choiceStates = choices.map(() => ({
                selected: false,
                crossedOut: false,
                readOnly: false,
                highlighted: false,
                rationaleShown: false,
                correctnessShown: false,
                previouslyAnswered: false,
            }));
        }

        const choicesProp: ReadonlyArray<ChoiceType> = choices.map(
            (choice, i) => {
                const content =
                    choice.isNoneOfTheAbove && !choice.content
                        ? strings.noneOfTheAbove
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

                const reviewChoice = this.props.reviewModeRubric?.choices[i];

                return {
                    content: this._renderRenderer(content),
                    checked: selected,
                    // Current versions of the radio widget always pass in the
                    // "correct" value through the choices. Old serialized state
                    // for radio widgets doesn't have this though, so we have to
                    // pull the correctness out of the review mode scoring data. This
                    // only works because all of the places we use
                    // `restoreSerializedState()` also turn on reviewMode, but is
                    // fine for now.
                    // TODO(emily): Come up with a more comprehensive way to solve
                    // this sort of "serialized state breaks when internal
                    // structure changes" problem.
                    correct:
                        choice.correct === undefined
                            ? !!reviewChoice && !!reviewChoice.correct
                            : choice.correct,
                    disabled: readOnly,
                    hasRationale: !!choice.clue,
                    rationale: this._renderRenderer(choice.clue),
                    showRationale: rationaleShown,
                    showCorrectness: correctnessShown,
                    isNoneOfTheAbove: !!choice.isNoneOfTheAbove,
                    revealNoneOfTheAbove: !!(
                        this.props.questionCompleted && selected
                    ),
                    crossedOut,
                    highlighted,
                    previouslyAnswered: previouslyAnswered,
                };
            },
        );

        return (
            <BaseRadio
                labelWrap={true}
                multipleSelect={this.props.multipleSelect}
                countChoices={this.props.countChoices}
                numCorrect={this.props.numCorrect}
                choices={choicesProp}
                onChange={this.updateChoices}
                reviewModeRubric={this.props.reviewModeRubric}
                reviewMode={this.props.reviewMode}
                deselectEnabled={this.props.deselectEnabled}
                apiOptions={this.props.apiOptions}
                isLastUsedWidget={this.props.isLastUsedWidget}
                registerFocusFunction={(i) => this.registerFocusFunction(i)}
            />
        );
    }
}

export default Radio;
