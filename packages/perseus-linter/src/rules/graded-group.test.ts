import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateGradedGroupWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {GradedGroupSetWidgetRule, GradedGroupWidgetRule} from "./graded-group";

describe("the graded-group linter", () => {
    it("runs markdown linters on the content of the group", () => {
        expectIssue(
            GradedGroupWidgetRule,
            "[[☃ graded-group 1]]",
            {
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            content: "# Level One",
                        }),
                    }),
                },
            },
            {
                messages: [
                    "graded-group 1: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });

    it("runs widget linters on widgets in the group", () => {
        expectIssue(
            GradedGroupWidgetRule,
            "[[☃ graded-group 1]]",
            {
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            content: "[[☃ expression 1]]",
                            widgets: {
                                "expression 1": generateExpressionWidget({
                                    options: generateExpressionOptions({
                                        answerForms: [],
                                    }),
                                }),
                            },
                        }),
                    }),
                },
            },
            {
                messages: [
                    "graded-group 1: expression 1: No answers specified.",
                ],
            },
        );
    });

    it("lints the hint", () => {
        expectIssue(
            GradedGroupWidgetRule,
            "[[☃ graded-group 1]]",
            {
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            content: "valid",
                            hint: {
                                content: "# A level one heading - bad!",
                                widgets: {},
                                images: {},
                            },
                        }),
                    }),
                },
            },
            {
                messages: [
                    "graded-group 1: (in hint) Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });
});

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
                            ],
                        },
                    }),
                },
            },
            {
                messages: [
                    "graded-group-set 1: group 2: Don't use level-1 headings:\nBegin headings with two or more # characters.",
                ],
            },
        );
    });

    it("runs widget linters on widgets in each group", () => {
        expectIssue(
            GradedGroupSetWidgetRule,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [
                                generateGradedGroupOptions({
                                    content: "[[☃ expression 1]]",
                                    widgets: {
                                        "expression 1":
                                            generateExpressionWidget({
                                                options:
                                                    generateExpressionOptions({
                                                        answerForms: [],
                                                    }),
                                            }),
                                    },
                                }),
                            ],
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
});
