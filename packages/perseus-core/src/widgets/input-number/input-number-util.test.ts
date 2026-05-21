import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("removes value", () => {
        // FIXME: reorder properties for consistency
        const original: PerseusInputNumberWidgetOptions = {
            answers: [
                {
                    value: 42,
                    simplify: "optional",
                    status: "correct",
                    strict: true,
                    answerForms: [
                        "integer",
                        "decimal",
                        "proper",
                        "improper",
                        "mixed",
                    ],
                    message: "",
                },
            ],
            size: "normal",
            coefficient: false,
        };

        expect(getInputNumberPublicWidgetOptions(original)).toEqual({
            size: "normal",
            coefficient: false,
            answers: [
                {
                    simplify: "optional",
                    status: "correct",
                    answerForms: [
                        "integer",
                        "decimal",
                        "proper",
                        "improper",
                        "mixed",
                    ],
                },
            ],
        });
    });
});
