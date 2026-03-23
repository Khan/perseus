import {graphieImage, isGif, isSvg} from "./utils";

describe("isGif", () => {
    it("should return true if the url ends with .gif", () => {
        expect(isGif("https://example.com/image.gif")).toBe(true);
    });

    it("should return false if the url does not end with .gif", () => {
        expect(isGif("https://example.com/image.png")).toBe(false);
    });

    it("should return false if the .gif is not at the end of the url", () => {
        expect(isGif("https://example.com/image.gif.png")).toBe(false);
    });
});

describe("isSvg", () => {
    it("should return true if the url ends with .svg", () => {
        expect(isSvg("https://example.com/image.svg")).toBe(true);
    });

    it("should return false if the url does not end with .svg", () => {
        expect(isSvg("https://example.com/image.png")).toBe(false);
    });

    it("should return false if the .svg is not at the end of the url", () => {
        expect(isSvg("https://example.svg/image.svg.png")).toBe(false);
    });

    it("should return true for Graphie URLs", () => {
        expect(isSvg(graphieImage.url)).toBe(true);
    });
});
