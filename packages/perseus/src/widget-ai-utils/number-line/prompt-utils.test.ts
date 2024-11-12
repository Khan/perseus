import {getPromptJSON} from "./prompt-utils";

describe("NumberLine getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            range: [0, 10],
            numDivisions: 10,
            snapDivisions: 2,
        };

        const userInput: any = {
            numLinePosition: 5,
            numDivisions: 10,
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "number-line",
            options: {
                range: [0, 10],
                numDivisions: 10,
                snapDivisions: 2,
            },
            userInput: {
                numLinePosition: 5,
                numDivisions: 10,
            },
        });
    });
});
