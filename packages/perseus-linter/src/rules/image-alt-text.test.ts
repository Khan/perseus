import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageAltTextRule from "./image-alt-text";

describe("image-alt-text", () => {
    expectWarning(imageAltTextRule, [
        "![](http://google.com/)",
        '![](http://google.com/ "title")',
        "![][url-ref]",
        "![ ](http://google.com/)",
        "![ \t\n ](http://google.com/)", // all whitespace
        "![blah](http://google.com/)", // too short to be meaningful
    ]);

    expectPass(imageAltTextRule, [
        "![alt-text](http://google.com)",
        '![alternative text](http://google.com/ "title")',
        "![alt alt alt][url-ref]",
    ]);
});
