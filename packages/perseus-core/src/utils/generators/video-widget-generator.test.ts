import {generateVideoWidget} from "./video-widget-generator";

import type {VideoWidget} from "../../data-schema";

describe("generateVideoWidget", () => {
    it("builds a default video widget", () => {
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

    it("builds a video widget with all props", () => {
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
});
