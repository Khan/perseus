import {expectWarning, expectPass} from "../__tests__/test-utils";

import nestedListsRule from "./nested-lists";

describe("nested-lists", () => {
    expectWarning(nestedListsRule, [
        "1. outer\n  * nested\n  *nested",
        " + outer\n\n   1. nested",
    ]);
    expectPass(nestedListsRule, [
        "-one\n-two\n-three",
        "1. one\n 2. two\n3. three",
        " * one\n\n * two\n\n * three",
    ]);
});
