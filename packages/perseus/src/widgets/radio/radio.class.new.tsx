import {linterContextDefault} from "@khanacademy/perseus-linter";
import {scoreRadio} from "@khanacademy/perseus-score";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import RadioComponent from "./radio.new";

import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    ShowSolutions,
    PerseusRadioRubric,
    PerseusRadioUserInput,
    PerseusRadioWidgetOptions,
} from "@khanacademy/perseus-core";

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

type Props = WidgetProps<
    RenderProps,
    PerseusRadioUserInput,
    PerseusRadioRubric
>;

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

export interface RadioChoiceWithMetadata extends PerseusRadioChoice {
    originalIndex: number;
    correct?: boolean;
}

/**
 * This component is holds the class methods for the radio widget, that were split
 * out of radio-component.new.tsx for the Radio Revitalization Project. (LEMS-2933)
 * This component will be the main entry point for the radio widget when the feature
 * flag is no longer needed.
 *
 * TODO(LEMS-2994): Clean up this file.
 */
class Radio extends React.Component<Props> implements Widget {
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
     * TODO: LEMS-3077 Remove deprecated class function
     * @deprecated Internal only. Use `showSolutions` prop instead.
     */
    showRationalesForCurrentlySelectedChoices: (
        arg1: PerseusRadioWidgetOptions,
    ) => void = (rubric) => {
        const {choiceStates} = this.props;
        if (choiceStates) {
            const score = scoreRadio(this.getUserInput(), rubric);
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
                () => {}, // cb
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
                () => {}, // cb
                false, // silent
            );
        }
    };

    render(): React.ReactNode {
        return <RadioComponent {...this.props} />;
    }
}

export default Radio;
