import {getPromptJSON} from "./prompt-utils";

import type {PerseusMockWidgetUserInput} from "@khanacademy/perseus-score";

describe("InputNumber getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            value: "42",
        };

        const userInput: PerseusMockWidgetUserInput = {
            currentValue: "123",
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "mock-widget",
            options: {
                value: "42",
            },
            userInput: {
                value: "123",
            },
        });
    });
});
