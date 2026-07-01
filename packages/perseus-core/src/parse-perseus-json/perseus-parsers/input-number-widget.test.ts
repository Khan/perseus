import {describe, expect, it} from "@jest/globals";

import {anySuccess, ctx} from "../general-purpose-parsers/test-helpers";
import {assertSuccess, success} from "../result";

import {parseInputNumberWidget} from "./input-number-widget";

import type {PerseusInputNumberWidgetOptionsV0} from "./input-number-widget";

const baseOptionsV0: PerseusInputNumberWidgetOptionsV0 = {
    simplify: "required",
    size: "normal",
    value: "0",
};

describe("parseInputNumberWidget", () => {
    it("parses v0 -> v1, converting maxError to a number", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                inexact: true,
                maxError: "0.042",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].maxError).toBe(0.042);
    });

    it("parses v0 -> v1, converting maxError from exponent notation", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                inexact: true,
                maxError: "42e-3",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].maxError).toBe(0.042);
    });

    it("parses v0 -> v1, leaving maxError undefined when undefined", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                maxError: undefined,
                inexact: true,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].maxError).toBe(undefined);
    });

    it("parses v0 -> v1, setting maxError = 0 when inexact is false", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                maxError: 0.99,
                inexact: false,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].maxError).toBe(0);
    });

    it("parses v0 -> v1, setting maxError = 0 when inexact is undefined", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                maxError: 0.99,
                inexact: undefined,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].maxError).toBe(0);
    });

    it("parses v0 -> v1, converting the 'number' answerType to empty answerForms", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: "number",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([]);
    });

    it("parses v0 -> v1, converting the 'rational' answerType to [integer, proper, improper, mixed]", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: "rational",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([
            "integer",
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("parses v0 -> v1, defaulting answerForms to empty when answerType is undefined", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: undefined,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([]);
    });

    it("parses v0 -> v1, converting `value` to a number", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                value: "1.5",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].value).toEqual(1.5);
    });

    it("parses v0 -> v1, excluding `decimal` and `integer` from `answerForms` when answerType is number, inexact is false, and `value` has more than 10 decimal places", () => {
        // The intention here is that if the answer is a very long decimal,
        // and an exact answer is required, the learner must use a fraction
        // instead of typing all the decimal places.
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: "number",
                inexact: false,
                value: "1.12345678901",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("parses v0 -> v1, excluding `decimal` and `integer` from `answerForms` when answerType is undefined, inexact is false, and `value` has more than 10 decimal places", () => {
        // The intention here is that if the answer is a very long decimal,
        // and an exact answer is required, the learner must use a fraction
        // instead of typing all the decimal places.
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: undefined,
                inexact: false,
                value: "1.12345678901",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("parses v0 -> v1, excluding `decimal` and `integer` from `answerForms` when inexact is undefined and `value` has more than 10 decimal places", () => {
        // The intention here is that if the answer is a very long decimal,
        // and an exact answer is required, the learner must use a fraction
        // instead of typing all the decimal places.
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: undefined,
                inexact: undefined,
                value: "1.12345678901",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([
            "proper",
            "improper",
            "mixed",
        ]);
    });

    it("parses v0 -> v1, returning an empty array for answerForms when inexact is true and value has more than 10 decimal places", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: undefined,
                inexact: true,
                value: "1.12345678901",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.answers[0].answerForms).toEqual([]);
    });

    it("parses v0 -> v1, migrating rightAlign: false to textAlign: left", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                rightAlign: false,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());
        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("left");
    });

    it("parses v0 -> v1, migrating rightAlign: undefined to textAlign: left", () => {
        const raw = {
            type: "input-number",
            options: {
                simplify: "required",
                size: "normal",
                value: "0",
                // Note: no rightAlign property.
            },
        };

        const result = parseInputNumberWidget(raw, ctx());
        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("left");
    });

    it("parses v0 -> v1, migrating rightAlign: true to textAlign: right", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                rightAlign: true,
            },
        };

        const result = parseInputNumberWidget(raw, ctx());
        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("right");
    });

    it("allows decimal answers when the answer has exactly 10 decimal places", () => {
        const raw = {
            type: "input-number",
            options: {
                ...baseOptionsV0,
                answerType: undefined,
                inexact: undefined,
                value: "0.1231231234",
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(anySuccess);
        assertSuccess(result);
        // Empty answerForms means the default answer forms are accepted.
        expect(result.value.options.answers[0].answerForms).toEqual([]);
    });

    it("parses v1 options", () => {
        const raw = {
            type: "input-number",
            version: {major: 1, minor: 0},
            options: {
                size: "normal",
                coefficient: false,
                textAlign: "center",
                answers: [
                    {
                        status: "correct",
                        value: 42,
                        maxError: 0.7,
                        simplify: "required",
                        answerForms: [],
                        message: "",
                        strict: true,
                    },
                ],
            },
        };

        const result = parseInputNumberWidget(raw, ctx());

        expect(result).toEqual(success(raw));
    });
});
