import {getPromptJSON} from "./prompt-utils";

import type {PerseusCategorizerUserInput} from "../../validation.types";

describe("Categorizer getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            items: ["Luke Skywalker", "Darth Vader", "Yoda", "Han Solo"],
            categories: ["Galactic Empire", "Rebel Alliance"],
            values: [1, 0, 1, 1],
        };

        const userInput: PerseusCategorizerUserInput = {
            values: [1, 0, 0, 1],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "categorizer",
            options: {
                items: ["Luke Skywalker", "Darth Vader", "Yoda", "Han Solo"],
                categories: ["Galactic Empire", "Rebel Alliance"],
            },
            userInput: {
                itemToCategoryMapping: [1, 0, 0, 1],
            },
        });
    });
});
