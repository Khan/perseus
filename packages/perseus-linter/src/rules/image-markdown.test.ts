import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageMarkdownRule from "./image-markdown";

describe("image-alt-text", () => {
    // All markdown images (format ![alt](url)) should result in a warning
    expectWarning(imageMarkdownRule, [
        "![]()",
        "![](  )",
        "![](\n)",
        "![]('something')",
        "![]()",
        "![ ]()",
        "![\n]()",
        "![](http://google.com/)",
        '![](http://google.com/ "title")',
        "![ ](http://google.com/)",
        "![ \t\n ](http://google.com/)",
        "![blah](http://google.com/)",
    ]);

    // Text that does not contain markdown images should pass
    expectPass(imageMarkdownRule, [
        "!",
        "![",
        "![]",
        "![](",
        "[]()",
        "]()",
        "()",
        ")",
        "![alt-text](http://google.com", // No ending paren
        '![alternative text](http://google.com/ "title"', // No ending paren
        "![alt alt alt][url-ref]", // No parens
        "![][url-ref]", // No parens
        "!()[]", // Wrong order
        "[]()", // link markdown, not image
        "[link text](http://google.com)", // link markdown, not image
    ]);
});
