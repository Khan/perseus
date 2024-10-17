import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

import type {PerseusNumericInputWidgetOptions} from "../../perseus-types";
import type {PerseusNumericInputUserInput} from "../../validation.types";

describe("NumericInput getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: PerseusNumericInputWidgetOptions = {
            answers: [
                {
                    status: "correct",
                    maxError: null,
                    strict: false,
                    value: 1252,
                    simplify: "required",
                    message: "",
                },
            ],
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
            answers: [
                {
                    answerFormats: undefined,
                    strictCheckAgainstAnswerFormats: false,
                    maxError: null,
                    message: "",
                    simplify: "required",
                    status: "correct",
                    value: 1252,
                },
            ],
            userInput: {
                value: "42",
            },
        });
    });
});
