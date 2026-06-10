import {expectPass, expectWarning} from "../__tests__/test-utils";

import numericInputWidgetErrorRule from "./numeric-input-widget-error";

describe("radio-widget-error", () => {
    it("warns for numeric input widget with all empty answers", () => {
        expectWarning(numericInputWidgetErrorRule, "[[☃ numeric-input 1]]", {
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
        });
    });

    it("warns for numeric input widget with some empty answers", () => {
        expectWarning(numericInputWidgetErrorRule, "[[☃ numeric-input 1]]", {
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
        });
    });

    it("warns for numeric input with required format but no format selected", () => {
        expectWarning(numericInputWidgetErrorRule, "[[☃ numeric-input 1]]", {
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
        });
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
