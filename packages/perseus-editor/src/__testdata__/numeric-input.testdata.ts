import {
    generateNumericInputAnswer,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = generateTestPerseusRenderer({
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\displaystyle{{a}_{n}}=-\\dfrac{1}{a_{n-1}-1}$ with $\\displaystyle{{a}_{0}}=\\dfrac{1}{2}$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 numeric-input 1]]",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 0.5,
                    }),
                ],
                labelText: "What's the answer?",
            }),
        }),
    },
});

export const integerProblem: PerseusRenderer = generateTestPerseusRenderer({
    content: "$5/5 + 10/10 =$ [[\u2603 numeric-input 1]] \n\n‎",
    widgets: {
        "numeric-input 1": generateNumericInputWidget({
            options: generateNumericInputOptions({
                answers: [
                    generateNumericInputAnswer({
                        value: 15,
                        answerForms: ["integer"],
                    }),
                ],
            }),
        }),
    },
});
