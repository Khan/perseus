import {getPromptJSON} from "./prompt-utils";

import type {PerseusMockWidgetUserInput} from "@khanacademy/perseus-score";

describe("InputNumber getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const userInput: PerseusMockWidgetUserInput = {
            currentValue: "123",
        };

        const widgetData: any = {
            value: "42",
            userInput,
        };

        const resultJSON = getPromptJSON(widgetData);

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
