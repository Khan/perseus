import {diffColors, getBackgroundColor} from "./colors";

describe("Color Utilities", () => {
    describe("getBackgroundColor", () => {
        let testElement: HTMLDivElement;

        beforeEach(() => {
            testElement = document.createElement("div");
        });

        it("returns the background color of the element if it's not transparent", () => {
            testElement.style.backgroundColor = "rgb(255, 0, 0)"; // Red
            let result = getBackgroundColor(testElement);
            expect(result).toBe("rgb(255, 0, 0)");

            testElement.style.backgroundColor = "green"; // Named color
            result = getBackgroundColor(testElement);
            expect(result).toBe("green");

            testElement.style.backgroundColor = "#0000FF"; // Blue
            result = getBackgroundColor(testElement);
            expect(result).toBe("rgb(0, 0, 255)");
        });

        it("returns a semantic default background color if the element is transparent and has NO parents", () => {
            testElement.style.backgroundColor = "rgba(0, 0, 0, 0)"; // transparent
            let result = getBackgroundColor(testElement);
            expect(result).toBe(
                "var(--wb-semanticColor-core-background-base-default)",
            );

            testElement.style.backgroundColor = "transparent";
            result = getBackgroundColor(testElement);
            expect(result).toBe(
                "var(--wb-semanticColor-core-background-base-default)",
            );
        });

        it("returns a semantic default background color if the element is transparent and its parent is the HTML tag", () => {
            testElement.style.backgroundColor = "rgba(0, 0, 0, 0)"; // transparent
            const htmlElement = document.createElement("html");
            htmlElement.appendChild(testElement);
            let result = getBackgroundColor(testElement);
            expect(result).toBe(
                "var(--wb-semanticColor-core-background-base-default)",
            );

            testElement.style.backgroundColor = "transparent";
            result = getBackgroundColor(testElement);
            expect(result).toBe(
                "var(--wb-semanticColor-core-background-base-default)",
            );
        });

        it("returns the background color of the parent if the element is transparent", () => {
            testElement.style.backgroundColor = "rgba(0, 0, 0, 0)"; // transparent
            const parentElement = document.createElement("div");
            parentElement.style.backgroundColor = "green";
            parentElement.appendChild(testElement);
            const result = getBackgroundColor(testElement);
            expect(result).toBe("green");
        });
    });

    describe("diffColors", () => {
        it("says white is the same as itself", () => {
            const white = {r: 255, g: 255, b: 255};
            expect(diffColors(white, white)).toBe(0);
        });

        it("says black is the same as itself", () => {
            const black = {r: 0, g: 0, b: 0};
            expect(diffColors(black, black)).toBe(0);
        });

        it("says red is the same as itself", () => {
            const red = {r: 255, g: 0, b: 0};
            expect(diffColors(red, red)).toBe(0);
        });

        it("says green is the same as itself", () => {
            const green = {r: 0, g: 255, b: 0};
            expect(diffColors(green, green)).toBe(0);
        });

        it("says blue is the same as itself", () => {
            const blue = {r: 0, g: 0, b: 255};
            expect(diffColors(blue, blue)).toBe(0);
        });

        it("says orange is closer to red than gray", () => {
            const orange = {r: 255, g: 127, b: 0};
            const red = {r: 255, g: 0, b: 0};
            const gray = {r: 127, g: 127, b: 127};
            expect(diffColors(orange, red)).toBeLessThan(
                diffColors(orange, gray),
            );
        });

        it("says very dark red is closer to black than red", () => {
            const darkRed = {r: 10, g: 0, b: 0};
            const red = {r: 255, g: 0, b: 0};
            const black = {r: 0, g: 0, b: 0};
            expect(diffColors(darkRed, black)).toBeLessThan(
                diffColors(darkRed, red),
            );
        });

        it("is commutative", () => {
            const a = {r: 111, g: 222, b: 55};
            const b = {r: 255, g: 30, b: 100};
            expect(diffColors(a, b)).toBe(diffColors(b, a));
        });
    });
});
