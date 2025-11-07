import type {RadioProps} from "../../widgets/radio/radio-component";
import type {
    PerseusRadioUserInput,
    RecursiveReadonly,
} from "@khanacademy/perseus-core";

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
    widgetData: RecursiveReadonly<RadioProps>,
    userInput: RecursiveReadonly<PerseusRadioUserInput> | undefined,
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
