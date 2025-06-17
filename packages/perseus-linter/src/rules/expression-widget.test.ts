import {expectWarning, expectPass} from "../__tests__/test-utils";

import expressionWidgetRule from "./expression-widget";

describe("expression-widget", () => {
    expectWarning(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\sqrt{42}",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic"],
                },
            },
        },
    });

    expectPass(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\sqrt{42}",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic", "prealgebra"],
                },
            },
        },
    });

    expectWarning(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\sin\\left(42\\right)",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic"],
                },
            },
        },
    });

    expectPass(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\sin\\left(42\\right)",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic", "trig"],
                },
            },
        },
    });

    expectWarning(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\log\\left(5\\right)",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic"],
                },
            },
        },
    });

    expectPass(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "\\log\\left(5\\right)",
                            form: true,
                            simplify: true,
                            considered: "correct",
                            key: "0",
                        },
                    ],
                    buttonSets: ["basic", "logarithms"],
                },
            },
        },
    });
});
