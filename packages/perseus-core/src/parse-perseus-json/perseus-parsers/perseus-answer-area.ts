import {
    boolean,
    defaulted,
    enumeration,
    nullable,
    object,
    pipeParsers,
} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";

// TODO(LEMS-4224): don't import from outside of the parser
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusAnswerArea} from "../../data-schema";
import type {Parser} from "../parser-types";

type CalculatorVariant = "scientific" | "graphing" | "four_function";

const booleanOrFalse = defaulted(boolean, () => false);
const nullableCalculatorVariant = defaulted(
    nullable(enumeration("scientific", "graphing", "four_function")),
    () => null,
);

const baseFields = {
    calculator: booleanOrFalse,
    financialCalculatorMonthlyPayment: booleanOrFalse,
    financialCalculatorTotalAmount: booleanOrFalse,
    financialCalculatorTimeToPayOff: booleanOrFalse,
    periodicTable: booleanOrFalse,
    periodicTableWithKey: booleanOrFalse,
};

const baseDefault = {
    calculator: false,
    financialCalculatorMonthlyPayment: false,
    financialCalculatorTotalAmount: false,
    financialCalculatorTimeToPayOff: false,
    periodicTable: false,
    periodicTableWithKey: false,
};

const baseParser = defaulted(object(baseFields), () => baseDefault);

const desmosParser = pipeParsers(
    defaulted(
        object({...baseFields, calculatorVariant: nullableCalculatorVariant}),
        () => ({...baseDefault, calculatorVariant: null}),
    ),
).then(
    convert((parsed) => {
        if (!parsed.calculator) {
            const {calculatorVariant: _omit, ...rest} = parsed;
            return rest;
        }
        const calculatorVariant: CalculatorVariant =
            parsed.calculatorVariant ?? "scientific";
        return {...parsed, calculatorVariant};
    }),
).parser;

export function makePerseusAnswerAreaParser(
    desmosCalculator: boolean,
): Parser<PerseusAnswerArea> {
    return desmosCalculator ? desmosParser : baseParser;
}
