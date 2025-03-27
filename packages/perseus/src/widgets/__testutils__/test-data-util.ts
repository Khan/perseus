import type {PerseusItem, PerseusRenderer} from "@khanacademy/perseus-core";

/**
 * Creates a Perseus item with the provided question/PerseusRenderer data.
 * Useful for converting test data used with RendererWithDebugUI to test data
 * for ServerItemRendererWithDebugUI.
 *
 * @param {PerseusRenderer} question - The question to be included in the Perseus item.
 * @returns {PerseusItem} The created Perseus item.
 */
export const createPerseusItem = (question: PerseusRenderer): PerseusItem => {
    return {
        question: question,
        answer: null,
        itemDataVersion: {
            major: 0,
            minor: 1,
        },
        hints: [],
        answerArea: {
            calculator: false,
            chi2Table: false,
            financialCalculatorMonthlyPayment: false,
            financialCalculatorTotalAmount: false,
            financialCalculatorTimeToPayOff: false,
            periodicTable: false,
            periodicTableWithKey: false,
            tTable: false,
            zTable: false,
        },
    };
};
