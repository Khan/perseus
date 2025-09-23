// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    question: {
        content:
            "$\\begin{align} \nA &= \\{x: x \\text{ is a rectangle in the plane P} \\} \\\\\\\\\nB &= \\{x: x \\text{ is a square in the plane P} \\}\n\\end{align}$\n\n**Is $A \\subset B$ ?**\n\n[[☃ radio 1]]\n",
        images: {},
        widgets: {
            "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                    choices: [
                        {
                            content: "Yes",
                            correct: false,
                        },
                        {
                            content: "No",
                            correct: true,
                        },
                    ],
                    randomize: false,
                    multipleSelect: false,
                    countChoices: false,
                    displayCount: null,
                    hasNoneOfTheAbove: false,
                    deselectEnabled: false,
                },
                version: {
                    major: 1,
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
