import type {PerseusRenderer, NumericInputWidget} from "@khanacademy/perseus";

export const question1: PerseusRenderer = {
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 numeric-input 1]]",
    images: {},
    widgets: {
        "numeric-input 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "numeric-input",
            options: {
                coefficient: false,
                static: false,
                answers: [
                    {
                        status: "correct",
                        maxError: null,
                        strict: false,
                        value: 0.5,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "What's the answer?",
                size: "normal",
            },
        } as NumericInputWidget,
    },
};
