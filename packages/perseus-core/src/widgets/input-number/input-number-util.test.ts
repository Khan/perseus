import {getInputNumberPublicWidgetOptions} from "./input-number-util";

import type {PerseusInputNumberWidgetOptions} from "../../data-schema";

describe("getInputNumberPublicWidgetOptions", () => {
    it("removes the answer `value`, `message`, and `strict`", () => {
        const original: PerseusInputNumberWidgetOptions = {
            size: "normal",
            coefficient: false,
            answers: [
                {
                    status: "correct",
                    simplify: "optional",
                    value: 42,
                    answerForms: ["pi"],
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
                    answerForms: ["pi"],
                },
            ],
        });
    });
});
