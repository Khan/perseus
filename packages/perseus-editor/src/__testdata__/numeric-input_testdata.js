// @flow
import type {PerseusRenderer, NumericInputWidget} from "@khanacademy/perseus";

export const question1: PerseusRenderer = {
    content: "$5008 \\div 4 =$ [[\u2603 numeric-input 1]] ",
    images: {},
    widgets: {
        "numeric-input 1": ({
            graded: true,
            version: {
                major: 1,
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
                        value: 1252,
                        simplify: "required",
                        message: "",
                    },
                ],
                labelText: "",
                size: "normal",
            },
            alignment: "default",
        }: NumericInputWidget),
    },
};
