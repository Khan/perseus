import {
    arrayOfLength,
    randomBoolean,
    randomInteger,
    randomSentence,
} from "../__testdata__/randomizers";

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

export const randomDropdownGenerator = (): PerseusRenderer => {
    const numChoices = randomInteger(2, 16);
    const correctIndex = randomInteger(0, numChoices - 1);
    return {
        content: `${randomSentence(20)} [[☃ dropdown 1]] ${randomSentence(10)}`,
        images: {},
        widgets: {
            "dropdown 1": {
                type: "dropdown",
                alignment: "default",
                static: randomBoolean(0.05),
                graded: randomBoolean(),
                options: {
                    static: randomBoolean(0.05),
                    placeholder: randomSentence(10),
                    choices: arrayOfLength(numChoices).map((_, i) => {
                        return {
                            content: randomSentence(10),
                            correct: i === correctIndex,
                        };
                    }),
                },
                version: {
                    major: 0,
                    minor: 0,
                },
            },
        },
    };
};
