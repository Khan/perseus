import type {PerseusRenderer, InputNumberWidget} from "@khanacademy/perseus";

export const question1: PerseusRenderer = {
    content:
        "A sequence is defined recursively as follows:\n\n\n$\\qquad\\displaystyle{{a}_{n}}=-\\frac{1}{a_{n-1}-1} \n~~~~~~\\text{ with}\\qquad\\displaystyle{{a}_{0}}=\\frac{1}{2}\\,$\n\n\nFind the term $a_3$ in the sequence.\n\n[[\u2603 input-number 1]]",
    images: {},
    widgets: {
        "input-number 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "input-number",
            options: {
                maxError: 0.1,
                inexact: false,
                value: 0.5,
                simplify: "required",
                answerType: "number",
                size: "normal",
            },
            alignment: "default",
        } as InputNumberWidget,
    },
};
