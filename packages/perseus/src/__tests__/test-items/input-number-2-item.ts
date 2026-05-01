import type {PerseusRenderer} from "@khanacademy/perseus-core";

export default {
    // eslint-disable-next-line no-restricted-syntax
    question: {
        content: "[[☃ input-number 1]] [[☃ input-number 2]]",
        images: {},
        widgets: {
            "input-number 1": {
                type: "input-number",
                graded: true,
                options: {
                    value: 5,
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
            },
            "input-number 2": {
                type: "input-number",
                graded: true,
                options: {
                    value: 6,
                    simplify: "required",
                    size: "normal",
                    inexact: false,
                    maxError: 0.1,
                    answerType: "number",
                },
            },
        },
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
    },
    // eslint-disable-next-line no-restricted-syntax
    hints: [] as ReadonlyArray<any>,
};
