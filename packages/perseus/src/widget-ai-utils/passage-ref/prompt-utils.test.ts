import {getPromptJSON} from "./prompt-utils";

describe("PassageRef getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            passageNumber: 1,
            referenceNumber: 1,
            summaryText: "",
        };

        const resultJSON = getPromptJSON(renderProps);

        expect(resultJSON).toEqual({
            type: "passage-ref",
            options: {
                passageNumber: renderProps.passageNumber,
                referenceNumber: renderProps.referenceNumber,
                summaryText: renderProps.summaryText,
            },
        });
    });
});
