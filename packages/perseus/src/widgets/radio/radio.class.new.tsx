import {linterContextDefault} from "@khanacademy/perseus-linter";
import * as React from "react";

import {getPromptJSON as _getPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";

import RadioComponent from "./radio.new";

import type {WidgetProps, ChoiceState, Widget} from "../../types";
import type {RadioPromptJSON} from "../../widget-ai-utils/radio/radio-ai-utils";
import type {
    PerseusRadioChoice,
    PerseusRadioRubric,
    PerseusRadioUserInput,
} from "@khanacademy/perseus-core";

// RenderProps is the return type for radio.jsx#transform
export type RenderProps = {
    numCorrect: number;
    hasNoneOfTheAbove?: boolean;
    multipleSelect?: boolean;
    countChoices?: boolean;
    deselectEnabled?: boolean;
    choices: ReadonlyArray<RadioChoiceWithMetadata>;
    // doesn't seem used? choiceStates includes selected...
    selectedChoices: ReadonlyArray<PerseusRadioChoice["correct"]>;
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

    render(): React.ReactNode {
        return <RadioComponent {...this.props} />;
    }
}

export default Radio;
