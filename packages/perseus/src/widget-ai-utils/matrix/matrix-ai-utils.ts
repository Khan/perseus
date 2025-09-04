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
    widgetData: React.ComponentProps<typeof matrix.widget>,
): MatrixPromptJSON => {
    return {
        type: "matrix",
        options: {
            height: widgetData.matrixBoardSize[0],
            width: widgetData.matrixBoardSize[1],
        },
        userInput: {
            answerRows: widgetData.userInput.answers,
        },
    };
};
