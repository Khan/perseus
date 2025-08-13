import type matrix from "../../widgets/matrix/matrix";
import type React from "react";

export type MatrixPromptJSON = {
    type: "matrix";
    options: {
        height: number;
        width: number;
    };
    userInput: {
        answerRows: ReadonlyArray<ReadonlyArray<string>>;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof matrix.widget>,
): MatrixPromptJSON => {
    return {
        type: "matrix",
        options: {
            height: renderProps.matrixBoardSize[0],
            width: renderProps.matrixBoardSize[1],
        },
        userInput: {
            answerRows: renderProps.userInput.answers,
        },
    };
};
