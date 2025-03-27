import {object, pipeParsers} from "../general-purpose-parsers";
import {convert} from "../general-purpose-parsers/convert";
import {defaulted} from "../general-purpose-parsers/defaulted";

import type {PerseusAnswerArea} from "../../data-schema";

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
function toAnswerArea(raw: Record<string, unknown>): PerseusAnswerArea {
    return {
        zTable: !!raw.zTable,
        calculator: !!raw.calculator,
        chi2Table: !!raw.chi2Table,
        financialCalculatorMonthlyPayment:
            !!raw.financialCalculatorMonthlyPayment,
        financialCalculatorTotalAmount: !!raw.financialCalculatorTotalAmount,
        financialCalculatorTimeToPayOff: !!raw.financialCalculatorTimeToPayOff,
        periodicTable: !!raw.periodicTable,
        periodicTableWithKey: !!raw.periodicTableWithKey,
        tTable: !!raw.tTable,
    };
}
