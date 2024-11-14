import {getPromptJSON} from "./sorter-ai-utils";

import type {PerseusSorterUserInput} from "../../validation.types";

describe("Sorter AI utils", () => {
    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusSorterUserInput = {
            options: ["Pickles", "Tomato", "Onion", "Lettuce"],
            changed: true,
        };

        const resultJSON = getPromptJSON(userInput);

        expect(resultJSON).toEqual({
            type: "sorter",
            userInput: {
                values: ["Pickles", "Tomato", "Onion", "Lettuce"],
                changed: true,
            },
        });
    });
});
