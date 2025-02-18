import {parse} from "../parse";
import {success} from "../result";

import {parseNumericInputWidget} from "./numeric-input-widget";

describe("parseExpressionWidget", () => {
    it("migrates v0 options to v1", () => {
        const v0 = {
            type: "numeric-input",
            version: {major: 0, minor: 0},
            options: {
                answers: [
                    {
                        answerForms: ["pi"],
                        maxError: null,
                        message: "",
                        simplify: "required",
                        status: "correct",
                        strict: false,
                        value: 42,
                    },
                ],
                labelText: "",
                size: "",
                coefficient: false,
                static: false,
            },
        };

        expect(parse(v0, parseNumericInputWidget)).toEqual(
            success({
                type: "numeric-input",
                version: {major: 1, minor: 0},
                options: {
                    answers: [
                        {
                            answerForms: ["pi"],
                            maxError: null,
                            message: "",
                            simplify: "required",
                            status: "correct",
                            strict: false,
                            value: 42,
                        },
                    ],
                    fullAnswerForms: [
                        {
                            name: "pi",
                            simplify: "required",
                        },
                    ],
                    labelText: "",
                    size: "",
                    coefficient: false,
                    static: false,
                },
            }),
        );
    });
});
