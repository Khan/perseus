import {object, pipeParsers} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

export const parsePerseusAnswerArea = pipeParsers(
    defaulted(object({}), () => ({})),
).then(convert(toAnswerArea)).parser;

// Some answerAreas have extra, bogus fields, like:
//
//   "answerArea": {
//     "type": "multiple",
//     "options": {},
//     "version": null,
//     "static": false,
//     "graded": false,
//     "alignment": "",
//   }
//
// This function filters the fields of an answerArea object, keeping only the
// known ones, and converts `undefined` and `null` values to `false`.
function toAnswerArea(raw: Record<string, unknown>) {
    return {
        calculator: !!raw.calculator,
        financialCalculatorMonthlyPayment:
            !!raw.financialCalculatorMonthlyPayment,
        financialCalculatorTotalAmount: !!raw.financialCalculatorTotalAmount,
        financialCalculatorTimeToPayOff: !!raw.financialCalculatorTimeToPayOff,
        periodicTable: !!raw.periodicTable,
        periodicTableWithKey: !!raw.periodicTableWithKey,
    };
}
