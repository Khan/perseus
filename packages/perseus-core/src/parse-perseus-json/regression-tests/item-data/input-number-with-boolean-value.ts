// WARNING: Do not change or delete this file! If you do, Perseus might become
// unable to parse the current data format, which will break clients.
// If you need to add more regression tests, add a new file to this directory.
export default {
    answerArea: {
        calculator: false,
        options: {
            content: "",
            images: {},
            widgets: {},
        },
        type: "multiple",
    },
    hints: [
        {
            content:
                "Subtract $ \\red{3|x - 5|} $ from both sides: \n\n $\\qquad\\begin{eqnarray} 3|x - 5|& - 3 &=& 4|x - 5| + 7 \\\\ \\\\\n \\red{- 3|x - 5|}& && \\red{- 3|x - 5|} \\\\ \\\\\n& -3 &=& 1|x - 5| + 7 \\end{eqnarray} $",
            images: {},
            widgets: {},
        },
        {
            content:
                "Subtract $7$ from both sides: \n\n $\\qquad\\begin{eqnarray} -3 &=& 1|x - 5| &+ 7 \\\\ \\\\\n \\red{- 7} && &\\red{- 7} \\\\ \\\\\n -10 &=& 1|x - 5| \\end{eqnarray} $",
            images: {},
            widgets: {},
        },
        {
            content: "Simplify:\n\n $\\qquad -10 = |x - 5| $",
            images: {},
            widgets: {},
        },
        {
            content:
                "The absolute value cannot be negative. Therefore, there is no solution.",
            images: {},
            widgets: {},
        },
    ],
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    question: {
        content:
            "** Which of the following is a solution to the equation below?**\n  \n $ \\qquad 3|x - 5| - 3 = 4|x - 5| + 7 $ \n\n[[☃ radio 1]]",
        images: {},
        widgets: {
            "input-number 1": {
                graded: true,
                options: {
                    answerType: "number",
                    inexact: false,
                    maxError: 0.1,
                    simplify: "required",
                    size: "small",
                    value: 0,
                },
                type: "input-number",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "input-number 2": {
                graded: true,
                options: {
                    answerType: "number",
                    inexact: false,
                    maxError: 0.1,
                    simplify: "required",
                    size: "small",
                    value: true,
                },
                type: "input-number",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
            "radio 1": {
                graded: true,
                options: {
                    choices: [
                        {
                            clue: "Absolute values cannot be negative.",
                            content: "$-5$",
                            correct: false,
                        },
                        {
                            clue: "Check your signs.",
                            content: " $5$",
                            correct: false,
                        },
                        {
                            clue: "You might have made a sign error.",
                            content: " $15$",
                            correct: false,
                        },
                        {
                            content: "There are no solutions.",
                            correct: true,
                        },
                    ],
                    deselectEnabled: false,
                    displayCount: null,
                    multipleSelect: false,
                    noneOfTheAbove: false,
                    onePerLine: true,
                    randomize: false,
                },
                type: "radio",
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    },
};
