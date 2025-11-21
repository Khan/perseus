import {expectPass, expectWarning} from "../__tests__/test-utils";
import Rule from "../rule";

import labelImageWidgetErrorRule from "./label-image-widget-error";

describe("label-image-widget-error", () => {
    // Error when question has fewer than two answer choices
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1"],
                        imageUrl: "example-url",
                        imageAlt: "example-alt",
                        markers: [
                            {
                                label: "Label 1",
                                answers: ["Choice 1"],
                                x: 10,
                                y: 10,
                            },
                        ],
                    },
                },
            },
        },
        {
            message: "label-image widget must have at least two answer choices",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when there's no image URL
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1", "Choice 2"],
                        imageAlt: "example-alt",
                        markers: [
                            {
                                label: "Label 1",
                                answers: ["Choice 1"],
                                x: 10,
                                y: 10,
                            },
                        ],
                    },
                },
            },
        },
        {
            message: "No image url provided",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when there's no image alt text
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1", "Choice 2"],
                        imageUrl: "example-url",
                        markers: [
                            {
                                label: "Label 1",
                                answers: ["Choice 1"],
                                x: 10,
                                y: 10,
                            },
                        ],
                    },
                },
            },
        },
        {
            message: "No image alt text provided",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when there are no markers
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1", "Choice 2"],
                        imageUrl: "example-url",
                        imageAlt: "example-alt",
                        markers: [],
                    },
                },
            },
        },
        {
            message: "label-image widget requires at least one marker",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when there are markers with no answers
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1", "Choice 2"],
                        imageUrl: "example-url",
                        imageAlt: "example-alt",
                        markers: [
                            {
                                label: "Label 1",
                                answers: [],
                                x: 10,
                                y: 10,
                            },
                        ],
                    },
                },
            },
        },
        {
            message:
                "label-image widget has 1 markers with no answers selected",
            severity: Rule.Severity.ERROR,
        },
    );

    // Error when there are markers with no ARIA label
    expectWarning(
        labelImageWidgetErrorRule,
        "[[☃ label-image 1]]",
        {
            widgets: {
                "label-image 1": {
                    options: {
                        choices: ["Choice 1", "Choice 2"],
                        imageUrl: "example-url",
                        imageAlt: "example-alt",
                        markers: [
                            {
                                label: "", // empty string
                                answers: ["Choice 1"],
                                x: 10,
                                y: 10,
                            },
                        ],
                    },
                },
            },
        },
        {
            message: "label-image widget has 1 markers with no ARIA label",
            severity: Rule.Severity.ERROR,
        },
    );

    // Pass when no errors are detected
    expectPass(labelImageWidgetErrorRule, "[[☃ label-image 1]]", {
        widgets: {
            "label-image 1": {
                options: {
                    choices: ["Choice 1", "Choice 2"],
                    imageUrl: "example-url",
                    imageAlt: "example-alt",
                    markers: [
                        {
                            label: "Label 1",
                            answers: ["Choice 1"],
                            x: 10,
                            y: 10,
                        },
                    ],
                },
            },
        },
    });
});
