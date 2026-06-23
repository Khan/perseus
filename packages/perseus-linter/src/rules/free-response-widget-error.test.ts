import {expectPass, expectWarning} from "../__tests__/test-utils";

import freeResponseWidgetErrorRule from "./free-response-widget-error";

describe("radio-widget-error", () => {
    it("warns for free response widget with no question (undefined)", () => {
        expectWarning(freeResponseWidgetErrorRule, "[[☃ free-response 1]]", {
            widgets: {
                "free-response 1": {
                    options: {
                        question: undefined,
                    },
                },
            },
        });
    });

    it("warns for free response widget with no question (empty string)", () => {
        expectWarning(freeResponseWidgetErrorRule, "[[☃ free-response 1]]", {
            widgets: {
                "free-response 1": {
                    options: {
                        question: "",
                    },
                },
            },
        });
    });

    it("warns for free response widget with question that contains a widget placeholder", () => {
        expectWarning(freeResponseWidgetErrorRule, "[[☃ free-response 1]]", {
            widgets: {
                "free-response 1": {
                    options: {
                        question: "[[☃ radio 1]]",
                    },
                },
            },
        });
    });

    it("warns for free response widget with question that contains a widget placeholder plus other text", () => {
        expectWarning(freeResponseWidgetErrorRule, "[[☃ free-response 1]]", {
            widgets: {
                "free-response 1": {
                    options: {
                        question: "abc [[☃ radio 1]] def",
                    },
                },
            },
        });
    });

    it("passes for free response widget with no issues", () => {
        expectPass(freeResponseWidgetErrorRule, "[[☃ free-response 1]]", {
            widgets: {
                "free-response 1": {
                    options: {
                        question: "Hello world!",
                    },
                },
            },
        });
    });
});
