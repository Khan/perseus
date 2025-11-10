import {expectPass, expectWarning} from "../__tests__/test-utils";

import expressionWidgetErrorRule from "./expression-widget-error";

describe("expression-widget-error", () => {
    // Error when no answers are specified
    expectWarning(expressionWidgetErrorRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [],
                },
            },
        },
    });

    // Error when no correct answer is specified
    expectWarning(expressionWidgetErrorRule, "[[☃ expression 1]]", {
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
    });

    // Error when an answer is empty
    expectWarning(expressionWidgetErrorRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                    ],
                },
            },
        },
    });

    // Error when value could not be parsed
    expectWarning(expressionWidgetErrorRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            // Unparsable value
                            value: "2.4.r",
                            form: false,
                            simplify: false,
                            considered: "correct",
                        },
                    ],
                },
            },
        },
    });

    // Error when value is not simplified but is required to be
    expectWarning(expressionWidgetErrorRule, "[[☃ expression 1]]", {
        widgets: {
            "expression 1": {
                options: {
                    answerForms: [
                        {
                            value: "2/1",
                            form: false,
                            simplify: true,
                            considered: "correct",
                        },
                    ],
                },
            },
        },
    });

    // Pass when no errors are detected
    expectPass(expressionWidgetErrorRule, "[[☃ expression 1]]", {
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
