import {expectWarning, expectPass} from "../__tests__/test-utils";

import headingSentenceCaseRule from "./heading-sentence-case";

describe("heading-sentence-case", () => {
    it.each([
        "## this heading is uncapitalized",
        "## 'this' heading is uncapitalized",
        "##   this heading is uncapitalized",
    ])("headingSentenceCaseRule warns with: %s", (str: string) => {
        expectWarning(headingSentenceCaseRule, str);
    });

    it.each([
        "## This heading is in sentence case",
        "## 'This heading too'",
        "## 2 + 2 = 4",
    ])("headingSentenceCaseRule passes with: %s", (str: string) => {
        expectPass(headingSentenceCaseRule, str);
    });
});
