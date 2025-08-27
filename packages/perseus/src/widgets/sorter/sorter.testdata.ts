import type {PerseusRenderer} from "@khanacademy/perseus-core";

export const question1: PerseusRenderer = {
    content:
        "**Arrange the following measurements in order from smallest to largest.**\n\n[[\u2603 sorter 1]]",
    images: {},
    widgets: {
        "sorter 1": {
            version: {major: 0, minor: 0},
            type: "sorter",
            graded: true,
            options: {
                padding: true,
                layout: "horizontal",
                correct: [
                    "$20000$ micrograms",
                    "$15$ grams",
                    "$0.05$ kilograms",
                    "$100$ grams",
                ],
            },
        },
    },
};

export const question2: PerseusRenderer = {
    content:
        "**Arrange the following measurements in order from smallest to largest.**\n\n[[\u2603 sorter 1]]",
    images: {},
    widgets: {
        "sorter 1": {
            version: {major: 0, minor: 0},
            type: "sorter",
            graded: true,
            options: {
                padding: true,
                layout: "horizontal",
                correct: [
                    "![alttext](https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png)",
                    "![alttext](https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png)",
                    "![alttext](https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png)",
                    "![alttext](https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png)![alttext](https://cdn.kastatic.org/ka-content-images/9cb2cf618c16501d01abf97036deb355d9393949.png)",
                ],
            },
        },
    },
};
