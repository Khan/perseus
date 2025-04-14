import type {PerseusSorterUserInput} from "@khanacademy/perseus-core";

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
