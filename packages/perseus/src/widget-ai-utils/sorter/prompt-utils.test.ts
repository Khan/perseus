import {getPromptJSON} from "./prompt-utils";

import type {PerseusSorterUserInput} from "../../validation.types";

describe("Sorter getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["Pickles", "Tomato", "Onion", "Lettuce"],
            changed: true,
        };

        const resultJSON = getPromptJSON(userInput);

        expect(resultJSON).toEqual({
            type: "sorter",
            userInput: {
                values: userInput.options,
                changed: userInput.changed,
            },
        });
    });
});
