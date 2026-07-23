import {ctx} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

import {parsePerseusAnswerArea} from "./perseus-answer-area";

// Tests are fine to import, main files aren't
// eslint-disable-next-line import/no-restricted-paths
import type {PerseusAnswerArea} from "../../data-schema";

describe("parsePerseusAnswerArea", () => {
    const allFalse: PerseusAnswerArea = {
        calculator: false,
        financialCalculatorMonthlyPayment: false,
        financialCalculatorTotalAmount: false,
        financialCalculatorTimeToPayOff: false,
        periodicTable: false,
        periodicTableWithKey: false,
    };

    it("fills in missing fields with `false`", () => {
        const result = parsePerseusAnswerArea({}, ctx());
        expect(result).toEqual(success(allFalse));
    });

    it("keeps `true` values", () => {
        const allTrue: PerseusAnswerArea = {
            calculator: true,
            calculatorVariant: "scientific",
            financialCalculatorMonthlyPayment: true,
            financialCalculatorTotalAmount: true,
            financialCalculatorTimeToPayOff: true,
            periodicTable: true,
            periodicTableWithKey: true,
        };

        const result = parsePerseusAnswerArea(allTrue, ctx());

        expect(result).toEqual(success(allTrue));
    });

    it("handles undefined", () => {
        const result = parsePerseusAnswerArea(undefined, ctx());
        expect(result).toEqual(success(allFalse));
    });

    it("handles null", () => {
        const result = parsePerseusAnswerArea(null, ctx());
        expect(result).toEqual(success(allFalse));
    });
});
