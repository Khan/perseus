import type radio from "../../widgets/radio/radio";
import type {PerseusRadioUserInput} from "@khanacademy/perseus-core";
import { render } from "@testing-library/react";
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
    renderProps: RecursiveReadonly<React.ComponentProps<typeof radio.widget>>,
    userInput: RecursiveReadonly<PerseusRadioUserInput>,
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
