import {boolean, defaulted, enumeration, nullable, object, pipeParsers} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

import type {CalculatorVariant, PerseusAnswerArea} from "../../data-schema";

const booleanOrFalse = defaulted(boolean, () => false);
const nullableCalculatorVariant = defaulted(
    nullable(enumeration("scientific", "graphing", "four_function")),
    () => null,
);

const baseParser = defaulted(
    object({
        calculator: booleanOrFalse,
        calculatorVariant: nullableCalculatorVariant,
        financialCalculatorMonthlyPayment: booleanOrFalse,
        financialCalculatorTotalAmount: booleanOrFalse,
        financialCalculatorTimeToPayOff: booleanOrFalse,
        periodicTable: booleanOrFalse,
        periodicTableWithKey: booleanOrFalse,
    }),
    () => ({
        calculator: false,
        calculatorVariant: null,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    }),
);

export const parsePerseusAnswerArea = pipeParsers(baseParser)
    .then(
        convert(
            (parsed): PerseusAnswerArea => {
                const calculatorVariant: CalculatorVariant | null =
                    parsed.calculator && parsed.calculatorVariant === null
                        ? "scientific"
                        : parsed.calculatorVariant;

                return {...parsed, calculatorVariant};
            },
        ),
    ).parser;
