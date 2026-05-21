import {describe, it, expect} from "@jest/globals";

import {convertInputNumberOptionsToNumericInput} from "./to-numeric-input";

import type {PerseusInputNumberWidgetOptionsV0} from "../../data-schema";

const baseOptions: PerseusInputNumberWidgetOptionsV0 = {
    simplify: "required",
    size: "normal",
    value: "0",
};

describe("convertInputNumberOptionsToNumericInput", () => {
    it("converts maxError to a number when present", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            inexact: true,
            maxError: "0.042",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(0.042);
    });

    it("converts maxError values in exponent notation", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            maxError: "42e-3",
            inexact: true,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(0.042);
    });

    it("leaves maxError undefined when undefined", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            maxError: undefined,
            inexact: true,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(undefined);
    });

    it("sets maxError to 0 when inexact is false", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            maxError: 0.99,
            inexact: false,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers[0].maxError).toBe(0);
    });

    it("sets maxError to 0 when inexact is undefined", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            maxError: 0.99,
            inexact: undefined,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers[0].maxError).toBe(0);
    });

    it(`converts the "number" answer type to [integer, decimal, proper, improper, mixed]`, () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: "number",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it(`converts the "rational" answer type to [integer, proper, improper, mixed]`, () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: "rational",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("defaults answerForms to [integer, proper, improper, mixed, decimal]", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("converts the `value` to a number", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            value: "1.5",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].value).toEqual(1.5);
    });

    it("excludes `decimal` and `integer` from `answerForms` when answerType is number, inexact is false, and `value` has more than 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: "number",
            inexact: false,
            value: "1.12345678901",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("excludes `decimal` and `integer` from `answerForms` when answerType is undefined, inexact is false, and `value` has more than 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
            inexact: false,
            value: "1.12345678901",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("excludes `decimal` and `integer` from `answerForms` when inexact is undefined and `value` has more than 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
            inexact: undefined,
            value: "1.12345678901",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("does not exclude `decimal` and `integer` from `answerForms` when inexact is true", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
            inexact: true,
            value: "1.12345678901",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("does not exclude `decimal` and `integer` from `answerForms` when the answer has 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
            inexact: undefined,
            value: "0.1231231234",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("does not exclude `decimal` and `integer` from `answerForms` when the answer has fewer than 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptionsV0 = {
            ...baseOptions,
            answerType: undefined,
            inexact: undefined,
            value: "0.3",
        };

        const result = convertInputNumberOptionsToNumericInput(options);
        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].answerForms).toEqual([
            "integer",
            "decimal",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    // FIXME: add these tests:
    // it("converts a non-numeric string `value` to `undefined`")
    // it("converts an empty string `value` to `undefined`")
});
