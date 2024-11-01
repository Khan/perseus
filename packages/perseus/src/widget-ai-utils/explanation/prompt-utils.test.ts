import {getPromptJSON} from "./prompt-utils";

describe("Explanation getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            showPrompt: "showPrompt",
            explanation: "explanation",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "explanation",
            showPrompt: renderProps.showPrompt,
            explanation: renderProps.explanation,
        });
    });
});
