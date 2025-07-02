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

    /**
     * TODO: remove this when everything is pulling from Renderer state
     * @deprecated get user input from Renderer state
     */
    getUserInput(): PerseusRadioUserInput {
        return this.props.userInput;
    }

    getPromptJSON(): RadioPromptJSON {
        return _getPromptJSON(this.props, this.props.userInput);
    }

    render(): React.ReactNode {
        return <RadioComponent {...this.props} />;
    }
}

export default Radio;
