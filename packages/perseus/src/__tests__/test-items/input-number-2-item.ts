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
                    answers: [
                        {
                            value: 5,
                            simplify: "required",
                            status: "correct",
                            strict: true,
                            answerForms: [
                                "integer",
                                "decimal",
                                "proper",
                                "improper",
                                "mixed",
                            ],
                            message: "",
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                },
            },
            "input-number 2": {
                type: "input-number",
                graded: true,
                options: {
                    answers: [
                        {
                            value: 6,
                            simplify: "required",
                            status: "correct",
                            strict: true,
                            answerForms: [
                                "integer",
                                "decimal",
                                "proper",
                                "improper",
                                "mixed",
                            ],
                            message: "",
                            maxError: 0,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
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
