import {expectWarning, expectPass} from "../__tests__/test-utils";

import headingSentenceCaseRule from "./heading-sentence-case";

describe("heading-sentence-case", () => {
    expectWarning(headingSentenceCaseRule, [
        "## this heading is uncapitalized",
        "## 'this' heading is uncapitalized",
        "##   this heading is uncapitalized",
    ]);
    expectPass(headingSentenceCaseRule, [
        "## This heading is in sentence case",
        "## 'This heading too'",
        "## 2 + 2 = 4",
    ]);
});
