import type radio from "../../widgets/radio/radio";
import type {
    PerseusRadioUserInput,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";
import type React from "react";

type BasicOption = {
    value: string;
    rationale?: string;
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
        const option: BasicOption = {
            value: choice.content,
        };
        if (choice.clue) {
            option.rationale = choice.clue;
        }
        return option;
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
