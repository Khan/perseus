import {WidgetType} from "../../prompt-types";

import type {RenderProps} from "./radio-component";
import type {PerseusRadioUserInput} from "../../validation.types";

export type BasicOption = {
    value: string;
};

export type RadioUserInput = {
    selectedOptions: boolean[];
    isNoneOfTheAboveSelected: boolean;
};

export type RadioPromptJSON = {
    type: WidgetType;
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: RadioUserInput;
};

export const getPromptJSON = (
    renderProps: RenderProps,
    userInput: PerseusRadioUserInput,
): RadioPromptJSON => {
    const {choices} = renderProps;

    const options = choices.map((choice) => {
        return {
            value: choice.content,
        };
    });

    return {
        type: WidgetType.RADIO,
        hasNoneOfTheAbove: !!renderProps.hasNoneOfTheAbove,
        options,
        userInput: {
            selectedOptions: userInput.choicesSelected.slice(),
            isNoneOfTheAboveSelected: !!userInput.noneOfTheAboveSelected,
        },
    };
};
