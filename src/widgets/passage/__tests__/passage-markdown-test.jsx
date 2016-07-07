/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-console, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var assert = require("assert");
var React = require("react");
var _ = require("underscore");

var PassageMarkdown = require("../passage-markdown.jsx");
var parse = PassageMarkdown.parse;
var rules = PassageMarkdown._rulesForTesting;

const validateParse = (parsed, expected) => {
    if (!_.isEqual(parsed, expected)) {
        var parsedStr = JSON.stringify(parsed, null, 4);
        var expectedStr = JSON.stringify(expected, null, 4);
        if (parsedStr === expectedStr) {
            // If these two are the same, there were some different
            // properties that didn't get picked up in JSON.stringify,
            // such as properties with undefined as the value, or with
            // a function as a value.
            // We feebly attempt to display a useful message in this case :(
            parsedStr = "had undefined/function properties";
            expectedStr = "no undefined/function properties";
        }
        throw new Error("Expected:\n" +
            expectedStr +
            "\n\nActual:\n" +
            parsedStr
        );
    }
};

var htmlThroughReact = function(parsed) {
    var output = PassageMarkdown.output(parsed);
    // TODO(emily): Replace this with ReactDOMServer.
    var rawHtml = React.renderToStaticMarkup(
        React.DOM.div(null, output)
    );
    var innerHtml = rawHtml
        .replace(/^<div>/, '')
        .replace(/<\/div>$/, '');
    var simplifiedHtml = innerHtml
        .replace(/>\n*/g, '>')
        .replace(/\n*</g, '<')
        .replace(/\s+/g, ' ');
    return simplifiedHtml;
};

var htmlFromMarkdown = function(source) {
    return htmlThroughReact(parse(source));
};

var assertParsesToReact = function(source, html) {
    var actualHtml = htmlFromMarkdown(source);
    if (actualHtml !== html) {
        console.warn(actualHtml);
        console.warn(html);
    }
    assert.strictEqual(actualHtml, html);
};

describe("passage markdown", () => {
    describe("ref parsing", () => {
        it("should handle a single ref in plain text", () => {
            var parsed = parse("this is a {{ref}}");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "this is a "
                    },
                    {
                        type: "refStart",
                        ref: 1,
                        refContent: [{
                            type: "paragraph",
                            content: [
                                {type: "text", content: "(\u201Cref\u201D"},
                                {type: "text", content: ")"},
                            ]
                        }],
                    },
                    {
                        type: "text",
                        content: "ref"
                    },
                    {
                        type: "refEnd",
                        ref: 1
                    },
                ]
            }]);
        });

        it("should handle nested refs", () => {
            var parsed = parse(
                "This is a {{ref {{inside of another ref}}}}"
            );
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "This is a ",
                    },
                    {
                        type: "refStart",
                        ref: 1,
                        refContent: [{
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "(\u201Cref ",
                                },
                                {
                                    type: "refStart",
                                    ref: null,
                                    refContent: null,
                                },
                                {
                                    type: "text",
                                    content: "inside of another ref"
                                },
                                {
                                    type: "refEnd",
                                    ref: null,
                                },
                                {
                                    type: "text",
                                    content: "\u201D",
                                },
                                {
                                    type: "text",
                                    content: ")",
                                }
                            ],
                        }],
                    },
                    {
                        type: "text",
                        content: "ref ",
                    },
                    {
                        type: "refStart",
                        ref: 2,
                        refContent: [{
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "(\u201C" +
                                        "inside of another ref" +
                                        "\u201D",
                                },
                                {
                                    type: "text",
                                    content: ")",
                                },
                            ],
                        }],
                    },
                    {
                        type: "text",
                        content: "inside of another ref",
                    },
                    {
                        type: "refEnd",
                        ref: 2,
                    },
                    {
                        type: "refEnd",
                        ref: 1,
                    },
                ],
            }]);
        });
    });

    describe("footnote parsing", () => {
        it("should handle a single footnote in plain text", () => {
            var parsed = parse("this is a footnote^");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "this is a footnote"
                    },
                    {
                        type: "passageFootnote",
                        id: 1,
                        text: "*"
                    },
                ]
            }]);
        });

        it("should handle two footnotes in plain text", () => {
            var parsed = parse("a^b^c");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "a"
                    },
                    {
                        type: "passageFootnote",
                        id: 1,
                        text: "1"
                    },
                    {
                        type: "text",
                        content: "b"
                    },
                    {
                        type: "passageFootnote",
                        id: 2,
                        text: "2"
                    },
                    {
                        type: "text",
                        content: "c"
                    },
                ]
            }]);
        });

        it("should handle three footnotes in paragraphs", () => {
            var parsed = parse(
                "para 1 has this footnote^\n\n" +
                "para 2 has two^ more^ footnotes\n\n"
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 1 has this footnote"
                        },
                        {
                            type: "passageFootnote",
                            id: 1,
                            text: "1"
                        },
                    ]
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 2 has two"
                        },
                        {
                            type: "passageFootnote",
                            id: 2,
                            text: "2"
                        },
                        {
                            type: "text",
                            content: " more"
                        },
                        {
                            type: "passageFootnote",
                            id: 3,
                            text: "3"
                        },
                        {
                            type: "text",
                            content: " footnotes"
                        },
                    ]
                }
            ]);
        });
    });

    describe("label parsing", () => {
        it("should parse square labels", () => {
            var parsed = parse(
                "[[1]] Hi\n\n"
            );
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "squareLabel",
                        space: true,
                        content: "1"
                    },
                    {
                        type: "text",
                        content: "Hi"
                    },
                ],
            }]);
        });

        it("should parse circle labels", () => {
            var parsed = parse(
                "((2)) Hi\n\n"
            );
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "circleLabel",
                        space: true,
                        content: "2"
                    },
                    {
                        type: "text",
                        content: "Hi"
                    },
                ],
            }]);
        });

        it("should parse bracket labels", () => {
            var parsed = parse(
                "[3] Hi\n\n"
            );
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "squareBracketRef",
                        space: true,
                        content: "3"
                    },
                    {
                        type: "text",
                        content: "Hi"
                    },
                ],
            }]);
        });
    });

    describe("orders", () => {
        it("should always be numbers", () => {
            _.each(rules, (rule) => {
                assert(
                    typeof rule.order === "number",
                    rule.type + " order was not a number: " + rule.order
                );
            });
        });
    });

    describe("output", () => {
        it("should output some basic formatted passage text", () => {
            assertParsesToReact(
                "This is *some* __passage__ **text**\n\n" +
                "This is paragraph 2",
                '<div class="paragraph">' +
                'This is ' +
                '<em>some</em>' +
                ' ' +
                '<u>passage</u>' +
                ' ' +
                '<strong>text</strong>' +
                '</div>' +
                '<div class="paragraph">' +
                'This is paragraph 2' +
                '</div>'
            );
        });
    });
});

