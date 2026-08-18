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
 * sorter.cypress.ts). Both of its options are chosen to make a drag test
 * deterministic:
 *
 * - Two cards. The initial order comes from `shuffleSorter`, which guarantees
 *   the first card is displaced. With only two cards, the sole permutation
 *   that satisfies that is the reverse, so the widget always starts out as
 *   ["Banana", "Apple"] and a single drag produces the correct answer. No test
 *   needs to know anything about the seeded RNG.
 * - Vertical layout, rather than the default horizontal. Cypress runs at an
 *   iPhone-sized viewport, where horizontal cards (which float) can wrap and
 *   invalidate the single-row width math in Sortable's reorder logic. Vertical
 *   cards stack, so the drag axis is unambiguous.
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
