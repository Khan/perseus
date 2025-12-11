import {
    generateGradedGroupOptions,
    generateGradedGroupWidget,
} from "./graded-group-widget-generator";
import {generateRadioWidget} from "./radio-widget-generator";

import type {
    GradedGroupWidget,
    PerseusGradedGroupWidgetOptions,
} from "../../data-schema";

describe("generateGradedGroupOptions", () => {
    it("builds a default graded group options object", () => {
        // Arrange, Act
        const options: PerseusGradedGroupWidgetOptions =
            generateGradedGroupOptions();

        // Assert
        expect(options).toEqual({
            title: "",
            content: "",
            widgets: {},
            images: {},
            hint: null,
        });
    });

    it("builds a graded group options object with all props", () => {
        // Arrange, Act
        const options: PerseusGradedGroupWidgetOptions =
            generateGradedGroupOptions({
                title: "test-title",
                content: "some content: [[☃ radio 1]]",
                widgets: {"radio 1": generateRadioWidget()},
                images: {
                    "image-url": {
                        height: 100,
                        width: 100,
                    },
                },
                hint: {
                    content: "test-hint",
                    widgets: {},
                    images: {},
                },
            });

        // Assert
        expect(options).toEqual({
            title: "test-title",
            content: "some content: [[☃ radio 1]]",
            widgets: {"radio 1": generateRadioWidget()},
            images: {
                "image-url": {
                    height: 100,
                    width: 100,
                },
            },
            hint: {
                content: "test-hint",
                widgets: {},
                images: {},
            },
        });
    });
});

describe("generateGradedGroupWidget", () => {
    it("builds a default graded group widget", () => {
        // Arrange, Act
        const widget: GradedGroupWidget = generateGradedGroupWidget();

        // Assert
        expect(widget).toEqual({
            type: "graded-group",
            graded: false,
            version: {major: 0, minor: 0},
            static: false,
            alignment: "default",
            options: {
                title: "",
                content: "",
                widgets: {},
                images: {},
                hint: null,
            },
        });
    });

    it("builds a graded group widget with all props", () => {
        // Arrange, Act
        const widget: GradedGroupWidget = generateGradedGroupWidget({
            graded: true,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                title: "test-title",
                content: "some content: [[☃ radio 1]]",
                widgets: {"radio 1": generateRadioWidget()},
                images: {
                    "image-url": {
                        height: 100,
                        width: 100,
                    },
                },
            },
        });

        // Assert
        expect(widget).toEqual({
            type: "graded-group",
            graded: true,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
                title: "test-title",
                content: "some content: [[☃ radio 1]]",
                widgets: {"radio 1": generateRadioWidget()},
                images: {
                    "image-url": {
                        height: 100,
                        width: 100,
                    },
                },
            },
        });
    });
});
