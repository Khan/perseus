import type radio from "../../widgets/radio/radio";
import type {
    PerseusRadioUserInput,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";
import type React from "react";

type BasicOption = {
    value: string;
    id: string;
    rationale?: string;
};

export type RadioPromptJSON = {
    type: "radio";
    hasNoneOfTheAbove: boolean;
    options: BasicOption[];
    userInput: {
        selectedOptions: ReadonlyArray<string>;
    };
};

export const getPromptJSON = (
    widgetData: RecursiveReadonly<React.ComponentProps<typeof radio.widget>>,
    userInput: RecursiveReadonly<PerseusRadioUserInput>,
): RadioPromptJSON => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const choices = widgetData.choices || [];

    const options = choices.map((choice) => {
        const option: BasicOption = {
            value: choice.content,
            id: choice.id,
        };
        if (choice.rationale) {
            option.rationale = choice.rationale;
        }
        return option;
    });

    return {
        type: "radio",
        hasNoneOfTheAbove: !!widgetData.hasNoneOfTheAbove,
        options,
        userInput: {
            selectedOptions: userInput?.selectedChoiceIds ?? [],
        },
    };
};
