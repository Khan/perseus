import {describe, it, expect} from "@jest/globals";

import {convertInputNumberOptionsToNumericInput} from "./to-numeric-input";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

const baseOptions: PerseusInputNumberWidgetOptions = {
    simplify: "required",
    size: "normal",
    value: "0",
};

describe("convertInputNumberOptionsToNumericInput", () => {
    it("converts maxError to a number when present", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            inexact: true,
            maxError: "0.042",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(0.042);
    });

    it("converts maxError values in exponent notation", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            maxError: "42e-3",
            inexact: true,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(0.042);
    });

    it("leaves maxError undefined when undefined", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            maxError: undefined,
            inexact: true,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].maxError).toBe(undefined);
    });

    it("sets maxError to 0 when inexact is false", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            maxError: 0.99,
            inexact: false,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers[0].maxError).toBe(0);
    });

    it("sets maxError to 0 when inexact is undefined", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            maxError: 0.99,
            inexact: undefined,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers[0].maxError).toBe(0);
    });

    it(`converts the "number" answer type to [integer, decimal, proper, improper, mixed]`, () => {
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            value: "1.5",
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers).toHaveLength(1);
        expect(result.answers[0].value).toEqual(1.5);
    });

    it("excludes `decimal` and `integer` from `answerForms` when answerType is number, inexact is false, and `value` has more than 10 decimal places", () => {
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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
        const options: PerseusInputNumberWidgetOptions = {
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

    it("converts alignment when rightAlign is undefined", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            rightAlign: undefined,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.textAlign).toBe("start");
    });

    it("converts alignment when rightAlign is true", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            rightAlign: true,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.textAlign).toBe("end");
    });

    it("converts alignment when rightAlign is false", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            rightAlign: false,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.textAlign).toBe("start");
    });
});
