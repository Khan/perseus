import {expectWarning, expectPass} from "../__tests__/test-utils";

import nestedListsRule from "./nested-lists";

describe("nested-lists", () => {
    it.each(["1. outer\n  * nested\n  *nested", " + outer\n\n   1. nested"])(
        "nestedListsRule warns with: %s",
        (str: string) => {
            expectWarning(nestedListsRule, str);
        },
    );

    it.each([
        "-one\n-two\n-three",
        "1. one\n 2. two\n3. three",
        " * one\n\n * two\n\n * three",
    ])("nestedListsRule passes with: %s", (str: string) => {
        expectPass(nestedListsRule, str);
    });
});
