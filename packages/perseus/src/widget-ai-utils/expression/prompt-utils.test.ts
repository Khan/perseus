import {getPromptJSON} from "./prompt-utils";

describe("Expression getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            visibleLabel: "Enter an expression",
        };

        const resultJSON = getPromptJSON(renderProps, "2 + 2");

        expect(resultJSON).toEqual({
            type: "expression",
            label: "Enter an expression",
            userInput: {
                value: "2 + 2",
            },
        });
    });
});
