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
    })

    it("sets maxError to 0 when inexact is undefined", () => {
        const options: PerseusInputNumberWidgetOptions = {
            ...baseOptions,
            maxError: 0.99,
            inexact: undefined,
        };

        const result = convertInputNumberOptionsToNumericInput(options);

        expect(result.answers[0].maxError).toBe(0);
    })

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
            "proper",
            "improper",
            "mixed",
            "decimal",
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
});
