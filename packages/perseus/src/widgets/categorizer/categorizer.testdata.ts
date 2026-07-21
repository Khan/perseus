import {generateCategorizerOptions} from "@khanacademy/perseus-core";

import type {
    PerseusCategorizerWidgetOptions,
    PerseusRenderer,
} from "@khanacademy/perseus-core";

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
                static: false,
            },
        },
    },
};

export const categorizerOptions: PerseusCategorizerWidgetOptions =
    generateCategorizerOptions({
        items: ["Apple", "Broccoli", "Banana", "Carrot"],
        categories: ["Fruit", "Vegetable"],
        values: [0, 1, 0, 1],
        randomizeItems: false,
    });

export const categorizerWithImagesOptions: PerseusCategorizerWidgetOptions =
    generateCategorizerOptions({
        items: [
            "![Graph 1](web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e06f6d4071f30cee2cc3ccb7435b3a66a62fe3f)",
            "![Graph 2](web+graphie://cdn.kastatic.org/ka-perseus-graphie/7c0a5afb8670fad738df800ffe16c5e516b48777)",
        ],
        categories: [
            "No relationship",
            "Positive linear relationship",
            "Negative linear relationship",
            "Nonlinear relationship",
        ],
        values: [1, 3],
        randomizeItems: false,
    });

export const categorizerWithMathOptions: PerseusCategorizerWidgetOptions =
    generateCategorizerOptions({
        items: ["$2x + 4$", "$x^2 - 9$", "$3x$", "$x^2 + 5x + 6$"],
        categories: ["$\\text{Linear}$", "$\\text{Quadratic}$"],
        values: [0, 1, 0, 1],
        randomizeItems: false,
    });
