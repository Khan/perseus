import {parse} from "../parse";
import {assertFailure, assertSuccess} from "../result";

import {parsePerseusItem} from "./perseus-item";

describe("parsePerseusItem", () => {
    const baseItem = {
        question: {
            content: "",
            widgets: {},
            images: {},
        },
        hints: [],
        answerArea: {},
        itemDataVersion: {major: 0, minor: 0},
    };

    it("accepts valid ItemExtras as keys in the answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {calculator: true},
        };

        const result = parse(item, parsePerseusItem);

        assertSuccess(result);
        expect(result.value.answerArea).toEqual({calculator: true});
    });

    it("rejects invalid keys in answerArea", () => {
        const item = {
            ...baseItem,
            answerArea: {bork: true},
        };

        const result = parse(item, parsePerseusItem);

        assertFailure(result);
        expect(result.detail).toEqual(
            `At (root).answerArea.bork -- expected "calculator", "chi2Table", "financialCalculatorMonthlyPayment", "financialCalculatorTotalAmount", "financialCalculatorTimeToPayOff", "periodicTable", "periodicTableWithKey", "tTable", or "zTable", but got "bork"`,
        );
    });
});
