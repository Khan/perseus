import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "The total number of boxes the forklift can carry is [[☃ dropdown 1]] $60$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "greater/less than or equal to",
                choices: [
                    {
                        content: "greater than or equal to",
                        correct: false,
                    },
                    {
                        content: "less than or equal to",
                        correct: true,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};

export const question2: PerseusRenderer = {
    content: "If x equals 4, then [[☃ dropdown 1]] equals $10$.",
    images: {},
    widgets: {
        "dropdown 1": {
            type: "dropdown",
            alignment: "default",
            static: false,
            graded: true,
            options: {
                static: false,
                placeholder: "",
                choices: [
                    {
                        content: "$5\\sqrt{x}$",
                        correct: true,
                    },
                    {
                        content: "$5x$",
                        correct: false,
                    },
                ],
            },
            version: {
                major: 0,
                minor: 0,
            },
        },
    },
};
