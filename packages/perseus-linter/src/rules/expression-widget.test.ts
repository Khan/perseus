import {expectPass, expectWarning} from "../__tests__/test-utils";

import {
    ExpressionWidgetButtons,
    ExpressionWidgetCorrectAnswer,
} from "./expression-widget";

describe("expression-widget-buttons", () => {
    it("warns for sqrt without the prealgebra button set", () => {
        expectWarning(
            ExpressionWidgetButtons,
            "[[☃ expression 1]]",
            {
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
            },
            {
                message:
                    "expression 1: Answer requires a button not found in the button sets: \\sqrt (in prealgebra)",
            },
        );
    });

    it("passes for sqrt with the prealgebra button set", () => {
        expectPass(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectWarning(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectPass(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectWarning(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectPass(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectWarning(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectPass(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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

describe("expression-widget-correct-answer", () => {
    it("warns when no answers are specified", () => {
        expectWarning(
            ExpressionWidgetCorrectAnswer,
            "[[☃ expression 1]]",
            {
                widgets: {
                    "expression 1": {
                        options: {
                            answerForms: [],
                        },
                    },
                },
            },
            {message: "expression 1: No answers specified."},
        );
    });

    it("warns when no correct answer is specified", () => {
        expectWarning(
            ExpressionWidgetCorrectAnswer,
            "[[☃ expression 1]]",
            {
                widgets: {
                    "expression 1": {
                        options: {
                            answerForms: [
                                {
                                    value: "1",
                                    form: false,
                                    simplify: false,
                                    considered: "wrong",
                                },
                            ],
                        },
                    },
                },
            },
            {message: "expression 1: No correct answer specified."},
        );
    });

    it("passes when there is a correct answer", () => {
        expectPass(ExpressionWidgetCorrectAnswer, "[[☃ expression 1]]", {
            widgets: {
                "expression 1": {
                    options: {
                        answerForms: [
                            {
                                value: "2",
                                form: false,
                                simplify: false,
                                considered: "correct",
                            },
                        ],
                    },
                },
            },
        });
    });
});
