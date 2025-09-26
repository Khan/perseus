// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "If  $\\text{A} = \\left[\\begin{array}{rr}  -2 & 3\\\\ 1 & 2   \\end{array}\\right]$ and $\\text{B} = \\left[\\begin{array}{rr} -1 & 0 \\\\ 1 & 2   \\end{array}\\right]$, then find $(A + 2B)'$.\n\n[[☃ matrix 1]]",
        images: {},
        widgets: {
            "matrix 1": {
                type: "matrix",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    static: false,
                    matrixBoardSize: [3, 3],
                    answers: [
                        [-4, 5, null],
                        [1, 6, null],
                        [null, null, null],
                    ],
                    prefix: "",
                    suffix: "",
                    cursorPosition: [0, 0],
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
    },
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
};
