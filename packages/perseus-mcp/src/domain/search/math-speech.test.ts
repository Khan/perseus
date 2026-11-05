import {readsAsItself, speakAll, speakableTex, withCache} from "./math-speech";

describe("speakableTex", () => {
    it("removes color macros and keeps what they color", () => {
        // Arrange, Act
        const tex = speakableTex("\\blue{5} + \\redD{x} = \\color{gray}{7}");

        // Assert
        expect(tex).toBe("{5} + {x} = {7}");
    });

    it("leaves other commands alone", () => {
        // Arrange, Act
        const tex = speakableTex("\\frac{1}{2} + \\sqrt{x}");

        // Assert
        expect(tex).toBe("\\frac{1}{2} + \\sqrt{x}");
    });
});

describe("speakAll", () => {
    it("reads each formula once, without its colors", () => {
        // Arrange
        const speak = (tex: string) => `read ${tex}`;

        // Act
        const readings = speakAll(["\\blue{x^2}", "{x^2}", "y^2"], speak);

        // Assert
        expect(readings).toEqual(["read {x^2}", "read y^2"]);
    });

    it("leaves out formulas the reader can't read", () => {
        // Arrange
        const speak = (tex: string) => {
            if (tex === "bad") {
                throw new Error("can't parse");
            }
            return tex === "empty" ? "" : `read ${tex}`;
        };

        // Act
        const readings = speakAll(["bad", "empty", "ok^2"], speak);

        // Assert
        expect(readings).toEqual(["read ok^2"]);
    });
});

describe("readsAsItself", () => {
    it.each(["12", "-3.5", "1,000", "x", " y "])(
        "is true of %s, a number or a letter",
        (tex) => {
            // Arrange, Act
            const result = readsAsItself(tex);

            // Assert
            expect(result).toBe(true);
        },
    );

    it.each(["x^2", "2x", "\\pi", "ab"])("is false of %s", (tex) => {
        // Arrange, Act
        const result = readsAsItself(tex);

        // Assert
        expect(result).toBe(false);
    });
});

describe("withCache", () => {
    it("reads each formula once", () => {
        // Arrange
        const read: string[] = [];
        const speak = withCache((tex) => {
            read.push(tex);
            return `read ${tex}`;
        });

        // Act
        const readings = [speak("x^2"), speak("x^2"), speak("y^2")];

        // Assert
        expect(readings).toEqual(["read x^2", "read x^2", "read y^2"]);
        expect(read).toEqual(["x^2", "y^2"]);
    });
});
