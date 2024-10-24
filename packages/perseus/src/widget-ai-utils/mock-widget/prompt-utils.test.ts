import type {PerseusMockWidgetUserInput} from "@khanacademy/perseus-score";
import {getPromptJSON} from "./prompt-utils";

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
