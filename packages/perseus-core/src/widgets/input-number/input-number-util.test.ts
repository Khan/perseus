import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("removes the answer `value`, `message`, and `maxError`, and sets `strict` to `false`", () => {
        const original: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            textAlign: "left",
            answers: [
                {
                    status: "correct",
                    simplify: "optional",
                    value: 42,
                    answerForms: ["pi"],
                    message: "this should be removed",
                    strict: true,
                },
            ],
        };

        expect(getInputNumberPublicWidgetOptions(original)).toEqual({
            size: "normal",
            coefficient: false,
            textAlign: "left",
            answers: [
                {
                    status: "correct",
                    simplify: "optional",
                    value: null,
                    answerForms: ["pi"],
                    message: "",
                    strict: false,
                },
            ],
        });
    });
});
