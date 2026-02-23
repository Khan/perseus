import {isGif} from "./utils";

describe("isGif", () => {
    it("should return true if the url ends with .gif", () => {
        expect(isGif("https://example.com/image.gif")).toBe(true);
    });

    it("should return false if the url does not end with .gif", () => {
        expect(isGif("https://example.com/image.png")).toBe(false);
    });
});
