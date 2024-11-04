import type {PerseusMatrixUserInput} from "../../validation.types";
import type matrix from "../../widgets/matrix/matrix";
import type React from "react";

export type MatrixPromptJSON = {
    type: "matrix";
    options: {
        height: number;
        width: number;
    };
    userInput: {
        answerRows: ReadonlyArray<ReadonlyArray<number>>;
    };
};

export const getPromptJSON = (
    renderProps: React.ComponentProps<typeof matrix.widget>,
    userInput: PerseusMatrixUserInput,
): MatrixPromptJSON => {
    return {
        type: "matrix",
        options: {
            height: renderProps.matrixBoardSize[0],
            width: renderProps.matrixBoardSize[1],
        },
        userInput: {
            answerRows: userInput.answers,
        },
    };
};
