import {WidgetType} from "../../prompt-types";

import {getPromptJSON} from "./prompt-utils";

import type {PerseusExpressionUserInput} from "../../validation.types";

describe("Expression getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            visibleLabel: "Enter an expression",
        };

        const userInput: PerseusExpressionUserInput = "2 + 2";

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: WidgetType.EXPRESSION,
            label: renderProps.visibleLabel,
            userInput: {
                value: userInput,
            },
        });
    });
});
