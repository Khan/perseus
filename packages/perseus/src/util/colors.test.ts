import {getBackgroundColor} from "./colors";

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
                "--wb-semanticColor-core-background-base-default",
            );

            testElement.style.backgroundColor = "transparent";
            result = getBackgroundColor(testElement);
            expect(result).toBe(
                "--wb-semanticColor-core-background-base-default",
            );
        });

        it("returns a semantic default background color if the element is transparent and its parent is the HTML tag", () => {
            testElement.style.backgroundColor = "rgba(0, 0, 0, 0)"; // transparent
            const htmlElement = document.createElement("html");
            htmlElement.appendChild(testElement);
            let result = getBackgroundColor(testElement);
            expect(result).toBe(
                "--wb-semanticColor-core-background-base-default",
            );

            testElement.style.backgroundColor = "transparent";
            result = getBackgroundColor(testElement);
            expect(result).toBe(
                "--wb-semanticColor-core-background-base-default",
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
});
