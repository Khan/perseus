import {
    boolean,
    defaulted,
    enumeration,
    nullable,
    object,
    pipeParsers,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

type CalculatorVariant = "scientific" | "graphing" | "four_function";

type ParsedAnswerArea = {
    calculator: boolean;
    calculatorVariant?: CalculatorVariant;
    financialCalculatorMonthlyPayment: boolean;
    financialCalculatorTotalAmount: boolean;
    financialCalculatorTimeToPayOff: boolean;
    periodicTable: boolean;
    periodicTableWithKey: boolean;
};

const booleanOrFalse = defaulted(boolean, () => false);
// Normalize legacy null values to undefined so content editors aren't prompted with a save warning.
const calculatorVariantOrUndefined = pipeParsers(
    defaulted(
        nullable(enumeration("scientific", "graphing", "four_function")),
        () => null,
    ),
).then(convert((v) => v ?? undefined)).parser;

const baseParser = defaulted(
    object({
        calculator: booleanOrFalse,
        calculatorVariant: calculatorVariantOrUndefined,
        financialCalculatorMonthlyPayment: booleanOrFalse,
        financialCalculatorTotalAmount: booleanOrFalse,
        financialCalculatorTimeToPayOff: booleanOrFalse,
        periodicTable: booleanOrFalse,
        periodicTableWithKey: booleanOrFalse,
    }),
    () => ({
        calculator: false,
        calculatorVariant: undefined,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    }),
);

export const parsePerseusAnswerArea = pipeParsers(baseParser).then(
    convert((parsed): ParsedAnswerArea => {
        const {calculatorVariant: parsedCalcVariant, ...rest} = parsed;
        const calculatorVariant =
            parsed.calculator && parsedCalcVariant === undefined
                ? "scientific"
                : parsedCalcVariant;

        return calculatorVariant !== undefined
            ? {...rest, calculatorVariant}
            : rest;
    }),
).parser;
