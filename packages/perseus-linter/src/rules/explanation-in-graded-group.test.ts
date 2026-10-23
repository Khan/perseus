import {
    generateExplanationWidget,
    generateGradedGroupOptions,
    generateGradedGroupSetWidget,
    generateGradedGroupWidget,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {expectPass, expectWarning} from "../__tests__/test-utils";

import {
    ExplanationInGradedGroup,
    ExplanationInGradedGroupSet,
} from "./explanation-in-graded-group";

describe("explanation-in-graded-group", () => {
    it("warns when a graded group contains an explanation widget", () => {
        expectWarning(
            ExplanationInGradedGroup,
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
                    "graded-group 1: Should not contain explanation widget. Use the Graded Group Hint instead.",
            },
        );
    });

    it("passes when a graded group has no explanation widget", () => {
        expectPass(ExplanationInGradedGroup, "[[☃ graded-group 1]]", {
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
        expectPass(ExplanationInGradedGroup, "[[☃ graded-group-set 1]]", {
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
        expectPass(ExplanationInGradedGroup, "[[☃ explanation 1]]", {
            widgets: {"explanation 1": generateExplanationWidget()},
        });
    });

    it("passes when the widget has no definition", () => {
        expectPass(ExplanationInGradedGroup, "[[☃ graded-group 1]]", {
            widgets: {},
        });
    });
});

describe("explanation-in-graded-group-set", () => {
    it("warns when a group in a graded group set contains an explanation widget", () => {
        expectWarning(
            ExplanationInGradedGroupSet,
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
                    "graded-group-set 1: Graded group 2 should not contain explanation widget. Use the Graded Group Hint instead.",
            },
        );
    });

    it("lists multiple groups with violations", () => {
        expectWarning(
            ExplanationInGradedGroupSet,
            "[[☃ graded-group-set 1]]",
            {
                widgets: {
                    "graded-group-set 1": generateGradedGroupSetWidget({
                        options: {
                            gradedGroups: [
                                generateGradedGroupOptions({
                                    content: "[[☃ explanation 1]]",
                                    widgets: {
                                        "explanation 1":
                                            generateExplanationWidget(),
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
                    "graded-group-set 1: Graded groups 1 and 2 should not contain explanation widgets. Use the Graded Group Hint instead.",
            },
        );
    });

    it("passes when a graded group set contains no explanation widget", () => {
        expectPass(ExplanationInGradedGroupSet, "[[☃ graded-group-set 1]]", {
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
                        ],
                    },
                }),
            },
        });
    });
});
