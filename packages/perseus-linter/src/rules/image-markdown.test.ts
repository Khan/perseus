import {expectWarning, expectPass} from "../__tests__/test-utils";

import imageMarkdownRule from "./image-markdown";

describe("image-markdown", () => {
    // All markdown images (format ![alt](url)) should result in a warning
    // when NOT inside a widget
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
        "![alt alt alt][url-ref]", // Reference image
        "![][url-ref]", // Reference image
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
        "!()[]", // Wrong order
        "[]()", // link markdown, not image
        "[link text](http://google.com)", // link markdown, not image
        "![][", // Incomplete reference image
    ]);

    // Markdown images should pass when inside a widget (e.g., Radio widget)
    expectPass(
        imageMarkdownRule,
        [
            "![](http://google.com/)",
            "![alt text](http://example.com/image.png)",
            "![]()",
            "![ ](http://google.com/)",
            "![blah](http://google.com/)",
        ],
        {
            stack: ["root", "paragraph", "widget", "text", "image"],
        },
    );

    // Additional test to ensure stack checking works correctly
    expectPass(imageMarkdownRule, ["![test image](http://test.com/img.jpg)"], {
        stack: ["widget", "image"],
    });

    expectPass(imageMarkdownRule, ["![test image](http://test.com/img.jpg)"], {
        stack: ["widget"],
    });

    expectWarning(
        imageMarkdownRule,
        ["![test image](http://test.com/img.jpg)"],
        {
            stack: ["image"],
        },
    );
});
