/** @jsx React.DOM */

var assert = require("assert");
var nodeUtil = require("util");
var _ = require("underscore");

var PerseusMarkdown = require("../perseus-markdown.jsx");
var parse = PerseusMarkdown.parse;

// TODO(aria): Don't duplicate these two methods from simple-markdown:

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

describe("perseus markdown", () => {
    describe("parser", () => {
        it("should parse math", () => {
            var parsed = parse("$y = x + 1$");
            validateParse(parsed, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: "y = x + 1"
                }]
            }]);

            var parsed2 = parse("hi $y = x + 1$ there");
            validateParse(parsed2, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "hi "},
                    {type: "math", content: "y = x + 1"},
                    {type: "text", content: " there"},
                ]
            }]);
        });

        it("should parse nested math", () => {
            var parsed = parse("$y = \\text{$x + 1$}$");
            validateParse(parsed, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: "y = \\text{$x + 1$}"
                }]
            }]);

            var parsed2 = parse(
                "$ x^2 \\text{blah $math \\text{something $more math$} $ } $"
            );
            validateParse(parsed2, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: " x^2 \\text{blah $math " +
                        "\\text{something $more math$} $ } "
                }]
            }]);
        });

        it("should allow escaping in math", () => {
            var parsed = parse("$\\\\$");
            validateParse(parsed, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: "\\\\"
                }]
            }]);

            var parsed2 = parse("$\\$$");
            validateParse(parsed2, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: "\\$"
                }]
            }]);

            var parsed3 = parse("${$");
            validateParse(parsed3, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "$"},
                    {type: "text", content: "{"},
                    {type: "text", content: "$"},
                ]
            }]);

            var parsed4 = parse("$\\{$");
            validateParse(parsed4, [{
                type: "paragraph",
                content: [{
                    type: "math",
                    content: "\\{"
                }]
            }]);

            var parsed4 = parse("hello $ escaped dollar \\$ $ not math");
            validateParse(parsed4, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "hello "},
                    {type: "math", content: " escaped dollar \\$ "},
                    {type: "text", content: " not math"},
                ]
            }]);
        });

        it("should break on paragraphs", () => {
            var parsed = parse("hello $ single dollar");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "hello "},
                    {type: "text", content: "$ single dollar"},
                ]
            }]);

            var parsed2 = parse(
                "hello $ single dollar paragraph\n\n not math"
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {type: "text", content: "hello "},
                        {type: "text", content: "$ single dollar paragraph"},
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {type: "text", content: " not math"},
                    ]
                },
            ]);

            var parsed3 = parse("hello $ bad { math $");
            validateParse(parsed3, [{
                type: "paragraph",
                content: [
                    {type: "text", content: "hello "},
                    {type: "text", content: "$ bad "},
                    {type: "text", content: "{ math "},
                    {type: "text", content: "$"},
                ]
            }]);

        });
    });
});
