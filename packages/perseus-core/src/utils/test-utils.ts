import _ from "underscore";

import deepClone from "./deep-clone";

import type {PerseusItem, PerseusRenderer} from "../data-schema";

const blankPerseusRenderer: PerseusRenderer = {
    content: "",
    images: {},
    widgets: {},
} as const;

export function generateTestPerseusRenderer(
    customFields: Partial<PerseusRenderer> = {},
): PerseusRenderer {
    return deepClone({...blankPerseusRenderer, ...customFields});
}

const blankPerseusItemData: PerseusItem = {
    question: generateTestPerseusRenderer(),
    answerArea: {
        calculator: false,
        periodicTable: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTableWithKey: false,
    },
    hints: [],
} as const;

/**
 * Generate a Perseus item object for testing purposes.
 *
 * In order to better type Perseus objects used in testing, this function
 * uses a basic Perseus object and updates it with custom values as needed.
 *
 * @param {Partial<PerseusItem>} customFields
 * @returns {PerseusItem}
 */
export function generateTestPerseusItem(
    customFields: Partial<PerseusItem> = {},
): PerseusItem {
    return deepClone({...blankPerseusItemData, ...customFields});
}
