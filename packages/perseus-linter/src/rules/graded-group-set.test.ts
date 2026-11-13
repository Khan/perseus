import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {GradedGroupSetWidgetRule} from "./graded-group-set";

describe("the graded-group-set linter", () => {
    it("runs markdown linters on the content of each group", () => {
        expectIssue(
            GradedGroupSetWidgetRule,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [
                                generateGradedGroupOptions({
                                    content: "Fine",
                                }),
                                generateGradedGroupOptions({
                                    content: "# Level One",
                                }),
                                generateGradedGroupOptions({
                                    content: "# Level One",
                                }),
                            ],
                        },
                    }),
                },
            },
            {
                messages: [
                    "graded-group-set 1: group 2: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                    "graded-group-set 1: group 3: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });

    it("runs widget linters on widgets in each group", () => {
        const expressionWithNoAnswers = generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [],
            }),
        });

        const gradedGroupWithLintyExpression = generateGradedGroupOptions({
            content: "[[☃ expression 1]]",
            widgets: {
                "expression 1": expressionWithNoAnswers,
            },
        });

        expectIssue(
            GradedGroupSetWidgetRule,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [gradedGroupWithLintyExpression],
                        },
                    }),
                },
            },
            {
                messages: [
                    "graded-group-set 1: group 1: expression 1: No answers specified.",
                ],
            },
        );
    });

    it("lints the hint of each group", () => {
        const expressionWithNoAnswers = generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [],
            }),
        });

        const gradedGroupWithLintyExpression = generateGradedGroupOptions({
            hint: {
                content: "[[☃ expression 1]]",
                images: {},
                widgets: {
                    "expression 1": expressionWithNoAnswers,
                },
            },
        });

        expectIssue(
            GradedGroupSetWidgetRule,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [gradedGroupWithLintyExpression],
                        },
                    }),
                },
            },
            {
                messages: [
                    "graded-group-set 1: group 1: (in hint) expression 1: No answers specified.",
                ],
            },
        );
    });
});
