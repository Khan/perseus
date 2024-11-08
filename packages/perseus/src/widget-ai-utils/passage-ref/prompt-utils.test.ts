import {getPromptJSON} from "./prompt-utils";

describe("PassageRef getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "This is text summarizing the passage.",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "passage-ref",
            options: {
                passageNumber: 1,
                referenceNumber: 1,
                summaryText: "This is text summarizing the passage.",
            },
        });
    });
});
