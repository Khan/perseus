import {
    generateExplanationWidget,
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateGradedGroupWidget,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {expectPass, expectWarning} from "../__tests__/test-utils";

import explanationInGradedGroupRule from "./explanation-in-graded-group";

describe("explanation-in-graded-group", () => {
    it("warns when a graded group contains an explanation widget", () => {
        expectWarning(
            explanationInGradedGroupRule,
            "[[☃ graded-group 1]]",
            {
                widgets: {
                    "graded-group 1": generateGradedGroupWidget({
                        options: generateGradedGroupOptions({
                            content: "[[☃ explanation 1]]",
                            widgets: {
                                "explanation 1": generateExplanationWidget(),
                            },
                        }),
                    }),
                },
            },
            {
                message:
                    "Explanation widget in graded-group 1: Use the Graded Group Hint instead.",
            },
        );
    });

    it("warns when a group in a graded group set contains an explanation widget", () => {
        expectWarning(
            explanationInGradedGroupRule,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [
                                generateGradedGroupOptions({
                                    content: "[[☃ radio 1]]",
                                    widgets: {
                                        "radio 1": generateRadioWidget(),
                                    },
                                }),
                                generateGradedGroupOptions({
                                    content: "[[☃ explanation 1]]",
                                    widgets: {
                                        "explanation 1":
                                            generateExplanationWidget(),
                                    },
                                }),
                            ],
                        },
                    }),
                },
            },
            {
                message:
                    "Explanation widget in graded-group-set 1, group 2: Use the Graded Group Hint instead.",
            },
        );
    });

    it("passes when a graded group has no explanation widget", () => {
        expectPass(explanationInGradedGroupRule, "[[☃ graded-group 1]]", {
            widgets: {
                "graded-group 1": generateGradedGroupWidget({
                    options: generateGradedGroupOptions({
                        content: "[[☃ radio 1]]",
                        widgets: {"radio 1": generateRadioWidget()},
                    }),
                }),
            },
        });
    });

    it("passes when a graded group set has no explanation widget", () => {
        expectPass(explanationInGradedGroupRule, "[[☃ graded-group-set 1]]", {
            widgets: {
                "graded-group-set 1": generateGradedGroupSetWidget({
                    options: {
                        gradedGroups: [
                            generateGradedGroupOptions({
                                content: "[[☃ radio 1]]",
                                widgets: {"radio 1": generateRadioWidget()},
                            }),
                        ],
                    },
                }),
            },
        });
    });

    it("passes when an explanation widget is outside a graded group", () => {
        expectPass(explanationInGradedGroupRule, "[[☃ explanation 1]]", {
            widgets: {"explanation 1": generateExplanationWidget()},
        });
    });

    it("passes when the widget has no definition", () => {
        expectPass(explanationInGradedGroupRule, "[[☃ graded-group 1]]", {
            widgets: {},
        });
    });
});
