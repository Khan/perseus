import {
    generateSorterOptions,
    generateSorterWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

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
                correct: ["Zeroth", "First", "Second", "Third", "Fourth"],
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
