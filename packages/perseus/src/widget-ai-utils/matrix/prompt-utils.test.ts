import {getPromptJSON} from "./prompt-utils";

describe("Matrix getPromptJSON", () => {
    it("it returns JSON with the expected format and fields", () => {
        const renderProps: any = {
            matrixBoardSize: [4, 3],
        };

        const userInput: any = {
            answers: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
            ],
        };

        const resultJSON = getPromptJSON(renderProps, userInput);

        expect(resultJSON).toEqual({
            type: "matrix",
            options: {
                width: 3,
                height: 4,
            },
            userInput: {
                answerRows: [
                    [1, 2, 3, 4],
                    [5, 6, 7, 8],
                    [9, 10, 11, 12],
                ],
            },
        });
    });
});
