import {
    diffColors,
    getBackgroundColor,
    parseHexColor,
    toClosestMathColor,
} from "./colors";

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

    describe("toClosestMathColor", () => {
        it("says pure red is closest to learning.math.foreground.red", () => {
            expect(toClosestMathColor("#ff0000")).toBe(
                "var(--wb-semanticColor-learning-math-foreground-red)",
            );
        });

        it("says bright orange is closest to learning.math.foreground.gold", () => {
            expect(toClosestMathColor("#ee7700")).toBe(
                "var(--wb-semanticColor-learning-math-foreground-gold)",
            );
        });

        it("says teal is closest to learning.math.foreground.blue", () => {
            expect(toClosestMathColor("#007777")).toBe(
                "var(--wb-semanticColor-learning-math-foreground-blue)",
            );
        });

        it("says gray is closest to learning.math.foreground.gray", () => {
            expect(toClosestMathColor("#777777")).toBe(
                "var(--wb-semanticColor-learning-math-foreground-gray)",
            );
        });

        it("says black is closest to core.foreground.neutral.strong", () => {
            expect(toClosestMathColor("#000000")).toBe(
                "var(--wb-semanticColor-core-foreground-neutral-strong)",
            );
        });
    });

    describe("parseHexColor", () => {
        it("parses #f00 as red", () => {
            expect(parseHexColor("#f00")).toEqual({r: 255, g: 0, b: 0});
        });

        it("parses #0f0 as green", () => {
            expect(parseHexColor("#0f0")).toEqual({r: 0, g: 255, b: 0});
        });

        it("parses #00f as blue", () => {
            expect(parseHexColor("#00f")).toEqual({r: 0, g: 0, b: 255});
        });

        it("parses #f009 as red, discarding the alpha channel", () => {
            expect(parseHexColor("#f009")).toEqual({r: 255, g: 0, b: 0});
        });

        it("parses #ff0000 as red", () => {
            expect(parseHexColor("#ff0000")).toEqual({r: 255, g: 0, b: 0});
        });

        it("parses #00ff00 as green", () => {
            expect(parseHexColor("#00ff00")).toEqual({r: 0, g: 255, b: 0});
        });

        it("parses #0000ff as blue", () => {
            expect(parseHexColor("#0000ff")).toEqual({r: 0, g: 0, b: 255});
        });

        it("parses #ff000099 as red, discarding the alpha channel", () => {
            expect(parseHexColor("#ff000099")).toEqual({r: 255, g: 0, b: 0});
        });
    });
});
