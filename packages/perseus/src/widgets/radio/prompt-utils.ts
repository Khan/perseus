import {WidgetType} from "../../prompt-types";

import type Radio from "./radio-component";
import type {PerseusRadioUserInput} from "../../validation.types";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

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
    renderProps: PropsFor<typeof Radio>,
    userInput: PerseusRadioUserInput,
): RadioPromptJSON => {
    const choices = renderProps.choices || [];

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
