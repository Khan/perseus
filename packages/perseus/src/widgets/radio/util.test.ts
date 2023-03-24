import {getChoiceLetter} from "./util";

describe("getChoiceLetter (in English)", () => {
    it("returns the first 5 letters for most questions", () => {
        expect(getChoiceLetter(0)).toEqual("A");
        expect(getChoiceLetter(1)).toEqual("B");
        expect(getChoiceLetter(2)).toEqual("C");
        expect(getChoiceLetter(3)).toEqual("D");
        expect(getChoiceLetter(4)).toEqual("E");
    });

    it("returns Z as the last letter, then spaces afterwards", () => {
        expect(getChoiceLetter(25)).toEqual("Z");
        for (let i = 26; i < 100; i++) {
            expect(getChoiceLetter(i)).toEqual(" ");
        }
    });
});
