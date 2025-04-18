import type {PerseusItem} from "../data-schema";

const genericPerseusItemData: PerseusItem = {
    question: {
        content: "",
        images: {},
        widgets: {},
    },
    answerArea: {
        calculator: false,
        chi2Table: false,
        periodicTable: false,
        tTable: false,
        zTable: false,
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
    return {...genericPerseusItemData, ...customFields};
}
