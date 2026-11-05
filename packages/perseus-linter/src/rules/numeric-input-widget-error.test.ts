import {expectPass, expectIssue} from "../__tests__/test-utils";
import Rule from "../rule";

import numericInputWidgetErrorRule from "./numeric-input-widget-error";

describe("radio-widget-error", () => {
    it("errors for numeric input widget with all empty answers", () => {
        expectIssue(
            numericInputWidgetErrorRule,
            "[[☃ numeric-input 1]]",
            {
                widgets: {
                    "numeric-input 1": {
                        options: {
                            answers: [
                                {
                                    value: null,
                                },
                                {
                                    value: null,
                                },
                            ],
                        },
                    },
                },
            },
            {
                severity: Rule.Severity.ERROR,
                messages: ["numeric-input 1: One or more answers is empty"],
            },
        );
    });

    it("errors for numeric input widget with some empty answers", () => {
        expectIssue(
            numericInputWidgetErrorRule,
            "[[☃ numeric-input 1]]",
            {
                widgets: {
                    "numeric-input 1": {
                        options: {
                            answers: [
                                {
                                    value: 2,
                                },
                                {
                                    value: null,
                                },
                            ],
                        },
                    },
                },
            },
            {
                severity: Rule.Severity.ERROR,
                messages: ["numeric-input 1: One or more answers is empty"],
            },
        );
    });

    it("errors for numeric input with required format but no format selected", () => {
        expectIssue(
            numericInputWidgetErrorRule,
            "[[☃ numeric-input 1]]",
            {
                widgets: {
                    "numeric-input 1": {
                        options: {
                            answers: [
                                {
                                    value: 2,
                                    answerForms: [],
                                    strict: true,
                                },
                            ],
                        },
                    },
                },
            },
            {
                severity: Rule.Severity.ERROR,
                messages: [
                    "numeric-input 1: Answer 1 requires a format, but no format was selected",
                ],
            },
        );
    });

    it("passes for numeric input widget with all non-empty answers", () => {
        expectPass(numericInputWidgetErrorRule, "[[☃ numeric-input 1]]", {
            widgets: {
                "numeric-input 1": {
                    options: {
                        answers: [
                            {
                                value: 0,
                            },
                        ],
                    },
                },
            },
        });
    });
});
