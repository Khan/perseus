import type radio from "../../widgets/radio/radio";
import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";
import type React from "react";

type BasicOption = {
    value: string;
};

export type RadioPromptJSON = {
    type: "radio";
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: {
        selectedOptions: ReadonlyArray<boolean>;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof radio.widget>,
    userInput: PerseusRadioUserInput,
): RadioPromptJSON => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
        },
    };
};
