import {expectPass, expectWarning} from "../__tests__/test-utils";

import expressionWidgetRule from "./expression-widget";

describe("expression-widget", () => {
    it("warns for sqrt without the prealgebra button set", () => {
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
    });

    it("passes for sqrt with the prealgebra button set", () => {
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
    });

    it("warns for ^ without the prealgebra button set", () => {
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
    });

    it("passes for ^ with the prealgebra button set", () => {
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
    });

    it("warns for sin without the trig button set", () => {
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
    });

    it("passes for sin with the trig button set", () => {
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
    });

    it("warns for log without the logarithms button set", () => {
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
    });

    it("passes for log with the logarithms button set", () => {
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
});
