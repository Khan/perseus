import {expectWarning, expectPass} from "../__tests__/test-utils";

import mathTextEmptyRule from "./math-text-empty";

describe("math-text-empty", () => {
    expectWarning(mathTextEmptyRule, [
        "$x\\text{}y$",
        "$x\\text{ }y$",
        "$x\\text{\n}y$",
        "$x\\text{\t}y$",
    ]);
    it.each(["$x\\text{z}y$"])(
        "mathTextEmptyRule passes with: %s",
        (str: string) => {
            expectPass(mathTextEmptyRule, str);
        },
    );
});
