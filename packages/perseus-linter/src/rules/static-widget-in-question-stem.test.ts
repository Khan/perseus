import {testRule} from "../__tests__/test-utils";

import staticWidgetInQuestionStemRule from "./static-widget-in-question-stem";

describe("static-widget-in-question-stem", () => {
    test("Rule static-widget-in-question-stem allows static widgets in hints", () => {
        const problems = testRule(
            staticWidgetInQuestionStemRule,
            "[[☃ radio 1]]",
            {
                contentType: "exercise",
                stack: ["hint"],
                widgets: {
                    "radio 1": {
                        static: true,
                    },
                },
            },
        );

        expect(problems).toBe(null);
    });

    test("Rule static-widget-in-question-stem allows static widgets in articles", () => {
        const problems = testRule(
            staticWidgetInQuestionStemRule,
            "[[☃ radio 1]]",
            {
                contentType: "article",
                stack: [],
                widgets: {
                    "radio 1": {
                        static: true,
                    },
                },
            },
        );

        expect(problems).toBe(null);
    });

    test("Rule static-widget-in-question-stem allows non-static widgets in question stems", () => {
        const problems = testRule(
            staticWidgetInQuestionStemRule,
            "[[☃ radio 1]]",
            {
                contentType: "exercise",
                stack: [],
                widgets: {
                    "radio 1": {
                        static: false,
                    },
                },
            },
        );

        expect(problems).toBe(null);
    });

    test("Rule static-widget-in-question-stem tolerates widget with no definition", () => {
        const problems = testRule(
            staticWidgetInQuestionStemRule,
            "[[☃ radio 1]]",
            {
                contentType: "exercise",
                stack: [],
                widgets: {},
            },
        );

        expect(problems).toBe(null);
    });

    test("Rule static-widget-in-question-stem allows warns about static widgets in question stems", () => {
        const problems = testRule(
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
        );

        expect(problems?.length).toBe(1);
        expect(problems?.[0]?.message).toBe(
            "Widget in question stem is static (non-interactive).",
        );
    });
});
