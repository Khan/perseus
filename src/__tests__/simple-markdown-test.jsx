var assert = require("assert");
var nodeUtil = require("util");
var _ = require("underscore");

var SimpleMarkdown = require("../simple-markdown.jsx");
var {
    defaultParse,
    defaultOutput
} = SimpleMarkdown;

// A pretty-printer that handles `undefined` and functions better
// than JSON.stringify
// Important because some AST node fields can be undefined, and
// if those don't show up in the assert output, it can be
// very confusing to figure out how the actual and expected differ
var prettyPrintAST = (ast) => {
    return nodeUtil.inspect(ast, {
        depth: null,
        colors: false
    });
};

var validateParse = (parsed, expected) => {
    if (!_.isEqual(parsed, expected)) {
        var parsedStr = prettyPrintAST(parsed);
        var expectedStr = prettyPrintAST(expected);
        assert.fail(
            parsedStr,
            expectedStr,
            "parsed did not match expected",
            "<>"
        );
    }
};

describe("simple markdown", () => {
    describe("parser", () => {
        it("should parse a plain string", () => {
            var parsed = defaultParse("hi there");
            validateParse(parsed, [{
                type: "text",
                content: "hi there"
            }]);
        });

        it("should parse bold", () => {
            var parsed = defaultParse("**hi**");
            validateParse(parsed, [{
                type: "strong",
                content: [{
                    type: "text",
                    content: "hi"
                }]
            }]);
        });

        it("should parse italics", () => {
            var parsed = defaultParse("*hi*");
            validateParse(parsed, [{
                type: "em",
                content: [{
                    type: "text",
                    content: "hi"
                }]
            }]);
        });

        it("should parse strikethrough", () => {
            var parsed = defaultParse("~~hi~~");
            validateParse(parsed, [{
                type: "del",
                content: [{
                    type: "text",
                    content: "hi"
                }]
            }]);

            // not super important that it parses this like this, but
            // it should be a valid something...
            var parsed2 = defaultParse("~~~~~");
            validateParse(parsed2, [{
                type: "del",
                content: [{
                    type: "text",
                    content: "~"
                }]
            }]);
        });

        it("should parse underlines", () => {
            var parsed = defaultParse("__hi__");
            validateParse(parsed, [{
                type: "u",
                content: [{
                    type: "text",
                    content: "hi"
                }]
            }]);
        });

        it("should parse nested bold/italics", () => {
            var parsed = defaultParse("***hi***");
            validateParse(parsed, [{
                type: "strong",
                content: [{
                    type: "em",
                    content: [{
                        type: "text",
                        content: "hi"
                    }]
                }]
            }]);
        });

        it("should parse nested bold/italics/underline", () => {
            var parsed1 = defaultParse("***__hi__***");
            validateParse(parsed1, [{
                type: "strong",
                content: [{
                    type: "em",
                    content: [{
                        type: "u",
                        content: [{
                            type: "text",
                            content: "hi"
                        }]
                    }]
                }]
            }]);

            var parsed2 = defaultParse("*__**hi**__*");
            validateParse(parsed2, [{
                type: "em",
                content: [{
                    type: "u",
                    content: [{
                        type: "strong",
                        content: [{
                            type: "text",
                            content: "hi"
                        }]
                    }]
                }]
            }]);
        });

        it("should parse multiple bold/italics/underlines", () => {
            var parsed = defaultParse(
                "*some* of this __sentence__ is **bold**"
            );
            validateParse(parsed, [
                {
                    type: "em",
                    content: [{
                        type: "text",
                        content: "some"
                    }]
                },
                {
                    type: "text",
                    content: " of this "
                },
                {
                    type: "u",
                    content: [{
                        type: "text",
                        content: "sentence"
                    }]
                },
                {
                    type: "text",
                    content: " is "
                },
                {
                    type: "strong",
                    content: [{
                        type: "text",
                        content: "bold"
                    }]
                }
            ]);
        });

        it("should parse inline code", () => {
            var parsed = defaultParse("`hi`");
            validateParse(parsed, [{
                type: "inlineCode",
                content: "hi"
            }]);
        });

        it("should parse * and _ inside `` as code", () => {
            var parsed = defaultParse(
                "`const int * const * const p; // _hi_`"
            );
            validateParse(parsed, [{
                type: "inlineCode",
                content: "const int * const * const p; // _hi_"
            }]);
        });

        it("should allow you to escape special characters with \\", () => {
            var parsed = defaultParse(
                "\\`hi\\` \\*bye\\* \\~\\|\\<\\[\\{"
            );
            validateParse(parsed, [
                { type: "text", content: "`" },
                { type: "text", content: "hi" },
                { type: "text", content: "`" },
                { type: "text", content: " " },
                { type: "text", content: "*" },
                { type: "text", content: "bye" },
                { type: "text", content: "*" },
                { type: "text", content: " " },
                { type: "text", content: "~" },
                { type: "text", content: "|" },
                { type: "text", content: "<" },
                { type: "text", content: "[" },
                { type: "text", content: "{" },
            ]);

            var parsed2 = defaultParse(
                "hi\\^caret"
            );
            validateParse(parsed2, [
                { type: "text", content: "hi" },
                { type: "text", content: "^" },
                { type: "text", content: "caret" },
            ]);
        });

        it("should parse basic []() links as links", () => {
            var parsed = defaultParse("[hi](http://www.google.com)");
            validateParse(parsed, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "hi"
                }],
                target: "http://www.google.com",
                title: undefined
            }]);

            var parsed2 = defaultParse("[secure](https://www.google.com)");
            validateParse(parsed2, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "secure"
                }],
                target: "https://www.google.com",
                title: undefined
            }]);

            var parsed3 = defaultParse(
                "[local](http://localhost:9000/test.html)"
            );
            validateParse(parsed3, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "local"
                }],
                target: "http://localhost:9000/test.html",
                title: undefined
            }]);

            var parsed4 = defaultParse(
                "[params](http://localhost:9000/test.html" +
                "?content=%7B%7D&format=pretty)"
            );
            validateParse(parsed4, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "params"
                }],
                target: "http://localhost:9000/test.html" +
                        "?content=%7B%7D&format=pretty",
                title: undefined
            }]);

            var parsed5 = defaultParse(
                "[hash](http://localhost:9000/test.html#content=%7B%7D)"
            );
            validateParse(parsed5, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "hash"
                }],
                target: "http://localhost:9000/test.html#content=%7B%7D",
                title: undefined
            }]);
        });

        it("should not parse \\[s as links", () => {
            var parsed = defaultParse("\\[hi](http://www.google.com)");
            validateParse(parsed, [
                {content: "[", type: "text"},
                {content: "hi", type: "text"},
                {content: "]", type: "text"},
                {content: "(http", type: "text"},
                {content: ":", type: "text"},
                {content: "/", type: "text"},
                {content: "/www", type: "text"},
                {content: ".google", type: "text"},
                {content: ".com", type: "text"},
                {content: ")", type: "text"},
            ]);
        });

        it("should parse basic <autolinks>", () => {
            var parsed = defaultParse("<http://www.google.com>");
            validateParse(parsed, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://www.google.com"
                }],
                target: "http://www.google.com"
            }]);

            var parsed2 = defaultParse("<https://www.google.com>");
            validateParse(parsed2, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "https://www.google.com"
                }],
                target: "https://www.google.com"
            }]);

            var parsed3 = defaultParse("<http://localhost:9000/test.html>");
            validateParse(parsed3, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://localhost:9000/test.html"
                }],
                target: "http://localhost:9000/test.html"
            }]);

            var parsed4 = defaultParse(
                "<http://localhost:9000/test.html" +
                "?content=%7B%7D&format=pretty>"
            );
            validateParse(parsed4, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://localhost:9000/test.html" +
                            "?content=%7B%7D&format=pretty"
                }],
                target: "http://localhost:9000/test.html" +
                        "?content=%7B%7D&format=pretty"
            }]);

            var parsed5 = defaultParse(
                "<http://localhost:9000/test.html#content=%7B%7D>"
            );
            validateParse(parsed5, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://localhost:9000/test.html#content=%7B%7D"
                }],
                target: "http://localhost:9000/test.html#content=%7B%7D"
            }]);
        });

        it("should parse basic <mailto@autolinks>", () => {
            var parsed = defaultParse("<test@example.com>");
            validateParse(parsed, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "test@example.com"
                }],
                target: "mailto:test@example.com"
            }]);

            var parsed2 = defaultParse("<test+ext@example.com>");
            validateParse(parsed2, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "test+ext@example.com"
                }],
                target: "mailto:test+ext@example.com"
            }]);

            var parsed3 = defaultParse("<mailto:test@example.com>");
            validateParse(parsed3, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "test@example.com"
                }],
                target: "mailto:test@example.com"
            }]);
        });

        it("should parse basic freeform urls", () => {
            var parsed = defaultParse("http://www.google.com");
            validateParse(parsed, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://www.google.com"
                }],
                target: "http://www.google.com"
            }]);

            var parsed2 = defaultParse("https://www.google.com");
            validateParse(parsed2, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "https://www.google.com"
                }],
                target: "https://www.google.com"
            }]);

            var parsed3 = defaultParse("http://example.com/test.html");
            validateParse(parsed3, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://example.com/test.html"
                }],
                target: "http://example.com/test.html"
            }]);

            var parsed4 = defaultParse(
                "http://example.com/test.html" +
                "?content=%7B%7D&format=pretty"
            );
            validateParse(parsed4, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://example.com/test.html" +
                            "?content=%7B%7D&format=pretty"
                }],
                target: "http://example.com/test.html" +
                        "?content=%7B%7D&format=pretty"
            }]);

            var parsed5 = defaultParse(
                "http://example.com/test.html#content=%7B%7D"
            );
            validateParse(parsed5, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "http://example.com/test.html#content=%7B%7D"
                }],
                target: "http://example.com/test.html#content=%7B%7D"
            }]);
        });

        it("should parse [reflinks][and their targets]", () => {
            var parsed = defaultParse(
                "[Google][1]\n\n" +
                "[1]: http://www.google.com\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);

            var parsed2 = defaultParse(
                "[1]: http://www.google.com\n\n" +
                "[Google][1]\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
            ]);
        });

        it("should parse inline link titles", () => {
            var parsed = defaultParse(
                "[Google](http://www.google.com \"This is google!\")"
            );
            validateParse(parsed, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "Google"
                }],
                target: "http://www.google.com",
                title: "This is google!"
            }]);

            var parsed2 = defaultParse(
                "[Google](http://www.google.com \"still Google\")"
            );
            validateParse(parsed2, [{
                type: "link",
                content: [{
                    type: "text",
                    content: "Google"
                }],
                target: "http://www.google.com",
                title: "still Google"
            }]);
        });

        it("should parse reflink titles", () => {
            var parsed = defaultParse(
                "[Google][1]\n\n" +
                "[1]: http://www.google.com (This is google!)\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: "This is google!"
                    }]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: "This is google!"
                },
            ]);

            var parsed2 = defaultParse(
                "[1]: http://www.google.com \"still Google\"\n\n" +
                "[Google][1]\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: "still Google"
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: "still Google"
                    }]
                },
            ]);
        });

        it("should parse [reflinks][] with implicit targets", () => {
            var parsed = defaultParse(
                "[Google][]\n\n" +
                "[Google]: http://www.google.com\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);

            var parsed2 = defaultParse(
                "[Google]: http://www.google.com\n\n" +
                "[Google][]\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
            ]);
        });

        it("should handle multiple [reflinks][to the same target]", () => {
            var parsed = defaultParse(
                "[Google][1] [Yahoo][1]\n\n" +
                "[1]: http://www.google.com\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [{
                                type: "text",
                                content: "Google"
                            }],
                            target: "http://www.google.com",
                            title: undefined
                        },
                        {
                            type: "text",
                            content: " "
                        },
                        {
                            type: "link",
                            content: [{
                                type: "text",
                                content: "Yahoo"
                            }],
                            target: "http://www.google.com",
                            title: undefined
                        },
                    ]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);

            // This is sort of silly, but the last def overrides all previous
            // links. This is just a test that things are continuing to work
            // as we currently expect them to, but I seriously hope no one
            // writes markdown like this!
            var parsed2 = defaultParse(
                "[test][1]\n\n" +
                "[1]: http://google.com\n\n" +
                "[test2][1]\n\n" +
                "[1]: http://khanacademy.org\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "test"
                        }],
                        target: "http://khanacademy.org",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://google.com",
                    title: undefined
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "test2"
                        }],
                        target: "http://khanacademy.org",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://khanacademy.org",
                    title: undefined
                },
            ]);
        });

        it("should parse basic images", () => {
            var parsed = defaultParse("![](http://example.com/test.png)");
            validateParse(parsed, [{
                type: "image",
                alt: "",
                target: "http://example.com/test.png",
                title: undefined
            }]);

            var parsed2 = defaultParse("![aaalt](http://example.com/image)");
            validateParse(parsed2, [{
                type: "image",
                alt: "aaalt",
                target: "http://example.com/image",
                title: undefined
            }]);

            var parsed3 = defaultParse(
                "![](http://localhost:9000/test.html \"local\")"
            );
            validateParse(parsed3, [{
                type: "image",
                alt: "",
                target: "http://localhost:9000/test.html",
                title: "local"
            }]);

            var parsed4 = defaultParse(
                "![p](http://localhost:9000/test" +
                "?content=%7B%7D&format=pretty \"params\")"
            );
            validateParse(parsed4, [{
                type: "image",
                alt: "p",
                target: "http://localhost:9000/test" +
                        "?content=%7B%7D&format=pretty",
                title: "params"
            }]);

            var parsed5 = defaultParse(
                "![hash](http://localhost:9000/test.png#content=%7B%7D)"
            );
            validateParse(parsed5, [{
                type: "image",
                alt: "hash",
                target: "http://localhost:9000/test.png#content=%7B%7D",
                title: undefined
            }]);
        });

        it("should parse [refimages][and their targets]", () => {
            var parsed = defaultParse(
                "![aaalt][1]\n\n" +
                "[1]: http://example.com/test.gif\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "image",
                        alt: "aaalt",
                        target: "http://example.com/test.gif",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://example.com/test.gif",
                    title: undefined
                },
            ]);

            var parsed2 = defaultParse(
                "[image]: http://example.com/test.gif\n\n" +
                "![image][]\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: undefined
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "image",
                        alt: "image",
                        target: "http://example.com/test.gif",
                        title: undefined
                    }]
                },
            ]);

            var parsed3 = defaultParse(
                "[image]: http://example.com/test.gif \"title!\"\n\n" +
                "![image][]\n\n"
            );
            validateParse(parsed3, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: "title!"
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "image",
                        alt: "image",
                        target: "http://example.com/test.gif",
                        title: "title!"
                    }]
                },
            ]);

            var parsed3 = defaultParse(
                "[image]: http://example.com/test.gif (*title text*)\n\n" +
                "![image][]\n\n"
            );
            validateParse(parsed3, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: "*title text*"
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "image",
                        alt: "image",
                        target: "http://example.com/test.gif",
                        title: "*title text*"
                    }]
                },
            ]);
        });



        it("should compare defs case- and whitespace-insensitively", () => {
            var parsed = defaultParse(
                "[Google][HiIiI]\n\n" +
                "[HIiii]: http://www.google.com\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "hiiii",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);

            var parsed2 = defaultParse(
                "[Google][]\n\n" +
                "[google]: http://www.google.com\n\n"
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);

            var parsed3 = defaultParse(
                "[Google][ h    i ]\n\n" +
                "[  h i   ]: http://www.google.com\n\n"
            );
            validateParse(parsed3, [
                {
                    type: "paragraph",
                    content: [{
                        type: "link",
                        content: [{
                            type: "text",
                            content: "Google"
                        }],
                        target: "http://www.google.com",
                        title: undefined
                    }]
                },
                {
                    type: "def",
                    def: " h i ",
                    target: "http://www.google.com",
                    title: undefined
                },
            ]);
        });

        it("should parse a single top-level paragraph", () => {
            var parsed = defaultParse("hi\n\n");
            validateParse(parsed, [{
                type: "paragraph",
                content: [{
                    type: "text",
                    content: "hi"
                }]
            }]);
        });

        it("should parse multiple top-level paragraphs", () => {
            var parsed = defaultParse("hi\n\nbye\n\nthere\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "hi"
                    }]
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "bye"
                    }]
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "there"
                    }]
                },
            ]);
        });

        it("should not parse single newlines as paragraphs", () => {
            var parsed = defaultParse("hi\nbye\nthere\n");
            validateParse(parsed, [{
                type: "text",
                content: "hi\nbye\nthere\n"
            }]);
        });

        it("should not parse a single newline as a new paragraph", () => {
            var parsed = defaultParse("hi\nbye\nthere\n\n");
            validateParse(parsed, [{
                type: "paragraph",
                content: [{
                    type: "text",
                    content: "hi\nbye\nthere"
                }]
            }]);
        });

        it("should parse a single heading", () => {
            var parsed = defaultParse("### heading3\n\n");
            validateParse(parsed, [{
                type: "heading",
                level: 3,
                content: [{
                    type: "text",
                    content: "heading3"
                }]
            }]);
        });

        it("should parse a single lheading", () => {
            var parsed = defaultParse("heading2\n-----\n\n");
            validateParse(parsed, [{
                type: "heading",
                level: 2,
                content: [{
                    type: "text",
                    content: "heading2"
                }]
            }]);
        });

        it("should not parse a single lheading with two -- or ==", () => {
            var parsed = defaultParse("heading1\n==\n\n");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "heading1\n"},
                    {type: "text", content: "="},
                    {type: "text", content: "="},
                ]
            }]);

            var parsed2 = defaultParse("heading2\n--\n\n");
            validateParse(parsed2, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "heading2\n"},
                    {type: "text", content: "-"},
                    {type: "text", content: "-"},
                ]
            }]);
        });

        it("should not parse 7 #s as an h7", () => {
            var parsed = defaultParse("#######heading7\n\n");
            validateParse(parsed, [{
                type: "heading",
                level: 6,
                content: [{
                    type: "text",
                    content: "#heading7"
                }]
            }]);
        });

        it("should parse a heading between paragraphs", () => {
            var parsed = defaultParse(
                "para 1\n\n" +
                "#heading\n\n\n" +
                "para 2\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 1"
                    }]
                },
                {
                    type: "heading",
                    level: 1,
                    content: [{
                        type: "text",
                        content: "heading"
                    }]
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 2"
                    }]
                },
            ]);
        });

        it("should parse a single top-level blockquote", () => {
            var parsed = defaultParse("> blockquote\n\n");
            validateParse(parsed, [{
                type: "blockQuote",
                content: [{
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "blockquote"
                    }],
                }]
            }]);
        });

        it("should parse multiple blockquotes and paragraphs", () => {
            var parsed = defaultParse(
                "para 1\n\n" +
                "> blockquote 1\n" +
                ">\n" +
                ">blockquote 2\n\n" +
                "para 2\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 1"
                    }],
                },
                {
                    type: "blockQuote",
                    content: [
                        {
                            type: "paragraph",
                            content: [{
                                type: "text",
                                content: "blockquote 1"
                            }],
                        },
                        {
                            type: "paragraph",
                            content: [{
                                type: "text",
                                content: "blockquote 2"
                            }],
                        }
                    ]
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 2"
                    }],
                },
            ]);
        });

        it("should parse a single top-level code block", () => {
            var parsed = defaultParse("    if (true) { code(); }\n\n");
            validateParse(parsed, [{
                type: "codeBlock",
                content: "if (true) { code(); }"
            }]);
        });

        it("should parse mixed paragraphs and code", () => {
            var parsed = defaultParse(
                "this is regular text\n\n" +
                "    this is code\n\n" +
                "this is more regular text\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "this is regular text"
                    }]
                },
                {
                    type: "codeBlock",
                    content: "this is code"
                },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "this is more regular text"
                    }]
                },
            ]);
        });

        it("should parse top-level horizontal rules", () => {
            var parsed = defaultParse(
                "---\n" +
                "***\n" +
                "___\n\n" +
                " - - - - \n\n" +
                "_ _ _\n\n" +
                "  ***  \n\n"
            );
            validateParse(parsed, [
                { type: "hr" },
                { type: "hr" },
                { type: "hr" },
                { type: "hr" },
                { type: "hr" },
                { type: "hr" },
            ]);
        });

        it("should parse hrs between paragraphs", () => {
            var parsed = defaultParse(
                "para 1\n\n" +
                " * * * \n\n" +
                "para 2\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 1"
                    }]
                },
                { type: "hr" },
                {
                    type: "paragraph",
                    content: [{
                        type: "text",
                        content: "para 2"
                    }]
                },
            ]);
        });

        it("should parse simple unordered lists", () => {
            var parsed = defaultParse(
                " * hi\n" +
                " * bye\n" +
                " * there\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: false,
                items: [
                    [{
                        type: "text",
                        content: "hi\n",
                    }],
                    [{
                        type: "text",
                        content: "bye\n",
                    }],
                    [{
                        type: "text",
                        content: "there",
                    }],
                ]
            }]);
        });

        it("should parse simple ordered lists", () => {
            var parsed = defaultParse(
                "1. first\n" +
                "2. second\n" +
                "3. third\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: true,
                items: [
                    [{
                        type: "text",
                        content: "first\n",
                    }],
                    [{
                        type: "text",
                        content: "second\n",
                    }],
                    [{
                        type: "text",
                        content: "third",
                    }],
                ]
            }]);
        });

        it("should parse simple ordered lists with silly numbers", () => {
            var parsed = defaultParse(
                "1. first\n" +
                "13. second\n" +
                "9. third\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: true,
                items: [
                    [{
                        type: "text",
                        content: "first\n",
                    }],
                    [{
                        type: "text",
                        content: "second\n",
                    }],
                    [{
                        type: "text",
                        content: "third",
                    }],
                ]
            }]);
        });

        it("should parse nested lists", () => {
            var parsed = defaultParse(
                "1. first\n" +
                "2. second\n" +
                "   * inner\n" +
                "   * inner\n" +
                "3. third\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: true,
                items: [
                    [{
                        type: "text",
                        content: "first\n",
                    }],
                    [
                        {
                            type: "text",
                            content: "second\n",
                        },
                        {
                            type: "list",
                            ordered: false,
                            items: [
                                [{
                                    type: "text",
                                    content: "inner\n"
                                }],
                                [{
                                    type: "text",
                                    content: "inner"
                                }]
                            ]
                        }
                    ],
                    [{
                        type: "text",
                        content: "third",
                    }],
                ]
            }]);
        });

        it("should parse loose lists", () => {
            var parsed = defaultParse(
                " * hi\n\n" +
                " * bye\n\n" +
                " * there\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: false,
                items: [
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "hi"
                        }]
                    }],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "bye"
                        }]
                    }],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "there"
                        }]
                    }],
                ]
            }]);
        });

        it("should parse paragraphs within loose lists", () => {
            var parsed = defaultParse(
                " * hi\n\n" +
                "   hello\n\n" +
                " * bye\n\n" +
                " * there\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: false,
                items: [
                    [
                        {
                            type: "paragraph",
                            content: [{
                                type: "text",
                                content: "hi"
                            }]
                        },
                        {
                            type: "paragraph",
                            content: [{
                                type: "text",
                                content: "hello"
                            }]
                        },
                    ],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "bye"
                        }]
                    }],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "there"
                        }]
                    }],
                ]
            }]);
        });

        it("should allow line breaks+wrapping in tight lists", () => {
            var parsed = defaultParse(
                " * hi\n" +
                "   hello\n\n" +
                " * bye\n\n" +
                " * there\n\n"
            );
            validateParse(parsed, [{
                type: "list",
                ordered: false,
                items: [
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "hi\nhello"
                        }]
                    }],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "bye"
                        }]
                    }],
                    [{
                        type: "paragraph",
                        content: [{
                            type: "text",
                            content: "there"
                        }]
                    }],
                ]
            }]);
        });

        it("should parse very simple tables", () => {
            var expected = [{
                type: "table",
                header: [
                    [{type: "text", content: "h1"}],
                    [{type: "text", content: "h2"}],
                    [{type: "text", content: "h3"}]
                ],
                align: [null, null, null],
                cells: [
                    [
                        [{type: "text", content: "d1"}],
                        [{type: "text", content: "d2"}],
                        [{type: "text", content: "d3"}]
                    ],
                    [
                        [{type: "text", content: "e1"}],
                        [{type: "text", content: "e2"}],
                        [{type: "text", content: "e3"}]
                    ]
                ]
            }];

            var parsedPiped = defaultParse(
                "| h1 | h2 | h3 |\n" +
                "| -- | -- | -- |\n" +
                "| d1 | d2 | d3 |\n" +
                "| e1 | e2 | e3 |\n" +
                "\n"
            );
            validateParse(parsedPiped, expected);

            var parsedNp = defaultParse(
                "h1 | h2 | h3\n" +
                "- | - | -\n" +
                "d1 | d2 | d3\n" +
                "e1 | e2 | e3\n" +
                "\n"
            );
            validateParse(parsedNp, expected);
        });

        it("should parse inside table contents", () => {
            var expected = [{
                type: "table",
                header: [
                    [{type: "em", content: [{type: "text", content: "h1"}]}],
                    [{type: "em", content: [{type: "text", content: "h2"}]}],
                    [{type: "em", content: [{type: "text", content: "h3"}]}],
                ],
                align: [null, null, null],
                cells: [[
                    [{type: "em", content: [{type: "text", content: "d1"}]}],
                    [{type: "em", content: [{type: "text", content: "d2"}]}],
                    [{type: "em", content: [{type: "text", content: "d3"}]}],
                ]]
            }];

            var parsedPiped = defaultParse(
                "| *h1* | *h2* | *h3* |\n" +
                "| ---- | ---- | ---- |\n" +
                "| *d1* | *d2* | *d3* |\n" +
                "\n"
            );
            validateParse(parsedPiped, expected);

            var parsedNp = defaultParse(
                "*h1* | *h2* | *h3*\n" +
                "-|-|-\n" +
                "*d1* | *d2* | *d3*\n" +
                "\n"
            );
            validateParse(parsedNp, expected);
        });

        it("should parse table alignments", () => {
            var validateAligns = (tableSrc, expectedAligns) => {
                var parsed = defaultParse(tableSrc + "\n");
                assert.strictEqual(parsed[0].type, "table");
                var actualAligns = parsed[0].align;
                validateParse(actualAligns, expectedAligns);
            };

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                "| -- | -- | -- |\n" +
                "| d1 | d2 | d3 |\n",
                [null, null, null]
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                "|:--:|:-: | :-: |\n" +
                "| d1 | d2 | d3 |\n",
                ["center", "center", "center"]
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                "| :- |:---| :--|\n" +
                "| d1 | d2 | d3 |\n",
                ["left", "left", "left"]
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                "| -: |-:  |  -:|\n" +
                "| d1 | d2 | d3 |\n",
                ["right", "right", "right"]
            );

            validateAligns(
                "h1 | h2 | h3\n" +
                ":-|:-:|-:\n" +
                "d1 | d2 | d3\n",
                ["left", "center", "right"]
            );

            validateAligns(
                "h1 | h2 | h3\n" +
                " :---:  |:--|    --:\n" +
                "d1 | d2 | d3\n",
                ["center", "left", "right"]
            );
        });

        it("should be able to parse <br>s", () => {
            // Inside a paragraph:
            var parsed = defaultParse("hi  \nbye\n\n");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    { content: "hi", type: "text" },
                    { type: "br" },
                    { content: "bye", type: "text" },
                ]
            }]);

            // Outside a paragraph:
            var parsed2 = defaultParse("hi  \nbye");
            validateParse(parsed2, [
                { content: "hi", type: "text" },
                { type: "br" },
                { content: "bye", type: "text" },
            ]);

            // But double spaces on the same line shouldn't count:
            var parsed3 = defaultParse("hi  bye");
            validateParse(parsed3, [
                { content: "hi  bye", type: "text" },
            ]);
        });
    });
});
