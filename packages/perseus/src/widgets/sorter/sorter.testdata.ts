import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

export const basicQuestion: PerseusRenderer = {
    content: "[[\u2603 sorter 1]]",
    images: {},
    widgets: {
        "sorter 1": {
            version: {major: 0, minor: 0},
            type: "sorter",
            graded: true,
            options: {
                padding: true,
                layout: "horizontal",
                variant: "scale",
                correct: ["First", "Second", "Third", "Fourth", "Fifth"],
            },
        },
    },
};

export const texQuestion: PerseusRenderer = {
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
                variant: "scale",
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

export const simpleTexQuestion: PerseusRenderer = generateTestPerseusRenderer({
    content: "[[\u2603 sorter 1]]",
    widgets: {
        "sorter 1": generateSorterWidget({
            options: generateSorterOptions({
                correct: ["$x$", "$x^2$", "$\\frac{1}{2}$", "$\\sqrt{2}$"],
                layout: "horizontal",
            }),
        }),
    },
});

/**
 * A minimal sorter for driving real mouse drags in a browser (see
 * sorter.cypress.ts). Both options make the drag deterministic:
 *
 * - Two cards: `shuffleSorter` guarantees the first card is displaced, and with
 *   two cards the only such permutation is the reverse. So it always starts as
 *   ["Banana", "Apple"], and one drag gives the correct answer.
 * - Vertical layout: at Cypress's iPhone-sized viewport, horizontal (floated)
 *   cards can wrap and break Sortable's single-row width math.
 */
export const twoCardVerticalQuestion: PerseusRenderer =
    generateTestPerseusRenderer({
        content: "[[☃ sorter 1]]",
        widgets: {
            "sorter 1": generateSorterWidget({
                options: generateSorterOptions({
                    correct: ["Apple", "Banana"],
                    layout: "vertical",
                }),
            }),
        },
    });

export const longTextWithTeX: PerseusItem = generateTestPerseusItem({
    question: generateTestPerseusRenderer({
        content: "[[☃ sorter 1]]",
        widgets: {
            "sorter 1": generateSorterWidget({
                options: generateSorterOptions({
                    correct: [
                        "Locate points $A$ and $B$ on the baseline, making " +
                            "sure they are exactly $3\\text{ cm}$ apart.",
                        "Place a protractor at vertex $A$ and draw a line " +
                            "extending upwards at an angle of $70^\\circ$.",
                        "Construct a parallel baseline exactly " +
                            "$4\\text{ cm}$ vertically above the original " +
                            "baseline.",
                        "Mark intersection points $D$ and $C$ where the " +
                            "slanted lines cross the upper parallel " +
                            "baseline to complete the figure.",
                    ],
                    layout: "vertical",
                    padding: true,
                }),
            }),
        },
    }),
});
