import type {PerseusRenderer} from "../../perseus-types";

export default {
    question: {
        content: "[[☃ numeric-input 1]]",
        images: {},
        widgets: {
            "numeric-input 1": {
                type: "numeric-input",
                graded: true,
                options: {
                    static: false,
                    answers: [
                        {
                            value: 5,
                            status: "correct",
                            message: "",
                            simplify: "required",
                            strict: true,
                            maxError: 0.1,
                        },
                    ],
                    size: "normal",
                    coefficient: false,
                    labelText: "",
                    rightAlign: false,
                },
            },
        },
    } as PerseusRenderer,
    answerArea: {
        calculator: false,
    },
    hints: [] as ReadonlyArray<any>,
};
