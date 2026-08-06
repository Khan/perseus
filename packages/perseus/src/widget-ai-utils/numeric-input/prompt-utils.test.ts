import {getPromptJSON} from "./prompt-utils";

import type {PerseusNumericInputUserInput} from "@khanacademy/perseus-core";

describe("NumericInput getPromptJSON", () => {
    it("returns JSON with the expected format and fields", () => {
        const userInput: PerseusNumericInputUserInput = {
            currentValue: "42",
        };

        const widgetData: any = {
            labelText: "Numeric input label",
            size: "Normal",
            coefficient: false,
            static: false,
            userInput,
        };

        const resultJSON = getPromptJSON(widgetData);

        expect(resultJSON).toEqual({
            type: "numeric-input",
            label: "Numeric input label",
            userInput: {
                value: "42",
            },
        });
    });

    it("defaults `label` to an empty string", () => {
        const userInput: PerseusNumericInputUserInput = {
            currentValue: "42",
        };

        // Arrange: no label text.
        const widgetData: any = {
            size: "Normal",
            coefficient: false,
            static: false,
            userInput,
        };

        // Act:
        const resultJSON = getPromptJSON(widgetData);

        // Assert: label is "".
        expect(resultJSON).toEqual({
            type: "numeric-input",
            label: "",
            userInput: {
                value: "42",
            },
        });
    });
});
