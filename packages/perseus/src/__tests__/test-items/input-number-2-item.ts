import type {PerseusRenderer} from "@khanacademy/perseus-core";

// FIXME: this export doesn't seem to be used. Delete it?
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
                    size: "normal",
                    coefficient: false,
                    answers: [
                        {
                            status: "correct",
                            value: 5,
                            maxError: 0,
                            simplify: "required",
                            answerForms: [],
                            message: "",
                            strict: true,
                        },
                    ],
                },
            },
            "input-number 2": {
                type: "input-number",
                graded: true,
                options: {
                    size: "normal",
                    coefficient: false,
                    answers: [
                        {
                            status: "correct",
                            value: 6,
                            maxError: 0,
                            simplify: "required",
                            answerForms: [],
                            message: "",
                            strict: true,
                        },
                    ],
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
