import {expectPass, expectIssue} from "../__tests__/test-utils";

import {
    ExpressionWidgetAnswerForms,
    ExpressionWidgetButtons,
    ExpressionWidgetCorrectAnswer,
} from "./expression-widget";

describe("expression-widget-buttons", () => {
    it("warns for sqrt without the prealgebra button set", () => {
        expectIssue(
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
                messages: [
                    "expression 1: Answer requires a button not found in the button sets: \\sqrt (in prealgebra)",
                ],
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
        expectIssue(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectIssue(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectIssue(ExpressionWidgetButtons, "[[☃ expression 1]]", {
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
        expectIssue(
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
            {messages: ["expression 1: No answers specified."]},
        );
    });

    it("warns when no correct answer is specified", () => {
        expectIssue(
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
            {messages: ["expression 1: No correct answer specified."]},
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

describe("expression-widget-answer-forms", () => {
    type Answer = {value: string; simplify?: boolean};

    function expressionWidget({
        functions = [],
        answers,
    }: {
        functions?: string[];
        answers: Answer[];
    }) {
        return {
            widgets: {
                "expression 1": {
                    options: {
                        functions,
                        answerForms: answers.map(({value, simplify}) => ({
                            value,
                            simplify: simplify ?? false,
                            form: false,
                            considered: "correct",
                        })),
                    },
                },
            },
        };
    }

    const content = "[[☃ expression 1]]";

    it("warns when an answer is empty", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: ""}]}),
            {messages: ["expression 1: Answer 1 is empty."]},
        );
    });

    it("numbers empty answers by their position", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "2"}, {value: ""}]}),
            {messages: ["expression 1: Answer 2 is empty."]},
        );
    });

    it("warns when value could not be parsed", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "2.4.r"}]}),
            {messages: ["expression 1: Couldn't parse 2.4.r."]},
        );
    });

    it("warns when value is not simplified but is required to be", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "2/1", simplify: true}]}),
            {
                messages: [
                    "expression 1: 2/1 isn't simplified, but is required to be.",
                ],
            },
        );
    });

    it("combines the messages for multiple bad answers", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: ""}, {value: "2.4.r"}]}),
            {
                messages: [
                    "expression 1: Answer 1 is empty.",
                    "expression 1: Couldn't parse 2.4.r.",
                ],
            },
        );
    });

    it("passes when a required-simplified value is simplified", () => {
        expectPass(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "2x", simplify: true}]}),
        );
    });

    it("passes when an unsimplified value is not required to be simplified", () => {
        expectPass(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "2/1", simplify: false}]}),
        );
    });

    it("parses answers using the configured functions list", () => {
        // With f as a function, f(x)/x is simplified; as a variable, the
        // x's would cancel.
        expectPass(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({
                answers: [{value: "f(x)/x", simplify: true}],
                functions: ["f"],
            }),
        );
    });

    it("treats names not in the functions list as variables", () => {
        expectIssue(
            ExpressionWidgetAnswerForms,
            content,
            expressionWidget({answers: [{value: "f(x)/x", simplify: true}]}),
            {
                messages: [
                    "expression 1: f(x)/x isn't simplified, but is required to be.",
                ],
            },
        );
    });
});
