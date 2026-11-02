import {
    generateExpressionOptions,
    generateExpressionWidget,
    generateGradedGroupOptions,
    generateGradedGroupWidget,
} from "@khanacademy/perseus-core";

import {expectIssue} from "../__tests__/test-utils";

import {GradedGroupWidgetRule} from "./graded-group";

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
});
