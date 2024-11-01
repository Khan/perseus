import type {WidgetType} from "../../prompt-types";
import type {PerseusSorterUserInput} from "../../validation.types";

export type SorterPromptJSON = {
    type: WidgetType;
    userInput: {
        values: PerseusSorterUserInput["options"];
        changed: PerseusSorterUserInput["changed"];
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
