import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {
    PerseusInputNumberWidgetOptions,
    PerseusInputNumberWidgetOptionsV0,
} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("nulls out the answer value", () => {
        const original: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    simplify: "optional",
                    value: 42,
                    answerForms: [],
                    message: "",
                    strict: true,
                },
            ],
        };

        expect(getInputNumberPublicWidgetOptions(original)).toEqual({
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    simplify: "optional",
                    value: null,
                    answerForms: [],
                    message: "",
                    strict: true,
                },
            ],
        });
    });
});
