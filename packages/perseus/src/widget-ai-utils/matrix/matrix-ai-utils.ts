import type matrix from "../../widgets/matrix/matrix";
import type React from "react";

/**
 * JSON describing a matrix widget. Intended for consumption by AI tools.
 * A matrix widget displays a grid of numeric cells that the learner fills in.
 */
export type MatrixPromptJSON = {
    type: "matrix";

    /**
     * The configuration of the widget, set by the content creator.
     */
    options: {
        /**
         * The number of rows in the matrix grid.
         */
        height: number;

        /**
         * The number of columns in the matrix grid.
         */
        width: number;
    };

    /**
     * The current state of the widget user interface. Usually represents a
     * learner's attempt to answer a question.
     */
    userInput: {
        /**
         * The current values entered by the learner. Each element of the outer
         * array represents a row; each element of the inner arrays represents a
         * cell value within that row. Cells that have not been filled in are
         * represented as empty strings.
         */
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
