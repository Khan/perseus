import {expectWarning, expectPass} from "../__tests__/test-utils";

import longParagraphRule from "./long-paragraph";

describe("long-paragraph", () => {
    // 299 characters
    const sentence = new Array(25).fill("lorem ipsum").join(" ");

    it("warns about paragraphs over 500 characters", () => {
        expectWarning(longParagraphRule, sentence + sentence);
    });

    it.each([sentence, sentence + "\n\n" + sentence])(
        "longParagraphRule passes with: %s",
        (str: string) => {
            expectPass(longParagraphRule, str);
        },
    );
});
