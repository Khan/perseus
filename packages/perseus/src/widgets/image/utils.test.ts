import {parseGIF, decompressFrames} from "gifuct-js";

import {decodeGifFrames, graphieImage, isGif, isSvg} from "./utils";

import type {ParsedFrame} from "gifuct-js";

jest.mock("gifuct-js", () => ({
    parseGIF: jest.fn(),
    decompressFrames: jest.fn(),
}));

// A minimal fake frame from gifuct-js.
// eslint-disable-next-line no-restricted-syntax
const fakeFrame = {
    patch: new Uint8ClampedArray(4), // 1x1 RGBA
    delay: 50,
    dims: {width: 1, height: 1, top: 0, left: 0},
    disposalType: 0,
} as unknown as ParsedFrame;

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

describe("decodeGifFrames", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    //Essentially, we're mocking our functions in decodeGifFrames to return
    //A specific result while still going through the function
    it("returns the decoded frames when the fetch succeeds", async () => {
        // Arrange
        const frames = [fakeFrame, fakeFrame];
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
            }),
        ) as jest.Mock;
        // eslint-disable-next-line no-restricted-syntax
        (parseGIF as jest.Mock).mockReturnValue({});
        // eslint-disable-next-line no-restricted-syntax
        (decompressFrames as jest.Mock).mockReturnValue(frames);

        // Act
        const result = await decodeGifFrames("https://example.com/image.gif");

        // Assert
        expect(result).toBe(frames);
        expect(decompressFrames).toHaveBeenCalledWith({}, true);
    });

    it("returns an empty array when the fetch response is not ok", async () => {
        // Arrange
        // eslint-disable-next-line no-restricted-syntax
        global.fetch = jest.fn(() => Promise.resolve({ok: false})) as jest.Mock;

        // Act
        const result = await decodeGifFrames("https://example.com/image.gif");

        // Assert
        expect(result).toEqual([]);
        expect(parseGIF).not.toHaveBeenCalled();
        expect(decompressFrames).not.toHaveBeenCalled();
    });
});
