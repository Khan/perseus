// @flow
import type {PerseusRenderer} from "../../perseus-types.js";

export default {
    question: {
        content: "[[☃ numeric-input 1]] [[☃ numeric-input 2]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                version: {
                    major: 0,
                    minor: 0,
                },
                type: "numeric-input",
                graded: true,
                alignment: "default",
                options: {
                    answers: [
                        {
                            message: "That's correct!",
                            value: 5,
                            status: "correct",
                            answerForms: [
                                "integer",
                                "proper",
                                "improper",
                                "mixed",
                            ],
                            strict: true,
                            maxError: 0.1,
                            simplify: "optional",
                        },
                    ],
                    answerForms: [
                        {name: "integer", simplify: "required"},
                        {name: "proper", simplify: "required"},
                        {name: "improper", simplify: "required"},
                        {name: "mixed", simplify: "required"},
                    ],
                    size: "normal",
                    coefficient: false,
                    static: false,
                    labelText: "Enter the decimal value of 5",
                },
            },
            "numeric-input 2": {
                version: {
                    major: 0,
                    minor: 0,
                },
                type: "numeric-input",
                graded: true,
                alignment: "default",
                options: {
                    answers: [
                        {
                            message: "That's correct!",
                            value: 6,
                            status: "correct",
                            answerForms: [
                                "integer",
                                "proper",
                                "improper",
                                "mixed",
                            ],
                            strict: true,
                            maxError: 0.1,
                            simplify: "optional",
                        },
                    ],
                    answerForms: [
                        {name: "integer", simplify: "required"},
                        {name: "proper", simplify: "required"},
                        {name: "improper", simplify: "required"},
                        {name: "mixed", simplify: "required"},
                    ],
                    size: "normal",
                    coefficient: false,
                    static: false,
                    labelText: "Enter the decimal value of 5",
                },
            },
        },
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
    },
    hints: [] as ReadonlyArray<any>,
};
