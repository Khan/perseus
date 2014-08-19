var assert = require("assert");
var _ = require("underscore");

var SimpleMarkdown = require("../simple-markdown.jsx");
var {
    defaultParse,
    defaultOutput
} = SimpleMarkdown;

var validateParse = (parsed, expected) => {
    if (!_.isEqual(parsed, expected)) {
        var parsedStr = JSON.stringify(parsed, null, 4);
        var expectedStr = JSON.stringify(expected, null, 4);
        console.error("Parsed:", parsedStr);
        console.error("Expected:", expectedStr);
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
            validateParse(parsed, [
                {
                    type: "text",
                    content: "hi"
                },
                {
                    type: "newline",
                },
                {
                    type: "text",
                    content: "bye"
                },
                {
                    type: "newline",
                },
                {
                    type: "text",
                    content: "there"
                },
                {
                    type: "newline",
                },
            ]);
        });

        it("should not parse a single newline as a new paragraph", () => {
            var parsed = defaultParse("hi\nbye\nthere\n\n");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "hi"
                    },
                    {
                        type: "newline",
                    },
                    {
                        type: "text",
                        content: "bye"
                    },
                    {
                        type: "newline",
                    },
                    {
                        type: "text",
                        content: "there"
                    },
                ]
            }]);
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
    });
});
