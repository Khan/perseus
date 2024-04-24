import {mockStrings} from "../../strings";

import {getChoiceLetter} from "./util";

describe("getChoiceLetter (in English)", () => {
    it("returns the first 5 letters for most questions", () => {
        expect(getChoiceLetter(0, mockStrings)).toEqual("A");
        expect(getChoiceLetter(1, mockStrings)).toEqual("B");
        expect(getChoiceLetter(2, mockStrings)).toEqual("C");
        expect(getChoiceLetter(3, mockStrings)).toEqual("D");
        expect(getChoiceLetter(4, mockStrings)).toEqual("E");
    });

    it("returns Z as the last letter, then spaces afterwards", () => {
        expect(getChoiceLetter(25, mockStrings)).toEqual("Z");
        for (let i = 26; i < 100; i++) {
            expect(getChoiceLetter(i, mockStrings)).toEqual(" ");
        }
    });
});
