import {expectWarning, expectPass} from "../__tests__/test-utils";

import expressionWidgetRule from "./expression-widget";

describe("expression-widget", () => {
    // Warning for sqrt without the prealgebra button set
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

    // Pass for sqrt with the prealgebra button set
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

    // Warning for ^ without the prealgebra button set
    expectWarning(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "2^{2x}",
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

    // Pass for ^ with the prealgebra button set
    expectPass(expressionWidgetRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "2^{2x}",
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

    // Warning for sin without the trig button set
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

    // Pass for sin with the trig button set
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

    // Warning for log without the logarithms button set
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

    // Pass for log with the logarithms button set
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
