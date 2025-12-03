import {
    generateVideoOptions,
    generateVideoWidget,
} from "./video-widget-generator";

import type {VideoWidget, PerseusVideoWidgetOptions} from "../../data-schema";

describe("generateVideoOptions", () => {
    test("builds a default video options", () => {
        // Arrange, Act
        const options: PerseusVideoWidgetOptions = generateVideoOptions();

        // Assert
        expect(options.location).toBe("");
    });

    test("builds a video options with all props", () => {
        // Arrange, Act
        const options: PerseusVideoWidgetOptions = generateVideoOptions({
            location: "the location",
        });

        // Assert
        expect(options.location).toBe("the location");
    });
});

describe("generateVideoWidget", () => {
    test("builds a default video widget", () => {
        // Arrange, Act
        const widget: VideoWidget = generateVideoWidget();

        // Assert
        expect(widget.type).toBe("video");
        expect(widget.graded).toBe(true);
        expect(widget.static).toBe(false);
        expect(widget.version).toEqual({major: 0, minor: 0});
        expect(widget.alignment).toBe("default");
        expect(widget.options).toEqual({location: ""});
    });

    test("builds a video widget with all props", () => {
        // Arrange, Act
        const widget: VideoWidget = generateVideoWidget({
            graded: false,
            version: {major: 1, minor: 0},
            static: true,
            alignment: "block",
            options: {location: "the location"},
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.graded).toBe(false);
        expect(widget.alignment).toBe("block");
        expect(widget.options).toEqual({location: "the location"});
    });

    test("adds options when option generator is used", () => {
        // Arrange, Act
        const widget: VideoWidget = generateVideoWidget({
            static: true,
            alignment: "block",
            // Use options generator
            options: generateVideoOptions({location: "the location"}),
        });

        // Assert
        expect(widget.static).toBe(true);
        expect(widget.alignment).toBe("block");
        expect(widget.options.location).toBe("the location");
    });
});
