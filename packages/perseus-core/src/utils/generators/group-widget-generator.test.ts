import {
    generateGroupOptions,
    generateGroupWidget,
} from "./group-widget-generator";
import {generateRadioWidget} from "./radio-widget-generator";

import type {GroupWidget} from "../../data-schema";

describe("generateGroupOptions", () => {
    it("builds a default group options object", () => {
        // Arrange, Act
        const options = generateGroupOptions();

        // Assert
        expect(options.content).toBe("");
        expect(options.widgets).toEqual({});
        expect(options.images).toEqual({});
    });

    it("builds a group options object with all props", () => {
        // Arrange, Act
        const options = generateGroupOptions({
            content: "some content: [[☃ radio 1]]",
            widgets: {"radio 1": generateRadioWidget()},
            images: {
                "image-url": {
                    height: 100,
                    width: 100,
                },
            },
        });

        // Assert
        expect(options.content).toBe("some content: [[☃ radio 1]]");
        expect(options.widgets).toEqual({
            "radio 1": generateRadioWidget(),
        });
        expect(options.images).toEqual({
            "image-url": {
                height: 100,
                width: 100,
            },
        });
    });
});

describe("generateGroupWidget", () => {
    it("builds a default group widget", () => {
        // Arrange, Act
        const widget: GroupWidget = generateGroupWidget();

        // Assert
        expect(widget.type).toBe("group");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({
            content: "",
            widgets: {},
            images: {},
        });
    });

    it("builds a group widget with all props", () => {
        // Arrange, Act
        const widget: GroupWidget = generateGroupWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {
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
        expect(widget.graded).toBe(false);
        expect(widget.version).toEqual({major: 1, minor: 0});
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({
            content: "some content: [[☃ radio 1]]",
            widgets: {"radio 1": generateRadioWidget()},
            images: {
                "image-url": {
                    height: 100,
                    width: 100,
                },
            },
        });
    });
});
