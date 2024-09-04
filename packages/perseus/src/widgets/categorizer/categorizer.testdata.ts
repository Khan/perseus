import {
    arrayOfLength,
    randomBoolean,
    randomInteger,
    randomSentence,
} from "../__testdata__/randomizers";

import type {PerseusRenderer} from "../../perseus-types";

export const question1: PerseusRenderer = {
    content:
        "**Classify each graph according to the kind of relationship it suggests.**\n\n$\\qquad\\qquad\\quad\\text{Graph 1}\\qquad\\qquad\\quad\\qquad\\qquad\\quad\\text{Graph 2}$\n\n\n\n[[\u2603 categorizer 1]]\n\n**Graph 1.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png)\n\n**Graph 2.**\n\n![](https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png)  \n",
    images: {
        "https://ka-perseus-graphie.s3.amazonaws.com/40df186f39fb6d65de6bee0d8b681502d10cb37a.png":
            {
                width: 244,
                height: 223,
            },
        "https://ka-perseus-graphie.s3.amazonaws.com/1ead1b334f82ea0eb1bcbd5a56943d8c738ba3de.png":
            {
                width: 219,
                height: 215,
            },
        "https://ka-perseus-graphie.s3.amazonaws.com/b420aeaf8bad76b1cdb70a950947df2e4cfbcf0a.png":
            {
                width: 238,
                height: 223,
            },
        "https://ka-perseus-graphie.s3.amazonaws.com/049c091ed0978112aba3a36b0591d992baf7b1ac.png":
            {
                width: 220,
                height: 223,
            },
    },
    widgets: {
        "categorizer 1": {
            version: {major: 0, minor: 0},
            type: "categorizer",
            graded: true,
            alignment: "default",
            options: {
                items: ["Graph $1$", "Graph $2$"],
                values: [1, 3],
                randomizeItems: false,
                categories: [
                    "No relationship",
                    "Positive linear relationship",
                    "Negative linear relationship",
                    "Nonlinear relationship",
                ],
                highlightLint: false,
                static: false,
            },
        },
    },
};

export const randomCategorizerGenerator = (): PerseusRenderer => {
    const questionText = randomSentence(35);
    const numItems = randomInteger(2, 7);
    const numCategories = randomInteger(2, 6);

    return {
        content: `${questionText}\n\n\n[[\u2603 categorizer 1]]`,
        images: {},
        widgets: {
            "categorizer 1": {
                version: {major: 0, minor: 0},
                type: "categorizer",
                graded: randomBoolean(),
                alignment: "default",
                options: {
                    items: arrayOfLength(numItems).map(() =>
                        randomSentence(12),
                    ),
                    values: arrayOfLength(numItems).map(() =>
                        randomInteger(0, numCategories - 1),
                    ),
                    randomizeItems: randomBoolean(),
                    categories: arrayOfLength(numCategories).map(() =>
                        randomSentence(7),
                    ),
                    highlightLint: randomBoolean(),
                    static: randomBoolean(0.05),
                },
            },
        },
    };
};
