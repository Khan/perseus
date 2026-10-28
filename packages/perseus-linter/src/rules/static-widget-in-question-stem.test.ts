import {expectPass, expectWarning} from "../__tests__/test-utils";

import staticWidgetInQuestionStemRule from "./static-widget-in-question-stem";

describe("static-widget-in-question-stem", () => {
    test("Rule static-widget-in-question-stem allows static widgets in hints", () => {
        expectPass(staticWidgetInQuestionStemRule, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: ["hint"],
            widgets: {
                "radio 1": {
                    static: true,
                },
            },
        });
    });

    test("Rule static-widget-in-question-stem allows static widgets in articles", () => {
        expectPass(staticWidgetInQuestionStemRule, "[[☃ radio 1]]", {
            contentType: "article",
            stack: [],
            widgets: {
                "radio 1": {
                    static: true,
                },
            },
        });
    });

    test("Rule static-widget-in-question-stem allows non-static widgets in question stems", () => {
        expectPass(staticWidgetInQuestionStemRule, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: [],
            widgets: {
                "radio 1": {
                    static: false,
                },
            },
        });
    });

    test("Rule static-widget-in-question-stem tolerates widget with no definition", () => {
        expectPass(staticWidgetInQuestionStemRule, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: [],
            widgets: {},
        });
    });

    test("Rule static-widget-in-question-stem allows warns about static widgets in question stems", () => {
        expectWarning(
            staticWidgetInQuestionStemRule,
            "[[☃ radio 1]]",
            {
                contentType: "exercise",
                stack: [],
                widgets: {
                    "radio 1": {
                        static: true,
                    },
                },
            },
            {
                messages: [
                    "Widget in question stem is static (non-interactive).",
                ],
            },
        );
    });
});
