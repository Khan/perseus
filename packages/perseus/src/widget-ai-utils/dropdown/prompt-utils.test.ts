import {getPromptJSON} from "./prompt-utils";

import type {PerseusDropdownUserInput} from "../../validation.types";

describe("Dropdown getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            choices: ["Pickles", "Tomato", "Onion", "Lettuce"],
        };

        const userInput: PerseusDropdownUserInput = {
            value: 3,
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "dropdown",
            options: {
                items: ["Pickles", "Tomato", "Onion", "Lettuce"],
            },
            userInput: {
                // Offset to account for placeholder
                selectedIndex: 2,
            },
        });
    });
});