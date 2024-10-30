import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

import type {PerseusNumericInputUserInput} from "../../validation.types";

describe("NumericInput getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            labelText: "Numeric input label",
            size: "Normal",
            coefficient: false,
            static: false,
        };

        const userInput: PerseusNumericInputUserInput = {
            currentValue: "42",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: WidgetType.NUMERIC_INPUT,
            label: "Numeric input label",
            userInput: {
                value: "42",
            },
        });
    });
});
