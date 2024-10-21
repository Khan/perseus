// TODO(benchristel): export all parsers from general-purpose-parsers/index.ts
// so we only need to import from one place.
import {itemDataVersion} from "../../../perseus-version";
import {
    any,
    array,
    booleanOrFalse,
    defaulted,
    number,
    object,
} from "../general-purpose-parsers";

import {parseHint} from "./hint";
import {parsePerseusRenderer} from "./perseus-renderer";

import type {PerseusItem} from "../../../perseus-types";
import type {Parser} from "../parser-types";

export const parsePerseusItem: Parser<PerseusItem> = object({
    question: parsePerseusRenderer,
    hints: array(parseHint),
    answerArea: object({
        calculator: booleanOrFalse,
        chi2Table: booleanOrFalse,
        financialCalculatorMonthlyPayment: booleanOrFalse,
        financialCalculatorTotalAmount: booleanOrFalse,
        financialCalculatorTimeToPayOff: booleanOrFalse,
        periodicTable: booleanOrFalse,
        periodicTableWithKey: booleanOrFalse,
        tTable: booleanOrFalse,
        zTable: booleanOrFalse,
    }),
    // NOTE(benchristel): As far as I can tell, itemDataVersion is not
    // actually read anywhere!
    itemDataVersion: defaulted(
        object({
            major: number,
            minor: number,
        }),
        () => itemDataVersion,
    ),
    // Deprecated field
    answer: any,
});
