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
        const calculatorVariant: CalculatorVariant | null =
            parsed.calculator && parsed.calculatorVariant === null
                ? "scientific"
                : parsed.calculatorVariant;

        return {...parsed, calculatorVariant};
    }),
).parser;

export function makePerseusAnswerAreaParser(desmosCalculator: boolean) {
    return desmosCalculator ? desmosParser : baseParser;
}
