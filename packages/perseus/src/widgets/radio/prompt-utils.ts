import {WidgetType, type RadioPromptJSON} from "../../prompt-types";

import type {RenderProps} from "./radio-component";
import type {PerseusRadioUserInput} from "../../validation.types";

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
