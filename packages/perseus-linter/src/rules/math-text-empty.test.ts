import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathTextEmptyRule from "./math-text-empty";

describe("math-text-empty", () => {
    it.each([
        "$x\\text{}y$",
        "$x\\text{ }y$",
        "$x\\text{\n}y$",
        "$x\\text{\t}y$",
    ])("mathTextEmptyRule warns with: %s", (str: string) => {
        expectWarning(mathTextEmptyRule, str);
    });

    it("passes for non-empty text in math", () => {
        expectPass(mathTextEmptyRule, "$x\\text{z}y$");
    });
});
