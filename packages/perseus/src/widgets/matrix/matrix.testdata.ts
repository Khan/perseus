import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "**Perform the row operation, $R_3 \\leftrightarrow R_2$, on the following matrix.**\n\n$\\left[\\begin{array} {ccc}\n5 & -2 & 1 & 1 \\\\\n3 & 0 & 0 & -2 \\\\\n1 & 1 & 7 & -3 \\end{array} \\right] $\n\n[[\u2603 matrix 1]]\n",
    images: {},
    widgets: {
        "matrix 1": {
            graded: true,
            version: {major: 0, minor: 0},
            static: false,
            type: "matrix",
            options: {
                cursorPosition: [0, 0],
                suffix: "",
                answers: [
                    [5, -2, 1, 1],
                    [1, 1, 7, -3],
                    [3, 0, 0, -2],
                ],
                prefix: "",
                static: false,
                matrixBoardSize: [3, 4],
            },
            alignment: "default",
        },
    },
};
