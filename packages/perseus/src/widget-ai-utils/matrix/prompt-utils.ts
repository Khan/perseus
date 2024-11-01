import type {WidgetType} from "../../prompt-types";
import type {PerseusMatrixUserInput} from "../../validation.types";
import type matrix from "../../widgets/matrix/matrix";
import type {PropsFor} from "@khanacademy/wonder-blocks-core";

type WidgetProps = PropsFor<typeof matrix.widget>;

export type MatrixPromptJSON = {
    type: WidgetType;
    options: {
        height: number;
        width: number;
    };
    userInput: {
        answerRows: PerseusMatrixUserInput["answers"];
    };
};

export const getPromptJSON = (
    renderProps: WidgetProps,
    userInput: PerseusMatrixUserInput,
): MatrixPromptJSON => {
    return {
        type: "matrix",
        options: {
            height: renderProps.matrixBoardSize?.[0] || 0,
            width: renderProps.matrixBoardSize?.[1] || 0,
        },
        userInput: {
            answerRows: userInput.answers,
        },
    };
};
