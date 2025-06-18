import {expectWarning, expectPass} from "../__tests__/test-utils";

import longParagraphRule from "./long-paragraph";

describe("long-paragraph", () => {
    // 299 characters
    const sentence = new Array(25).fill("lorem ipsum").join(" ");

    // long-paragraph rule warns about paragraphs over 500 characters
    expectWarning(longParagraphRule, sentence + sentence);
    expectPass(longParagraphRule, [sentence, sentence + "\n\n" + sentence]);
});
