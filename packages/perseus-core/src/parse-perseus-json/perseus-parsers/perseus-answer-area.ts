import {boolean, defaulted, object} from "../general-purpose-parsers";

const booleanOrFalse = defaulted(boolean, () => false);

export const parsePerseusAnswerArea = defaulted(
    object({
        calculator: booleanOrFalse,
        financialCalculatorMonthlyPayment: booleanOrFalse,
        financialCalculatorTotalAmount: booleanOrFalse,
        financialCalculatorTimeToPayOff: booleanOrFalse,
        periodicTable: booleanOrFalse,
        periodicTableWithKey: booleanOrFalse,
    }),
    () => ({
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    }),
);
