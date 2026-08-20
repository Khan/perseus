import {describe, it, expect} from "@jest/globals";

import {isGraphicalImage} from "./dark-mode-toggle";

describe("isGraphicalImage", () => {
    it("is true for a PNG", () => {
        expect(isGraphicalImage("https://example.com/foo.png")).toBe(true);
    });

    it("is true for an SVG", () => {
        expect(isGraphicalImage("https://example.com/foo.svg")).toBe(true);
    });

    it("is true for a GIF", () => {
        expect(isGraphicalImage("https://example.com/foo.gif")).toBe(true);
    });

    it("is false for a JPEG", () => {
        expect(isGraphicalImage("https://example.com/foo.jpg")).toBe(false);
    });

    it("is false for null", () => {
        expect(isGraphicalImage(null)).toBe(false);
    });

    it("is false for undefined", () => {
        expect(isGraphicalImage(undefined)).toBe(false);
    });

    it("is false for a non-url string", () => {
        expect(isGraphicalImage("!foo")).toBe(false);
    });

    it("is true for a graphical image URL with a query param", () => {
        expect(isGraphicalImage("https://example.com/foo.png?q=1")).toBe(true);
    });

    it("is false for a non-graphical image URL with a query param containing a graphical filename", () => {
        // This test forces us to actually parse the URL, not just pattern-match
        // on the string.
        expect(isGraphicalImage("https://example.com/foo.jpg?q=bar.png")).toBe(
            false,
        );
    });

    it("is false for an image with an unrecognized extension starting with .png", () => {
        expect(isGraphicalImage("https://example.com/foo.pngqxz")).toBe(false);
    });

    it("is false for an image with another extension after .png", () => {
        expect(isGraphicalImage("https://example.com/foo.png.qxz")).toBe(false);
    });
});
