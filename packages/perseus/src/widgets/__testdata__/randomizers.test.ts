import {
    arrayOfLength,
    randomBoolean,
    randomElement,
    randomLetter,
    randomSentence,
    randomWord,
} from "./randomizers";

describe("randomizers", () => {
    describe("randomLetter", () => {
        it("returns one letter", () => {
            // can't check for just one character because some non english chars are longer than 1 char
            expect(typeof randomLetter()).toBe("string");
        });
    });

    describe("randomWord", () => {
        it("returns a word of at least 3 letters", () => {
            expect(randomWord().length).toBeGreaterThanOrEqual(3);
        });
    });

    describe("randomSentence", () => {
        it("returns a sentence of at least 5 words", () => {
            expect(randomSentence(10).split(" ").length).toBeGreaterThanOrEqual(
                5,
            );
        });
    });

    describe("randomBoolean", () => {
        it("is true when rateTrue is 1", () => {
            expect(randomBoolean(1)).toEqual(true);
        });
        it("is false when rateTrue is 0", () => {
            expect(randomBoolean(0)).toEqual(false);
        });
    });

    describe("arrayOfLength", () => {
        it("returns an array of the specified length", () => {
            expect(arrayOfLength(3).length).toEqual(3);
            expect(arrayOfLength(12).length).toEqual(12);
        });
    });

    describe("randomElement", () => {
        it("returns one of the input array elements", () => {
            expect([1, 2, 3]).toContain(randomElement([1, 2, 3]));
        });
    });
});
