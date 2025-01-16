import {generateExamples, shouldShowExamples} from "./utils";

import type {PerseusStrings} from "../../strings";
import type {PerseusNumericInputAnswerForm} from "@khanacademy/perseus-core";

describe("generateExamples", () => {
    it("returns an array of examples", () => {
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
        ];
        const strings: Partial<PerseusStrings> = {
            yourAnswer: "Your answer",
            integerExample: "Integer example",
            properExample: "Proper example",
            simplifiedProperExample: "Simplified proper example",
        };
        const expected = [
            "Your answer",
            "Integer example",
            "Simplified proper example",
        ];
        expect(
            generateExamples(answerForms, strings as PerseusStrings),
        ).toEqual(expected);
    });
});

describe("shouldShowExamples", () => {
    it("returns true when not all forms are accepted", () => {
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
        ];
        expect(shouldShowExamples(answerForms)).toBe(true);
    });

    it("returns false when all forms are accepted", () => {
        const answerForms: readonly PerseusNumericInputAnswerForm[] = [
            {
                name: "integer",
                simplify: "optional",
            },
            {
                name: "proper",
                simplify: "required",
            },
            {
                name: "improper",
                simplify: "optional",
            },
            {
                name: "mixed",
                simplify: "required",
            },
            {
                name: "decimal",
                simplify: "optional",
            },
            {
                name: "pi",
                simplify: "required",
            },
        ];
        expect(shouldShowExamples(answerForms)).toBe(false);
    });

    it("returns false when no forms are accepted", () => {
        const answerForms = [];
        expect(shouldShowExamples(answerForms)).toBe(false);
    });
});
