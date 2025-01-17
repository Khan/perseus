import {scorePerseusItem} from "../renderer-util";
import {mockStrings} from "../strings";

import type {
    CategorizerWidget,
    ExpressionWidget,
    InteractiveGraphWidget,
    NumericInputWidget,
    PerseusItem,
    PerseusRenderer,
    RadioWidget,
} from "@khanacademy/perseus-core";
import type {PerseusScore, UserInputMap} from "@khanacademy/perseus-score";

export const genericPerseusItemData: PerseusItem = {
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
    itemDataVersion: {
        major: 0,
        minor: 1,
    },
    hints: [],
    answer: null,
} as const;

/**
 * Thin wrapper around scorePerseusItem for internal testing
 */
export function scorePerseusItemTesting(
    perseusRenderData: PerseusRenderer,
    userInputMap: UserInputMap,
): PerseusScore {
    return scorePerseusItem(perseusRenderData, userInputMap, mockStrings, "en");
}

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

/**
 * Creates an object with the bare amount
 * of data to be a properly typed RadioWidget
 *
 * @returns {RadioWidget} skeleton RadioWidget for testing
 */
export function generateTestRadioWidget(): RadioWidget {
    return {
        type: "radio",
        options: {
            choices: [],
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed InteractiveGraphWidget
 *
 * @returns {InteractiveGraphWidget} skeleton InteractiveGraphWidget for testing
 */
export function generateTestInteractiveGraphWidget(): InteractiveGraphWidget {
    return {
        type: "interactive-graph",
        options: {
            step: [1, 1],
            gridStep: [1, 1],
            snapStep: [1, 1],
            markings: "graph",
            labels: ["x", "y"],
            showProtractor: false,
            range: [
                [-10, 10],
                [-10, 10],
            ],
            graph: {
                type: "angle",
            },
            correct: {
                type: "angle",
            },
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed InteractiveGraphWidget
 *
 * @returns {InteractiveGraphWidget} skeleton InteractiveGraphWidget for testing
 */
export function generateTestCategorizerWidget(): CategorizerWidget {
    return {
        type: "categorizer",
        options: {
            items: [],
            categories: [],
            randomizeItems: false,
            static: false,
            values: [],
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed ExpressionWidget
 *
 * @returns {ExpressionWidget} skeleton ExpressionWidget for testing
 */
export function generateTestExpressionWidget(): ExpressionWidget {
    return {
        type: "expression",
        options: {
            answerForms: [],
            buttonSets: ["basic"],
            functions: [],
            times: false,
        },
    };
}

/**
 * Creates an object with the bare amount
 * of data to be a properly typed NumericInputWidget
 *
 * @returns {NumericInputWidget} skeleton NumericInputWidget for testing
 */
export function generateTestNumericInputWidget(): NumericInputWidget {
    return {
        type: "numeric-input",
        options: {
            answers: [],
            labelText: "",
            size: "normal",
            coefficient: false,
            static: false,
        },
    };
}
