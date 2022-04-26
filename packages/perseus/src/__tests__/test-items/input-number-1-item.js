// @flow
import type {PerseusRenderer} from "../../perseus-types.js";

export default {
    question: ({
        content: "[[☃ input-number 1]]",
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
        },
    }: PerseusRenderer),
    answerArea: {
        calculator: false,
    },
    hints: ([]: $ReadOnlyArray<any>),
};
