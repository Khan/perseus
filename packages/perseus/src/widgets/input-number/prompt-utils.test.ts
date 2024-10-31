import {getPromptJSON} from "./prompt-utils";

import type {PerseusInputNumberUserInput} from "../../validation.types";

describe("InputNumber getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            simplify: "optional",
            answerType: "integer",
        };

        const userInput: PerseusInputNumberUserInput = {
            currentValue: "123",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "input-number",
            options: {
                simplify: renderProps.simplify,
                answerType: renderProps.answerType,
            },
            userInput: {
                value: userInput.currentValue,
            },
        });
    });
});
