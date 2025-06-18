import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageUrlEmptyRule from "./image-url-empty";

describe("image-url-empty", () => {
    expectWarning(imageUrlEmptyRule, [
        "![alt-text]()", // empty URL
        "![alt-text](  )", // empty URL with spaces
        "![alt-text](\n)", // empty URL with newline
    ]);
    expectPass(imageUrlEmptyRule, [
        "![alt-text]('something')", // text should pass, though not a valid URL
        "![alt-text]('www.test.com')", // example URL
        "![alt-text](56)", // example number should pass, though not a valid URL
    ]);
});
