import type {PerseusSorterUserInput} from "@khanacademy/perseus-score";

export type SorterPromptJSON = {
    type: "sorter";
    userInput: {
        values: ReadonlyArray<string>;
        changed: boolean;
    };
};

export const getPromptJSON = (
    userInput: PerseusSorterUserInput,
): SorterPromptJSON => {
    return {
        type: "sorter",
        userInput: {
            values: userInput.options,
            changed: userInput.changed,
        },
    };
};
