import type {WidgetType} from "../../prompt-types";
import type {PerseusRadioUserInput} from "../../validation.types";
import type radio from "../../widgets/radio/radio";
import type {RadioChoiceWithMetadata} from "../../widgets/radio/radio-component";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

export type BasicOption = {
    value: RadioChoiceWithMetadata["content"];
};

export type RadioUserInput = {
    selectedOptions: PerseusRadioUserInput["choicesSelected"];
    isNoneOfTheAboveSelected: PerseusRadioUserInput["noneOfTheAboveSelected"];
};

export type RadioPromptJSON = {
    type: WidgetType;
    hasNoneOfTheAbove: PropsFor<typeof radio.widget>["hasNoneOfTheAbove"];
    options: BasicOption[];
    userInput: RadioUserInput;
};

export const getPromptJSON = (
    renderProps: PropsFor<typeof radio.widget>,
    userInput: PerseusRadioUserInput,
): RadioPromptJSON => {
    const choices = renderProps.choices || [];

    const options = choices.map((choice) => {
        return {
            value: choice.content,
        };
    });

    return {
        type: "radio",
        hasNoneOfTheAbove: !!renderProps.hasNoneOfTheAbove,
        options,
        userInput: {
            selectedOptions: userInput.choicesSelected.slice(),
            isNoneOfTheAboveSelected: !!userInput.noneOfTheAboveSelected,
        },
    };
};
