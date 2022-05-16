/* eslint-disable no-var, no-unused-vars, no-console, import/no-commonjs, no-redeclare, no-useless-escape */
// @flow
/* @ts-check */
import {render} from "@testing-library/react";

// As of 2019-11-03, flow doesn't have definitions for assert.strict:
// https://github.com/facebook/flow/pull/7660
// So we use a /*::*/ hack to satisfy flow:
import SimpleMarkdown from "../index.js";

var assert = require("assert") /*:: || {} */.strict;

var React = require("react");
var ReactDOMServer = require("react-dom/server");

var inlineParse = SimpleMarkdown.defaultInlineParse;
var blockParse = SimpleMarkdown.defaultBlockParse;
var implicitParse = SimpleMarkdown.defaultImplicitParse;
var defaultReactOutput = SimpleMarkdown.defaultReactOutput;
var defaultHtmlOutput = SimpleMarkdown.defaultHtmlOutput;

/*:: // Flow definitions & hackery

var FLOW_IGNORE_COVARIANCE = {
  console: {
    warn: (console.warn : any),
  },
};
*/

/**
 * A pretty-printer that handles `undefined` and functions better
 * than JSON.stringify
 * Important because some AST node fields can be undefined, and
 * if those don't show up in the assert output, it can be
 * very confusing to figure out how the actual and expected differ
 * Whether node's util.inspect or JSON.stringify is better seems
 * context dependent.
 *
 * @param {SimpleMarkdown.ASTNode | Array<SimpleMarkdown.TableAlignment>} ast
 */
var prettyPrintAST = function (ast) {
    return JSON.stringify(ast, null, 4);
    //    // FIXME(aria): For debugging in more depth? This used to work?
    //    return nodeUtil.inspect(ast, {
    //        depth: null,
    //        colors: false
    //    });
};

/**
 * Asset that two ast parse trees are equal
 * @param {SimpleMarkdown.ASTNode | Array<SimpleMarkdown.TableAlignment>} parsed
 * @param {SimpleMarkdown.ASTNode | Array<SimpleMarkdown.TableAlignment>} expected
 */
var validateParse = function (parsed, expected) {
    assert.deepEqual(parsed, expected);
};

/**
 * @param {SimpleMarkdown.ReactElements} reactElements
 * @returns {string}
 */
var reactToHtml = function (reactElements) {
    var rawHtml = ReactDOMServer.renderToStaticMarkup(
        React.createElement("div", {}, reactElements),
    );
    var innerHtml = rawHtml.replace(/^<div>/, "").replace(/<\/div>$/, "");
    var simplifiedHtml = innerHtml
        .replace(/>\n*/g, ">")
        .replace(/\n*</g, "<")
        .replace(/\s+/g, " ");
    return simplifiedHtml;
};

/**
 * @param {SimpleMarkdown.ASTNode} parsed
 * @returns {string}
 */
var htmlThroughReact = function (parsed) {
    var output = defaultReactOutput(parsed);
    return reactToHtml(output);
};

/**
 * @param {string} source
 * @returns {string}
 */
var htmlFromReactMarkdown = function (source) {
    return htmlThroughReact(implicitParse(source));
};

/**
 * @param {string} source
 * @returns {string}
 */
var htmlFromMarkdown = function (source) {
    var html = defaultHtmlOutput(implicitParse(source));
    var simplifiedHtml = html.replace(/\s+/g, " ");
    return simplifiedHtml;
};

/**
 * @param {string} source
 * @param {string} html
 */
var assertParsesToReact = function (source, html) {
    var actualHtml = htmlFromReactMarkdown(source);
    assert.strictEqual(actualHtml, html);
};

/**
 * @param {string} source
 * @param {string} html
 */
var assertParsesToHtml = function (source, html) {
    var actualHtml = htmlFromMarkdown(source);
    assert.strictEqual(actualHtml, html);
};

describe("simple markdown", function () {
    describe("parser", function () {
        it("should parse a plain string", function () {
            var parsed = inlineParse("hi there");
            validateParse(parsed, [
                {
                    type: "text",
                    content: "hi there",
                },
            ]);
        });

        it("should parse bold", function () {
            var parsed = inlineParse("**hi**");
            validateParse(parsed, [
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);
        });

        it("should parse italics", function () {
            var parsed = inlineParse("*hi*");
            validateParse(parsed, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);

            var parsed2 = inlineParse("*test i*");
            validateParse(parsed2, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "test i",
                        },
                    ],
                },
            ]);
        });

        it("should not parse ** as empty italics", function () {
            var parsed = inlineParse("**");
            validateParse(parsed, [
                {type: "text", content: "*"},
                {type: "text", content: "*"},
            ]);
        });

        it("should parse a single italic character", function () {
            var parsed = inlineParse("*h*");
            validateParse(parsed, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "h",
                        },
                    ],
                },
            ]);
        });

        it("should parse strikethrough", function () {
            var parsed = inlineParse("~~hi~~");
            validateParse(parsed, [
                {
                    type: "del",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);

            // not super important that it parses this like this, but
            // it should be a valid something...
            var parsed2 = inlineParse("~~~~~");
            validateParse(parsed2, [
                {content: "~", type: "text"},
                {content: "~", type: "text"},
                {content: "~", type: "text"},
                {content: "~", type: "text"},
                {content: "~", type: "text"},
            ]);
        });

        it("should support escapes in strikethrough", function () {
            validateParse(inlineParse("~~hi\\~~ there~~"), [
                {
                    type: "del",
                    content: [
                        {type: "text", content: "hi"},
                        {type: "text", content: "~"},
                        {type: "text", content: "~ there"},
                    ],
                },
            ]);
        });

        it("should not allow strikethrough to contain non-closing ~~s", function () {
            validateParse(inlineParse("~~hi ~~there~~"), [
                {type: "text", content: "~"},
                {type: "text", content: "~hi "},
                {type: "del", content: [{type: "text", content: "there"}]},
            ]);
        });

        it("should parse underlines", function () {
            var parsed = inlineParse("__hi__");
            validateParse(parsed, [
                {
                    type: "u",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);
        });

        it("should parse nested bold/italics", function () {
            var parsed = inlineParse("***hi***");
            validateParse(parsed, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "hi",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should parse nested bold/italics/underline", function () {
            var parsed1 = inlineParse("***__hi__***");
            validateParse(parsed1, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "u",
                                    content: [
                                        {
                                            type: "text",
                                            content: "hi",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]);

            var parsed2 = inlineParse("*__**hi**__*");
            validateParse(parsed2, [
                {
                    type: "em",
                    content: [
                        {
                            type: "u",
                            content: [
                                {
                                    type: "strong",
                                    content: [
                                        {
                                            type: "text",
                                            content: "hi",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ]);

            var parsed3 = inlineParse("***bolditalics***");
            validateParse(parsed3, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "bolditalics",
                                },
                            ],
                        },
                    ],
                },
            ]);

            var parsed4 = inlineParse("**bold *italics***");
            validateParse(parsed4, [
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "bold ",
                        },
                        {
                            type: "em",
                            content: [
                                {
                                    type: "text",
                                    content: "italics",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should allow escaped underscores in underscore italics", function () {
            var parsed1 = inlineParse("_ABC\\_DEF_");
            validateParse(parsed1, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "ABC",
                        },
                        {
                            type: "text",
                            content: "_",
                        },
                        {
                            type: "text",
                            content: "DEF",
                        },
                    ],
                },
            ]);

            var parsed2 = inlineParse("_**ABC\\_DEF**_");
            validateParse(parsed2, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "ABC",
                                },
                                {
                                    type: "text",
                                    content: "_",
                                },
                                {
                                    type: "text",
                                    content: "DEF",
                                },
                            ],
                        },
                    ],
                },
            ]);

            var parsed3 = inlineParse("_**ABC\\$DEF**_");
            validateParse(parsed3, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "ABC",
                                },
                                {
                                    type: "text",
                                    content: "$",
                                },
                                {
                                    type: "text",
                                    content: "DEF",
                                },
                            ],
                        },
                    ],
                },
            ]);

            validateParse(inlineParse("_\\\\_"), [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "\\",
                        },
                    ],
                },
            ]);
        });

        it("should allow escaped asterisks in asterisk italics", function () {
            var parsed1 = inlineParse("*hi\\* there*");
            validateParse(parsed1, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                        {
                            type: "text",
                            content: "*",
                        },
                        {
                            type: "text",
                            content: " there",
                        },
                    ],
                },
            ]);

            var parsed2 = inlineParse("_**ABC\\*DEF**_");
            validateParse(parsed2, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "ABC",
                                },
                                {
                                    type: "text",
                                    content: "*",
                                },
                                {
                                    type: "text",
                                    content: "DEF",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should allow escaped asterisks in asterisk bolds", function () {
            var parsed1 = inlineParse("**hi\\* there**");
            validateParse(parsed1, [
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                        {
                            type: "text",
                            content: "*",
                        },
                        {
                            type: "text",
                            content: " there",
                        },
                    ],
                },
            ]);

            validateParse(inlineParse("**hi\\** there**"), [
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                        {
                            type: "text",
                            content: "*",
                        },
                        {
                            type: "text",
                            content: "* there",
                        },
                    ],
                },
            ]);
        });

        it("should allow escaped underscores in underlines", function () {
            var parsed1 = inlineParse("__hi\\__ there__");
            validateParse(parsed1, [
                {
                    type: "u",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                        {
                            type: "text",
                            content: "_",
                        },
                        {
                            type: "text",
                            content: "_ there",
                        },
                    ],
                },
            ]);
        });

        it("should parse complex combined bold/italics", function () {
            var parsed = inlineParse("***bold** italics*");
            validateParse(parsed, [
                {
                    type: "em",
                    content: [
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "bold",
                                },
                            ],
                        },
                        {
                            type: "text",
                            content: " italics",
                        },
                    ],
                },
            ]);

            var parsed2 = inlineParse("*hi **there you***");
            validateParse(parsed2, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "hi ",
                        },
                        {
                            type: "strong",
                            content: [
                                {
                                    type: "text",
                                    content: "there you",
                                },
                            ],
                        },
                    ],
                },
            ]);

            var parsed3 = inlineParse("***like* this**");
            validateParse(parsed3, [
                {
                    type: "strong",
                    content: [
                        {
                            type: "em",
                            content: [
                                {
                                    type: "text",
                                    content: "like",
                                },
                            ],
                        },
                        {
                            type: "text",
                            content: " this",
                        },
                    ],
                },
            ]);

            var parsed4 = inlineParse("**bold *and italics***");
            validateParse(parsed4, [
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "bold ",
                        },
                        {
                            type: "em",
                            content: [
                                {
                                    type: "text",
                                    content: "and italics",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should parse multiple bold/italics/underlines", function () {
            var parsed = inlineParse("*some* of this __sentence__ is **bold**");
            validateParse(parsed, [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "some",
                        },
                    ],
                },
                {
                    type: "text",
                    content: " of this ",
                },
                {
                    type: "u",
                    content: [
                        {
                            type: "text",
                            content: "sentence",
                        },
                    ],
                },
                {
                    type: "text",
                    content: " is ",
                },
                {
                    type: "strong",
                    content: [
                        {
                            type: "text",
                            content: "bold",
                        },
                    ],
                },
            ]);

            validateParse(inlineParse("_italics __bold___"), [
                {
                    type: "em",
                    content: [
                        {
                            type: "text",
                            content: "italics ",
                        },
                        {
                            type: "u",
                            content: [
                                {
                                    type: "text",
                                    content: "bold",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should parse inline code", function () {
            var parsed = inlineParse("`hi`");
            validateParse(parsed, [
                {
                    type: "inlineCode",
                    content: "hi",
                },
            ]);
        });

        it("should parse * and _ inside `` as code", function () {
            var parsed = inlineParse("`const int * const * const p; // _hi_`");
            validateParse(parsed, [
                {
                    type: "inlineCode",
                    content: "const int * const * const p; // _hi_",
                },
            ]);
        });

        it("should ignore a single space at the start and end of an inline code block separating a '`'", function () {
            var parsed1 = inlineParse("test `` ` `` escaping a code block");
            validateParse(parsed1, [
                {type: "text", content: "test "},
                {type: "inlineCode", content: "`"},
                {type: "text", content: " escaping a code block"},
            ]);

            var parsed1 = inlineParse("test ``  `  `` escaping a code block");
            validateParse(parsed1, [
                {type: "text", content: "test "},
                {type: "inlineCode", content: " ` "},
                {type: "text", content: " escaping a code block"},
            ]);
        });

        it("should allow you to escape special characters with \\", function () {
            var parsed = inlineParse("\\`hi\\` \\*bye\\* \\~\\|\\<\\[\\{");
            validateParse(parsed, [
                {type: "text", content: "`"},
                {type: "text", content: "hi"},
                {type: "text", content: "`"},
                {type: "text", content: " "},
                {type: "text", content: "*"},
                {type: "text", content: "bye"},
                {type: "text", content: "*"},
                {type: "text", content: " "},
                {type: "text", content: "~"},
                {type: "text", content: "|"},
                {type: "text", content: "<"},
                {type: "text", content: "["},
                {type: "text", content: "{"},
            ]);

            var parsed2 = inlineParse("hi\\^caret");
            validateParse(parsed2, [
                {type: "text", content: "hi"},
                {type: "text", content: "^"},
                {type: "text", content: "caret"},
            ]);
        });

        it("should parse basic []() links as links", function () {
            var parsed = inlineParse("[hi](http://www.google.com)");
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed2 = inlineParse("[secure](https://www.google.com)");
            validateParse(parsed2, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "secure",
                        },
                    ],
                    target: "https://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed3 = inlineParse(
                "[local](http://localhost:9000/test.html)",
            );
            validateParse(parsed3, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "local",
                        },
                    ],
                    target: "http://localhost:9000/test.html",
                    title: undefined,
                },
            ]);

            var parsed4 = inlineParse(
                "[params](http://localhost:9000/test.html" +
                    "?content=%7B%7D&format=pretty)",
            );
            validateParse(parsed4, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "params",
                        },
                    ],
                    target:
                        "http://localhost:9000/test.html" +
                        "?content=%7B%7D&format=pretty",
                    title: undefined,
                },
            ]);

            var parsed5 = inlineParse(
                "[hash](http://localhost:9000/test.html#content=%7B%7D)",
            );
            validateParse(parsed5, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "hash",
                        },
                    ],
                    target: "http://localhost:9000/test.html#content=%7B%7D",
                    title: undefined,
                },
            ]);
        });

        it("should allow escaping `[` with `\\`", function () {
            // Without the backslash, the following would be a
            // link with the text "hi".
            // With the backslash, it should ignore the '[hi]'
            // portion, but will still detect that the inside
            // of the parentheses contains a raw url, which it
            // will turn into a url link.
            var parsed = inlineParse("\\[hi](http://www.google.com)");
            validateParse(parsed, [
                {content: "[", type: "text"},
                {content: "hi", type: "text"},
                {content: "]", type: "text"},
                {content: "(", type: "text"},
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "http://www.google.com",
                        },
                    ],
                    target: "http://www.google.com",
                    title: undefined,
                },
                {content: ")", type: "text"},
            ]);
        });

        it("should allow escaping of link urls with `\\`", function () {
            var parsed = inlineParse(
                "[test link](https://test.link/\\(test\\))",
            );
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "test link",
                        },
                    ],
                    target: "https://test.link/(test)",
                    title: undefined,
                },
            ]);
        });

        it("should allow one level of balanced parens in link urls", function () {
            var parsed = inlineParse("[link]((foo)and(bar))");
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            content: "link",
                            type: "text",
                        },
                    ],
                    target: "(foo)and(bar)",
                    title: undefined,
                },
            ]);
        });

        it("should parse basic <autolinks>", function () {
            var parsed = inlineParse("<http://www.google.com>");
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "http://www.google.com",
                        },
                    ],
                    target: "http://www.google.com",
                },
            ]);

            var parsed2 = inlineParse("<https://www.google.com>");
            validateParse(parsed2, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "https://www.google.com",
                        },
                    ],
                    target: "https://www.google.com",
                },
            ]);

            var parsed3 = inlineParse("<http://localhost:9000/test.html>");
            validateParse(parsed3, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "http://localhost:9000/test.html",
                        },
                    ],
                    target: "http://localhost:9000/test.html",
                },
            ]);

            var parsed4 = inlineParse(
                "<http://localhost:9000/test.html" +
                    "?content=%7B%7D&format=pretty>",
            );
            validateParse(parsed4, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content:
                                "http://localhost:9000/test.html" +
                                "?content=%7B%7D&format=pretty",
                        },
                    ],
                    target:
                        "http://localhost:9000/test.html" +
                        "?content=%7B%7D&format=pretty",
                },
            ]);

            var parsed5 = inlineParse(
                "<http://localhost:9000/test.html#content=%7B%7D>",
            );
            validateParse(parsed5, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content:
                                "http://localhost:9000/test.html#content=%7B%7D",
                        },
                    ],
                    target: "http://localhost:9000/test.html#content=%7B%7D",
                },
            ]);
        });

        it("should parse basic <mailto@autolinks>", function () {
            var parsed = inlineParse("<test@example.com>");
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "test@example.com",
                        },
                    ],
                    target: "mailto:test@example.com",
                },
            ]);

            var parsed2 = inlineParse("<test+ext@example.com>");
            validateParse(parsed2, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "test+ext@example.com",
                        },
                    ],
                    target: "mailto:test+ext@example.com",
                },
            ]);

            var parsed3 = inlineParse("<mailto:test@example.com>");
            validateParse(parsed3, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "mailto:test@example.com",
                        },
                    ],
                    target: "mailto:test@example.com",
                },
            ]);

            var parsed4 = inlineParse("<MAILTO:TEST@EXAMPLE.COM>");
            validateParse(parsed4, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "MAILTO:TEST@EXAMPLE.COM",
                        },
                    ],
                    target: "MAILTO:TEST@EXAMPLE.COM",
                },
            ]);
        });

        it("should parse basic freeform urls", function () {
            var parsed = inlineParse("http://www.google.com");
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "http://www.google.com",
                        },
                    ],
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed2 = inlineParse("https://www.google.com");
            validateParse(parsed2, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "https://www.google.com",
                        },
                    ],
                    target: "https://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed3 = inlineParse("http://example.com/test.html");
            validateParse(parsed3, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "http://example.com/test.html",
                        },
                    ],
                    target: "http://example.com/test.html",
                    title: undefined,
                },
            ]);

            var parsed4 = inlineParse(
                "http://example.com/test.html" +
                    "?content=%7B%7D&format=pretty",
            );
            validateParse(parsed4, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content:
                                "http://example.com/test.html" +
                                "?content=%7B%7D&format=pretty",
                        },
                    ],
                    target:
                        "http://example.com/test.html" +
                        "?content=%7B%7D&format=pretty",
                    title: undefined,
                },
            ]);

            var parsed5 = inlineParse(
                "http://example.com/test.html#content=%7B%7D",
            );
            validateParse(parsed5, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content:
                                "http://example.com/test.html#content=%7B%7D",
                        },
                    ],
                    target: "http://example.com/test.html#content=%7B%7D",
                    title: undefined,
                },
            ]);
        });

        it("should not split words before colons", function () {
            var parsed = inlineParse("Here is a rule: try this");
            validateParse(parsed, [
                {
                    type: "text",
                    content: "Here is a rule",
                },
                {
                    type: "text",
                    content: ": try this",
                },
            ]);
        });

        it("should parse freeform urls inside paragraphs", function () {
            var parsed = blockParse(
                "hi this is a link http://www.google.com\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi this is a link ",
                        },
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "http://www.google.com",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
            ]);
        });

        it("should parse [reflinks][and their targets]", function () {
            var parsed = implicitParse(
                "[Google][1]\n\n" + "[1]: http://www.google.com\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed2 = blockParse(
                "[1]: http://www.google.com\n\n" + "[Google][1]\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined,
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
            ]);
        });

        it("should parse inline link titles", function () {
            var parsed = inlineParse(
                '[Google](http://www.google.com "This is google!")',
            );
            validateParse(parsed, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "Google",
                        },
                    ],
                    target: "http://www.google.com",
                    title: "This is google!",
                },
            ]);

            var parsed2 = inlineParse(
                '[Google](http://www.google.com "still Google")',
            );
            validateParse(parsed2, [
                {
                    type: "link",
                    content: [
                        {
                            type: "text",
                            content: "Google",
                        },
                    ],
                    target: "http://www.google.com",
                    title: "still Google",
                },
            ]);
        });

        it("should parse reflink titles", function () {
            var parsed = implicitParse(
                "[Google][1]\n\n" +
                    "[1]: http://www.google.com (This is google!)\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: "This is google!",
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: "This is google!",
                },
            ]);

            var parsed2 = implicitParse(
                '[1]: http://www.google.com "still Google"\n\n' +
                    "[Google][1]\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: "still Google",
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: "still Google",
                        },
                    ],
                },
            ]);

            // test some edge cases, notably:
            // target of ""; title using parens; def with a `-` in it
            var parsed3 = implicitParse(
                "[Nowhere][nowhere-target]\n\n" +
                    "[nowhere-target]: <> (nowhere)\n\n",
            );
            validateParse(parsed3, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Nowhere",
                                },
                            ],
                            target: "",
                            title: "nowhere",
                        },
                    ],
                },
                {
                    type: "def",
                    def: "nowhere-target",
                    target: "",
                    title: "nowhere",
                },
            ]);
        });

        it("should parse [reflinks][] with implicit targets", function () {
            var parsed = implicitParse(
                "[Google][]\n\n" + "[Google]: http://www.google.com\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed2 = implicitParse(
                "[Google]: http://www.google.com\n\n" + "[Google][]\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined,
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
            ]);
        });

        it("should handle multiple [reflinks][to the same target]", function () {
            var parsed = implicitParse(
                "[Google][1] [Yahoo][1]\n\n" + "[1]: http://www.google.com\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                        {
                            type: "text",
                            content: " ",
                        },
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Yahoo",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            // This is sort of silly, but the last def overrides all previous
            // links. This is just a test that things are continuing to work
            // as we currently expect them to, but I seriously hope no one
            // writes markdown like this!
            var parsed2 = implicitParse(
                "[test][1]\n\n" +
                    "[1]: http://google.com\n\n" +
                    "[test2][1]\n\n" +
                    "[1]: http://khanacademy.org\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "test",
                                },
                            ],
                            target: "http://khanacademy.org",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://google.com",
                    title: undefined,
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "test2",
                                },
                            ],
                            target: "http://khanacademy.org",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://khanacademy.org",
                    title: undefined,
                },
            ]);
        });

        it("should parse basic images", function () {
            var parsed = inlineParse("![](http://example.com/test.png)");
            validateParse(parsed, [
                {
                    type: "image",
                    alt: "",
                    target: "http://example.com/test.png",
                    title: undefined,
                },
            ]);

            var parsed2 = inlineParse("![aaalt](http://example.com/image)");
            validateParse(parsed2, [
                {
                    type: "image",
                    alt: "aaalt",
                    target: "http://example.com/image",
                    title: undefined,
                },
            ]);

            var parsed3 = inlineParse(
                '![](http://localhost:9000/test.html "local")',
            );
            validateParse(parsed3, [
                {
                    type: "image",
                    alt: "",
                    target: "http://localhost:9000/test.html",
                    title: "local",
                },
            ]);

            var parsed4 = inlineParse(
                "![p](http://localhost:9000/test" +
                    '?content=%7B%7D&format=pretty "params")',
            );
            validateParse(parsed4, [
                {
                    type: "image",
                    alt: "p",
                    target:
                        "http://localhost:9000/test" +
                        "?content=%7B%7D&format=pretty",
                    title: "params",
                },
            ]);

            var parsed5 = inlineParse(
                "![hash](http://localhost:9000/test.png#content=%7B%7D)",
            );
            validateParse(parsed5, [
                {
                    type: "image",
                    alt: "hash",
                    target: "http://localhost:9000/test.png#content=%7B%7D",
                    title: undefined,
                },
            ]);
        });

        it("should parse [refimages][and their targets]", function () {
            var parsed = implicitParse(
                "![aaalt][1]\n\n" + "[1]: http://example.com/test.gif\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "image",
                            alt: "aaalt",
                            target: "http://example.com/test.gif",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "1",
                    target: "http://example.com/test.gif",
                    title: undefined,
                },
            ]);

            var parsed2 = implicitParse(
                "[image]: http://example.com/test.gif\n\n" + "![image][]\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: undefined,
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "image",
                            alt: "image",
                            target: "http://example.com/test.gif",
                            title: undefined,
                        },
                    ],
                },
            ]);

            var parsed3 = implicitParse(
                '[image]: http://example.com/test.gif "title!"\n\n' +
                    "![image][]\n\n",
            );
            validateParse(parsed3, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: "title!",
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "image",
                            alt: "image",
                            target: "http://example.com/test.gif",
                            title: "title!",
                        },
                    ],
                },
            ]);

            var parsed3 = implicitParse(
                "[image]: http://example.com/test.gif (*title text*)\n\n" +
                    "![image][]\n\n",
            );
            validateParse(parsed3, [
                {
                    type: "def",
                    def: "image",
                    target: "http://example.com/test.gif",
                    title: "*title text*",
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "image",
                            alt: "image",
                            target: "http://example.com/test.gif",
                            title: "*title text*",
                        },
                    ],
                },
            ]);
        });

        it("should compare defs case- and whitespace-insensitively", function () {
            var parsed = implicitParse(
                "[Google][HiIiI]\n\n" + "[HIiii]: http://www.google.com\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "hiiii",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed2 = implicitParse(
                "[Google][]\n\n" + "[google]: http://www.google.com\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: "google",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);

            var parsed3 = implicitParse(
                "[Google][ h    i ]\n\n" +
                    "[  h i   ]: http://www.google.com\n\n",
            );
            validateParse(parsed3, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "link",
                            content: [
                                {
                                    type: "text",
                                    content: "Google",
                                },
                            ],
                            target: "http://www.google.com",
                            title: undefined,
                        },
                    ],
                },
                {
                    type: "def",
                    def: " h i ",
                    target: "http://www.google.com",
                    title: undefined,
                },
            ]);
        });

        it("should not allow defs to break out of a paragraph", function () {
            var parsed = implicitParse("hi [1]: there\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "hi ", type: "text"},
                        {content: "[1", type: "text"},
                        {content: "]", type: "text"},
                        {content: ": there", type: "text"},
                    ],
                },
            ]);
        });

        it("should allow a group of defs next to each other", function () {
            var parsed = implicitParse(
                "[a]: # (title)\n" +
                    "[b]: http://www.google.com\n" +
                    "[//]: <> (hi)\n" +
                    "[label]: # (there)\n" +
                    "[#]: #\n" +
                    "\n",
            );
            validateParse(parsed, [
                {
                    type: "def",
                    def: "a",
                    target: "#",
                    title: "title",
                },
                {
                    type: "def",
                    def: "b",
                    target: "http://www.google.com",
                    title: undefined,
                },
                {
                    type: "def",
                    def: "//",
                    target: "",
                    title: "hi",
                },
                {
                    type: "def",
                    def: "label",
                    target: "#",
                    title: "there",
                },
                {
                    type: "def",
                    def: "#",
                    target: "#",
                    title: undefined,
                },
            ]);
        });

        it("should parse a single top-level paragraph", function () {
            var parsed = blockParse("hi\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);
        });

        it("should parse multiple top-level paragraphs", function () {
            var parsed = blockParse("hi\n\nbye\n\nthere\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "bye",
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "there",
                        },
                    ],
                },
            ]);
        });

        it("should not parse single newlines as paragraphs", function () {
            var parsed = inlineParse("hi\nbye\nthere\n");
            validateParse(parsed, [
                {
                    type: "text",
                    content: "hi\nbye\nthere\n",
                },
            ]);
        });

        it("should not parse a single newline as a new paragraph", function () {
            var parsed = blockParse("hi\nbye\nthere\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi\nbye\nthere",
                        },
                    ],
                },
            ]);
        });

        it("should allow whitespace-only lines to end paragraphs", function () {
            var parsed = blockParse("hi\n \n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);

            var parsed2 = blockParse("hi\n  \n");
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);

            var parsed3 = blockParse("hi\n\n  \n  \n");
            validateParse(parsed3, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
            ]);

            var parsed4 = blockParse("hi\n  \n\n   \nbye\n\n");
            validateParse(parsed4, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "hi",
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "bye",
                        },
                    ],
                },
            ]);
        });

        it("should parse a single heading", function () {
            var parsed = blockParse("### heading3\n\n");
            validateParse(parsed, [
                {
                    type: "heading",
                    level: 3,
                    content: [
                        {
                            type: "text",
                            content: "heading3",
                        },
                    ],
                },
            ]);
        });

        it("should parse a single lheading", function () {
            var parsed = blockParse("heading2\n-----\n\n");
            validateParse(parsed, [
                {
                    type: "heading",
                    level: 2,
                    content: [
                        {
                            type: "text",
                            content: "heading2",
                        },
                    ],
                },
            ]);
        });

        it("should not parse a single lheading with two -- or ==", function () {
            var parsed = blockParse("heading1\n==\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {type: "text", content: "heading1\n"},
                        {type: "text", content: "="},
                        {type: "text", content: "="},
                    ],
                },
            ]);

            var parsed2 = blockParse("heading2\n--\n\n");
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {type: "text", content: "heading2\n"},
                        {type: "text", content: "-"},
                        {type: "text", content: "-"},
                    ],
                },
            ]);
        });

        it("should not parse 7 #s as an h7", function () {
            var parsed = blockParse("#######heading7\n\n");
            validateParse(parsed, [
                {
                    type: "heading",
                    level: 6,
                    content: [
                        {
                            type: "text",
                            content: "#heading7",
                        },
                    ],
                },
            ]);
        });

        it("should parse a heading between paragraphs", function () {
            var parsed = blockParse(
                "para 1\n\n" + "#heading\n\n\n" + "para 2\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 1",
                        },
                    ],
                },
                {
                    type: "heading",
                    level: 1,
                    content: [
                        {
                            type: "text",
                            content: "heading",
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 2",
                        },
                    ],
                },
            ]);
        });

        it("should not allow headings mid-paragraph", function () {
            var parsed = blockParse(
                "paragraph # text\n" + "more paragraph\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "paragraph ", type: "text"},
                        {content: "# text\nmore paragraph", type: "text"},
                    ],
                },
            ]);

            var parsed2 = blockParse(
                "paragraph\n" + "text\n" + "----\n" + "more paragraph\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {content: "paragraph\ntext\n", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-\nmore paragraph", type: "text"},
                    ],
                },
            ]);
        });

        it("should parse a single top-level blockquote", function () {
            var parsed = blockParse("> blockquote\n\n");
            validateParse(parsed, [
                {
                    type: "blockQuote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "blockquote",
                                },
                            ],
                        },
                    ],
                },
            ]);
        });

        it("should parse multiple blockquotes and paragraphs", function () {
            var parsed = blockParse(
                "para 1\n\n" +
                    "> blockquote 1\n" +
                    ">\n" +
                    ">blockquote 2\n\n" +
                    "para 2\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 1",
                        },
                    ],
                },
                {
                    type: "blockQuote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "blockquote 1",
                                },
                            ],
                        },
                        {
                            type: "paragraph",
                            content: [
                                {
                                    type: "text",
                                    content: "blockquote 2",
                                },
                            ],
                        },
                    ],
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 2",
                        },
                    ],
                },
            ]);
        });

        it("should not let a > escape a paragraph as a blockquote", function () {
            var parsed = blockParse("para 1 > not a quote\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "para 1 ", type: "text"},
                        {content: "> not a quote", type: "text"},
                    ],
                },
            ]);
        });

        it("should parse a single top-level code block", function () {
            var parsed = blockParse("    if (true) { code(); }\n\n");
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "if (true) { code(); }",
                },
            ]);
        });

        it("should parse a code block with trailing spaces", function () {
            var parsed = blockParse("    if (true) { code(); }\n    \n\n");
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "if (true) { code(); }",
                },
            ]);
        });

        it("should parse fence blocks", function () {
            var parsed = blockParse("```\ncode\n```\n\n");
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "code",
                },
            ]);

            var parsed2 = blockParse(
                "```aletheia\n" + "if true [code()]\n" + "```\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "codeBlock",
                    lang: "aletheia",
                    content: "if true [code()]",
                },
            ]);
        });

        it("should allow indentation inside code blocks", function () {
            var parsed = blockParse(
                "```\n" +
                    "if (true === false) {\n" +
                    "    throw 'world does not exist';\n" +
                    "}\n" +
                    "```\n\n",
            );
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content:
                        "if (true === false) {\n" +
                        "    throw 'world does not exist';\n" +
                        "}",
                },
            ]);

            var parsed = blockParse(
                "~~~\n" + "    this should be indented\n" + "~~~\n\n",
            );
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "    this should be indented",
                },
            ]);
        });

        it("should parse mixed paragraphs and code", function () {
            var parsed = blockParse(
                "this is regular text\n\n" +
                    "    this is code\n\n" +
                    "this is more regular text\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "this is regular text",
                        },
                    ],
                },
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "this is code",
                },
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "this is more regular text",
                        },
                    ],
                },
            ]);
        });

        it("should parse top-level horizontal rules", function () {
            var parsed = blockParse(
                "---\n\n" +
                    "***\n\n" +
                    "___\n\n" +
                    " - - - - \n\n" +
                    "_ _ _\n\n" +
                    "  ***  \n\n",
            );
            validateParse(parsed, [
                {type: "hr"},
                {type: "hr"},
                {type: "hr"},
                {type: "hr"},
                {type: "hr"},
                {type: "hr"},
            ]);
        });

        it("should parse hrs between paragraphs", function () {
            var parsed = blockParse(
                "para 1\n\n" + " * * * \n\n" + "para 2\n\n",
            );
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 1",
                        },
                    ],
                },
                {type: "hr"},
                {
                    type: "paragraph",
                    content: [
                        {
                            type: "text",
                            content: "para 2",
                        },
                    ],
                },
            ]);
        });

        it("should not allow hrs within a paragraph", function () {
            var parsed = blockParse("paragraph ----\n" + "more paragraph\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "paragraph ", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-", type: "text"},
                        {content: "-\nmore paragraph", type: "text"},
                    ],
                },
            ]);
        });

        it("should parse simple unordered lists", function () {
            var parsed = blockParse(" * hi\n" + " * bye\n" + " * there\n\n");
            validateParse(parsed, [
                {
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                content: "hi",
                                type: "text",
                            },
                        ],
                        [
                            {
                                content: "bye",
                                type: "text",
                            },
                        ],
                        [
                            {
                                content: "there",
                                type: "text",
                            },
                        ],
                    ],
                    type: "list",
                },
            ]);
        });

        it("should parse simple ordered lists", function () {
            var parsed = blockParse(
                "1. first\n" + "2. second\n" + "3. third\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: true,
                    start: 1,
                    items: [
                        [
                            {
                                type: "text",
                                content: "first",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "second",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "third",
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should parse simple ordered lists with silly numbers", function () {
            var parsed = blockParse(
                "1. first\n" + "13. second\n" + "9. third\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    start: 1,
                    ordered: true,
                    items: [
                        [
                            {
                                type: "text",
                                content: "first",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "second",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "third",
                            },
                        ],
                    ],
                },
            ]);

            var parsed2 = blockParse(
                "63. first\n" + "13. second\n" + "9. third\n\n",
            );
            validateParse(parsed2, [
                {
                    type: "list",
                    start: 63,
                    ordered: true,
                    items: [
                        [
                            {
                                type: "text",
                                content: "first",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "second",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "third",
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should parse nested lists", function () {
            var parsed = blockParse(
                "1. first\n" +
                    "2. second\n" +
                    "   * inner\n" +
                    "   * inner\n" +
                    "3. third\n\n",
            );
            validateParse(parsed, [
                {
                    ordered: true,
                    start: 1,
                    items: [
                        [
                            {
                                content: "first",
                                type: "text",
                            },
                        ],
                        [
                            {
                                content: "second\n",
                                type: "text",
                            },
                            {
                                ordered: false,
                                start: undefined,
                                items: [
                                    [
                                        {
                                            content: "inner",
                                            type: "text",
                                        },
                                    ],
                                    [
                                        {
                                            content: "inner",
                                            type: "text",
                                        },
                                    ],
                                ],
                                type: "list",
                            },
                        ],
                        [
                            {
                                content: "third",
                                type: "text",
                            },
                        ],
                    ],
                    type: "list",
                },
            ]);

            var parsed = blockParse(
                " * hi\n" + "    * bye\n" + "    * there\n\n",
            );
            validateParse(parsed, [
                {
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                content: "hi\n ", // NOTE(aria): The extra space here is
                                type: "text", //  weird and we should consider fixing
                            },
                            {
                                ordered: false,
                                start: undefined,
                                items: [
                                    [
                                        {
                                            content: "bye",
                                            type: "text",
                                        },
                                    ],
                                    [
                                        {
                                            content: "there",
                                            type: "text",
                                        },
                                    ],
                                ],
                                type: "list",
                            },
                        ],
                    ],
                    type: "list",
                },
            ]);
        });

        it("should parse loose lists", function () {
            var parsed = blockParse(
                " * hi\n\n" + " * bye\n\n" + " * there\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "hi",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "bye",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "there",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should have defined behaviour for semi-loose lists", function () {
            // we mostly care that this does something vaguely reasonable.
            // if you write markdown like this the results are your own fault.
            var parsed = blockParse(" * hi\n" + " * bye\n\n" + " * there\n\n");
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "text",
                                content: "hi",
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "bye",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "there",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]);

            var parsed2 = blockParse(" * hi\n\n" + " * bye\n" + " * there\n\n");
            validateParse(parsed2, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "hi",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "bye",
                            },
                        ],
                        [
                            {
                                type: "text",
                                content: "there",
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should parse paragraphs within loose lists", function () {
            var parsed = blockParse(
                " * hi\n\n" + "   hello\n\n" + " * bye\n\n" + " * there\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "hi",
                                    },
                                ],
                            },
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "hello",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "bye",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "there",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should allow line breaks+wrapping in tight lists", function () {
            var parsed = blockParse(
                " * hi\n" + "   hello\n\n" + " * bye\n\n" + " * there\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "hi\nhello",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "bye",
                                    },
                                ],
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "there",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should allow code inside list items", function () {
            var parsed = blockParse(
                " * this is a list\n\n" + "       with code in it\n\n",
            );
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "this is a list",
                                    },
                                ],
                            },
                            {
                                type: "codeBlock",
                                lang: undefined,
                                content: "with code in it",
                            },
                        ],
                    ],
                },
            ]);

            var parsed2 = blockParse(
                " * this is a list\n\n" +
                    "       with code in it\n\n" +
                    " * second item\n" +
                    "\n",
            );
            validateParse(parsed2, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "this is a list",
                                    },
                                ],
                            },
                            {
                                type: "codeBlock",
                                lang: undefined,
                                content: "with code in it",
                            },
                        ],
                        [
                            {
                                type: "paragraph",
                                content: [
                                    {
                                        type: "text",
                                        content: "second item",
                                    },
                                ],
                            },
                        ],
                    ],
                },
            ]);
        });

        it("should allow lists inside blockquotes", function () {
            // This list also has lots of trailing space after the *s
            var parsed = blockParse(
                "> A list within a blockquote\n" +
                    ">\n" +
                    "> *    asterisk 1\n" +
                    "> *    asterisk 2\n" +
                    "> *    asterisk 3\n" +
                    "\n",
            );
            validateParse(parsed, [
                {
                    type: "blockQuote",
                    content: [
                        {
                            type: "paragraph",
                            content: [
                                {
                                    content: "A list within a blockquote",
                                    type: "text",
                                },
                            ],
                        },
                        {
                            type: "list",
                            ordered: false,
                            start: undefined,
                            items: [
                                [
                                    {
                                        content: "asterisk 1",
                                        type: "text",
                                    },
                                ],
                                [
                                    {
                                        content: "asterisk 2",
                                        type: "text",
                                    },
                                ],
                                [
                                    {
                                        content: "asterisk 3",
                                        type: "text",
                                    },
                                ],
                            ],
                        },
                    ],
                },
            ]);
        });

        it("symbols should not break a paragraph into a list", function () {
            var parsed = blockParse("hi - there\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "hi ", type: "text"},
                        {content: "- there", type: "text"},
                    ],
                },
            ]);

            var parsed2 = blockParse("hi * there\n\n");
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [
                        {content: "hi ", type: "text"},
                        {content: "* there", type: "text"},
                    ],
                },
            ]);

            var parsed3 = blockParse("hi 1. there\n\n");
            validateParse(parsed3, [
                {
                    type: "paragraph",
                    content: [
                        {content: "hi 1", type: "text"},
                        {content: ". there", type: "text"},
                    ],
                },
            ]);
        });

        it("dashes or numbers should not break a list item into a list", function () {
            var parsed = blockParse("- hi - there\n\n");
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {content: "hi ", type: "text"},
                            {content: "- there", type: "text"},
                        ],
                    ],
                },
            ]);

            var parsed2 = blockParse("* hi * there\n\n");
            validateParse(parsed2, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [
                            {content: "hi ", type: "text"},
                            {content: "* there", type: "text"},
                        ],
                    ],
                },
            ]);

            var parsed3 = blockParse("1. hi 1. there\n\n");
            validateParse(parsed3, [
                {
                    type: "list",
                    ordered: true,
                    start: 1,
                    items: [
                        [
                            {content: "hi 1", type: "text"},
                            {content: ". there", type: "text"},
                        ],
                    ],
                },
            ]);
        });

        it("should ignore double spaces at the end of lists", function () {
            var parsed = blockParse(" * hi  \n * there\n\n");
            validateParse(parsed, [
                {
                    type: "list",
                    ordered: false,
                    start: undefined,
                    items: [
                        [{type: "text", content: "hi"}],
                        [{type: "text", content: "there"}],
                    ],
                },
            ]);
        });

        it("should parse very simple tables", function () {
            var expected = [
                {
                    type: "table",
                    header: [
                        [{type: "text", content: "h1"}],
                        [{type: "text", content: "h2"}],
                        [{type: "text", content: "h3"}],
                    ],
                    align: /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                        null,
                        null,
                        null,
                    ]),
                    cells: [
                        [
                            [{type: "text", content: "d1"}],
                            [{type: "text", content: "d2"}],
                            [{type: "text", content: "d3"}],
                        ],
                        [
                            [{type: "text", content: "e1"}],
                            [{type: "text", content: "e2"}],
                            [{type: "text", content: "e3"}],
                        ],
                    ],
                },
            ];

            var parsedPiped = blockParse(
                "| h1 | h2 | h3 |\n" +
                    "| -- | -- | -- |\n" +
                    "| d1 | d2 | d3 |\n" +
                    "| e1 | e2 | e3 |\n" +
                    "\n",
            );
            validateParse(parsedPiped, expected);

            var parsedNp = blockParse(
                "h1 | h2 | h3\n" +
                    "- | - | -\n" +
                    "d1 | d2 | d3\n" +
                    "e1 | e2 | e3\n" +
                    "\n",
            );
            validateParse(parsedNp, expected);
        });

        it("should parse inside table contents", function () {
            var expected = [
                {
                    type: "table",
                    header: [
                        [
                            {
                                type: "em",
                                content: [{type: "text", content: "h1"}],
                            },
                        ],
                        [
                            {
                                type: "em",
                                content: [{type: "text", content: "h2"}],
                            },
                        ],
                        [
                            {
                                type: "em",
                                content: [{type: "text", content: "h3"}],
                            },
                        ],
                    ],
                    align: /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                        null,
                        null,
                        null,
                    ]),
                    cells: [
                        [
                            [
                                {
                                    type: "em",
                                    content: [{type: "text", content: "d1"}],
                                },
                            ],
                            [
                                {
                                    type: "em",
                                    content: [{type: "text", content: "d2"}],
                                },
                            ],
                            [
                                {
                                    type: "em",
                                    content: [{type: "text", content: "d3"}],
                                },
                            ],
                        ],
                    ],
                },
            ];

            var parsedPiped = blockParse(
                "| *h1* | *h2* | *h3* |\n" +
                    "| ---- | ---- | ---- |\n" +
                    "| *d1* | *d2* | *d3* |\n" +
                    "\n",
            );
            validateParse(parsedPiped, expected);

            var parsedNp = blockParse(
                "*h1* | *h2* | *h3*\n" +
                    "-|-|-\n" +
                    "*d1* | *d2* | *d3*\n" +
                    "\n",
            );
            validateParse(parsedNp, expected);
        });

        it("should parse table alignments", function () {
            /**
             * @param {string} tableSrc
             * @param {Array<SimpleMarkdown.TableAlignment>} expectedAligns
             */
            var validateAligns = function (tableSrc, expectedAligns) {
                var parsed = blockParse(tableSrc + "\n");
                assert.strictEqual(parsed[0].type, "table");
                var actualAligns = parsed[0].align;
                validateParse(actualAligns, expectedAligns);
            };

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                    "| -- | -- | -- |\n" +
                    "| d1 | d2 | d3 |\n",
                /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                    null,
                    null,
                    null,
                ]),
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                    "|:--:|:-: | :-: |\n" +
                    "| d1 | d2 | d3 |\n",
                ["center", "center", "center"],
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                    "| :- |:---| :--|\n" +
                    "| d1 | d2 | d3 |\n",
                ["left", "left", "left"],
            );

            validateAligns(
                "| h1 | h2 | h3 |\n" +
                    "| -: |-:  |  -:|\n" +
                    "| d1 | d2 | d3 |\n",
                ["right", "right", "right"],
            );

            validateAligns(
                "h1 | h2 | h3\n" + ":-|:-:|-:\n" + "d1 | d2 | d3\n",
                ["left", "center", "right"],
            );

            validateAligns(
                "h1 | h2 | h3\n" + " :---:  |:--|    --:\n" + "d1 | d2 | d3\n",
                ["center", "left", "right"],
            );
        });

        it("should parse empty table cells", function () {
            var expected = [
                {
                    type: "table",
                    header: /** @type {any[][]} */ ([[], [], []]),
                    align: /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                        null,
                        null,
                        null,
                    ]),
                    cells: /** @type {any[][]} */ ([
                        [[], [], []],
                        [[], [], []],
                    ]),
                },
            ];

            var parsedPiped = blockParse(
                "|    |    |    |\n" +
                    "| -- | -- | -- |\n" +
                    "|    |    |    |\n" +
                    "|    |    |    |\n" +
                    "\n",
            );
            validateParse(parsedPiped, expected);

            var parsedNp = blockParse(
                "   |    |   \n" +
                    "- | - | -\n" +
                    "   |    |   \n" +
                    "   |    |   \n" +
                    "\n",
            );
            validateParse(parsedNp, expected);
        });

        it("should allow escaping pipes inside tables", function () {
            var expected = [
                {
                    type: "table",
                    header: [
                        [
                            {type: "text", content: "|"},
                            {type: "text", content: "Attribute"},
                            {type: "text", content: "|"},
                        ],
                        [
                            {type: "text", content: "|"},
                            {type: "text", content: "Type"},
                            {type: "text", content: "|"},
                        ],
                    ],
                    align: /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                        null,
                        null,
                    ]),
                    cells: [
                        [
                            [
                                {type: "text", content: "pos"},
                                {type: "text", content: "|"},
                                {type: "text", content: "position"},
                            ],
                            [
                                {type: "text", content: '"left'},
                                {type: "text", content: '" '},
                                {type: "text", content: "|"},
                                {type: "text", content: " "},
                                {type: "text", content: '"right'},
                                {type: "text", content: '"'},
                            ],
                        ],
                    ],
                },
            ];

            var parsedPiped = blockParse(
                "| \\|Attribute\\| | \\|Type\\|         |\n" +
                    "| --------------- | ------------------ |\n" +
                    '| pos\\|position  | "left" \\| "right" |\n' +
                    "\n",
            );
            validateParse(parsedPiped, expected);

            var parsedNp = blockParse(
                "\\|Attribute\\| | \\|Type\\|        \n" +
                    "--------------- | ------------------\n" +
                    'pos\\|position  | "left" \\| "right"\n' +
                    "\n",
            );
            validateParse(parsedNp, expected);
        });

        it("should allow pipes in code inside tables", function () {
            var expected = [
                {
                    type: "table",
                    header: [
                        [{type: "text", content: "Attribute"}],
                        [{type: "text", content: "Type"}],
                    ],
                    align: /** @type {Array<SimpleMarkdown.TableAlignment>} */ ([
                        null,
                        null,
                    ]),
                    cells: [
                        [
                            [{type: "inlineCode", content: "position"}],
                            [{type: "inlineCode", content: '"left" | "right"'}],
                        ],
                    ],
                },
            ];

            var parsedPiped = blockParse(
                "| Attribute    | Type                  |\n" +
                    "| ------------ | --------------------- |\n" +
                    '| `position`   | `"left" | "right"`   |\n' +
                    "\n",
            );
            validateParse(parsedPiped, expected);

            var parsedNp = blockParse(
                "Attribute    | Type                 \n" +
                    "------------ | ---------------------\n" +
                    '`position`   | `"left" | "right"`\n' +
                    "\n",
            );
            validateParse(parsedNp, expected);
        });

        it("should be able to parse <br>s", function () {
            // Inside a paragraph:
            var parsed = blockParse("hi  \nbye\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [
                        {content: "hi", type: "text"},
                        {type: "br"},
                        {content: "bye", type: "text"},
                    ],
                },
            ]);

            // Outside a paragraph:
            var parsed2 = inlineParse("hi  \nbye");
            validateParse(parsed2, [
                {content: "hi", type: "text"},
                {type: "br"},
                {content: "bye", type: "text"},
            ]);

            // But double spaces on the same line shouldn't count:
            var parsed3 = inlineParse("hi  bye");
            validateParse(parsed3, [{content: "hi  bye", type: "text"}]);
        });

        it("should parse unicode characters in a word", function () {
            var parsed = inlineParse("string with parse öppurtunitiés");
            validateParse(parsed, [
                {
                    type: "text",
                    content: "string with parse öppurtunitiés",
                },
            ]);
        });
    });

    describe("preprocess step", function () {
        it("should strip `\\f`s", function () {
            var parsed = blockParse("hi\n\n\fbye\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{content: "hi", type: "text"}],
                },
                {
                    type: "paragraph",
                    content: [{content: "bye", type: "text"}],
                },
            ]);

            var parsed2 = blockParse("hi\n\f\nbye\n\n");
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [{content: "hi", type: "text"}],
                },
                {
                    type: "paragraph",
                    content: [{content: "bye", type: "text"}],
                },
            ]);
        });

        it("should handle \\r nicely", function () {
            var parsed = blockParse("hi\r\nbye\n\n");
            validateParse(parsed, [
                {
                    type: "paragraph",
                    content: [{content: "hi\nbye", type: "text"}],
                },
            ]);

            var parsed2 = blockParse("hi\r\rbye\n\n");
            validateParse(parsed2, [
                {
                    type: "paragraph",
                    content: [{content: "hi", type: "text"}],
                },
                {
                    type: "paragraph",
                    content: [{content: "bye", type: "text"}],
                },
            ]);
        });

        it("should treat \\t as four spaces", function () {
            var parsed = blockParse("\tcode\n\n");
            validateParse(parsed, [
                {
                    type: "codeBlock",
                    lang: undefined,
                    content: "code",
                },
            ]);
        });
    });

    describe("parser extension api", function () {
        it("should parse a simple %variable% extension", function () {
            var percentVarRule = {
                match: function (/** @type {string} */ source) {
                    return /^%([\s\S]+?)%/.exec(source);
                },

                order: SimpleMarkdown.defaultRules.em.order + 0.5,

                parse: function (
                    /** @type {SimpleMarkdown.Capture} */ capture,
                    /** @type {SimpleMarkdown.Parser} */ parse,
                    /** @type {SimpleMarkdown.State} */ state,
                ) {
                    return {
                        content: capture[1],
                    };
                },
            };

            var rules = Object.assign({}, SimpleMarkdown.defaultRules, {
                percentVar: percentVarRule,
            });

            // $FlowFixMe
            var rawBuiltParser = SimpleMarkdown.parserFor(rules);

            /** @type {SimpleMarkdown.Parser} */
            var inlineParse = function (source) {
                return rawBuiltParser(source, {inline: true});
            };

            var parsed = inlineParse("Hi %name%!");

            validateParse(parsed, [
                {content: "Hi ", type: "text"},
                {content: "name", type: "percentVar"},
                {content: "!", type: "text"},
            ]);
        });

        describe("should sort rules by order and name", function () {
            var emRule = {
                match: SimpleMarkdown.inlineRegex(/^_([\s\S]+?)_/),
                parse: function (
                    /** @type {SimpleMarkdown.Capture} */ capture,
                    /** @type {SimpleMarkdown.Parser} */ parse,
                    /** @type {SimpleMarkdown.State} */ state,
                ) {
                    return {
                        content: capture[1],
                    };
                },
            };
            var strongRule = {
                match: SimpleMarkdown.defaultRules.strong.match,
                parse: function (
                    /** @type {SimpleMarkdown.Capture} */ capture,
                    /** @type {SimpleMarkdown.Parser} */ parse,
                    /** @type {SimpleMarkdown.State} */ state,
                ) {
                    return {
                        content: capture[1],
                    };
                },
            };
            var textRule = Object.assign({}, SimpleMarkdown.defaultRules.text, {
                order: 10,
            });

            it("should sort rules by order", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 1,
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em1"}]);

                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 1,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em2"}]);
            });

            it("should allow fractional orders", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 1.4,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0.9,
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em2"}]);

                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0.5,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em2"}]);
            });

            it("should allow negative orders", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: -1,
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em2"}]);

                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: -2,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 1,
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em1"}]);
            });

            it("should break ties by rule name", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em1"}]);

                // ...regardless of their order in the
                // original rule definition
                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em2: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    em1: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em1"}]);
            });

            it("should output a warning for non-numeric orders", function () {
                var oldconsolewarn = console.warn;
                /** @type {any[]} */
                var warnings = [];
                /*::FLOW_IGNORE_COVARIANCE.*/ console.warn = function (
                    /** @type {any} */ warning,
                ) {
                    warnings.push(warning);
                };

                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 1 / 0 - 1 / 0,
                    }),
                    text: textRule,
                });

                assert.strictEqual(warnings.length, 1);
                assert.strictEqual(
                    warnings[0],
                    "simple-markdown: Invalid order for rule `em1`: NaN",
                );

                /*::FLOW_IGNORE_COVARIANCE.*/ console.warn = oldconsolewarn;
            });

            it("should break ties with quality", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0,
                        quality: function () {
                            return 1;
                        },
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0,
                        quality: function () {
                            return 2;
                        },
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em2"}]);

                // ...regardless of their order in the
                // original rule definition

                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em2: Object.assign({}, emRule, {
                        order: 0,
                        quality: function () {
                            return 2;
                        },
                    }),
                    em1: Object.assign({}, emRule, {
                        order: 0,
                        quality: function () {
                            return 1;
                        },
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em2"}]);
            });

            it("rules with quality should always win the tie", function () {
                // $FlowFixMe
                var parser1 = SimpleMarkdown.parserFor({
                    em1: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    em2: Object.assign({}, emRule, {
                        order: 0,
                        quality: function () {
                            return 2;
                        },
                    }),
                    text: textRule,
                });

                var parsed1 = parser1("_hi_", {inline: true});
                validateParse(parsed1, [{content: "hi", type: "em2"}]);

                // except if they don't match

                // $FlowFixMe
                var parser2 = SimpleMarkdown.parserFor({
                    em: Object.assign({}, emRule, {
                        order: 0,
                    }),
                    strong: Object.assign({}, strongRule, {
                        order: 0,
                        quality: function () {
                            return 2;
                        },
                    }),
                    text: textRule,
                });

                var parsed2 = parser2("_hi_", {inline: true});
                validateParse(parsed2, [{content: "hi", type: "em"}]);
                var parsed2b = parser2("**hi**", {inline: true});
                validateParse(parsed2b, [{content: "hi", type: "strong"}]);
            });
        });

        it("should append arrays returned from `parse` to the AST", function () {
            var parser1 = SimpleMarkdown.parserFor({
                fancy: {
                    order: SimpleMarkdown.defaultRules.text.order - 1,

                    // $FlowFixMe
                    match: function (/** @type {string} */ source) {
                        return /^.*/.exec(source);
                    },
                    parse: function (
                        /** @type {SimpleMarkdown.Capture} */ capture,
                        /** @type {SimpleMarkdown.Parser} */ parse,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        return capture[0]
                            .split(" ")
                            .map(function (/** @type {string} */ word) {
                                return {type: "text", content: word};
                            });
                    },
                },
                text: SimpleMarkdown.defaultRules.text,
            });

            var parsed1 = parser1("this is some text", {inline: true});
            validateParse(parsed1, [
                {content: "this", type: "text"},
                {content: "is", type: "text"},
                {content: "some", type: "text"},
                {content: "text", type: "text"},
            ]);
        });

        it("should support [repeated] data extraction via mutating state", function () {
            // This is sort of a more complex example than is necessary,  but I
            // wanted to have some more in-depth tests, so here!
            // This result counts the words in input/output through state, and also
            // gives a flattened array result of the words.
            var rules = {
                Array: {
                    result: function (
                        /** @type {Array<SimpleMarkdown.SingleASTNode>} */ arr,
                        /** @type {SimpleMarkdown.Output<string[]>} */ output,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        return arr
                            .map(function (node) {
                                return output(node, state);
                            })
                            .filter(function (word) {
                                return !!word;
                            });
                    },
                },
                word: {
                    order: SimpleMarkdown.defaultRules.text.order - 1,
                    match: function (/** @type {string} */ source) {
                        return /^\w+/.exec(source);
                    },
                    parse: function (
                        /** @type {SimpleMarkdown.Capture} */ capture,
                        /** @type {SimpleMarkdown.Parser} */ parse,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        state.wordCount++;
                        return {content: capture[0]};
                    },
                    result: function (
                        /** @type {SimpleMarkdown.SingleASTNode} */ node,
                        /** @type {SimpleMarkdown.NodeOutput<string>} */ output,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        state.wordCount++;
                        return node.content;
                    },
                },
                // $FlowFixMe
                delimiter: Object.assign({}, SimpleMarkdown.defaultRules.text, {
                    match: function (/** @type {string} */ source) {
                        return /^\W+/.exec(source);
                    },
                    result: function (
                        /** @type {SimpleMarkdown.SingleASTNode} */ node,
                        /** @type {SimpleMarkdown.NodeOutput<string>} */ output,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        return null;
                    },
                }),
            };

            // $FlowFixMe
            var parse = SimpleMarkdown.parserFor(rules, {wordCount: 0});
            var output = SimpleMarkdown.outputFor(rules, "result", {
                wordCount: 0,
            });

            // test parsing
            /** @type {{ wordCount?: number }} */
            var parseState = {};
            var ast1 = parse("hi here are some words", parseState);
            assert.strictEqual(parseState.wordCount, 5);
            // and repeated parsing
            var ast2 = parse("hi here are some words", parseState);
            assert.strictEqual(parseState.wordCount, 5);
            assert.deepEqual(ast1, ast2);

            // test output
            /** @type {{ wordCount?: number }} */
            var outputState = {};
            var result1 = output(ast1, outputState);
            assert.deepEqual(result1, ["hi", "here", "are", "some", "words"]);
            assert.strictEqual(outputState.wordCount, 5);
            var result2 = output(ast2, outputState);
            assert.strictEqual(outputState.wordCount, 5);
            assert.deepEqual(result2, ["hi", "here", "are", "some", "words"]);
            assert.deepEqual(result1, result2);
        });

        it("should allow default state params in parserFor", function () {
            var parser1 = SimpleMarkdown.parserFor(
                // $FlowFixMe
                {
                    fancy: {
                        order: SimpleMarkdown.defaultRules.text.order - 1,
                        // $FlowFixMe
                        match: function (/** @type {string} */ source) {
                            return /^\w+/.exec(source);
                        },
                        parse: function (
                            /** @type {SimpleMarkdown.Capture} */ capture,
                            /** @type {SimpleMarkdown.Parser} */ parse,
                            /** @type {SimpleMarkdown.State} */ state,
                        ) {
                            var word = capture[0];
                            var translated = state.lookup[word];
                            if (translated) {
                                return {content: translated};
                            } else {
                                return {content: word, type: "text"};
                            }
                        },
                    },
                    // $FlowFixMe
                    text: Object.assign({}, SimpleMarkdown.defaultRules.text, {
                        match: function (/** @type {string} */ source) {
                            return /^\W+/.exec(source);
                        },
                    }),
                },
                {
                    lookup: {
                        this: "thís",
                        is: "ìs",
                        text: "têxt",
                    },
                },
            );

            var parsed1 = parser1("this is some text", {inline: true});
            validateParse(parsed1, [
                {content: "thís", type: "fancy"},
                {content: " ", type: "text"},
                {content: "ìs", type: "fancy"},
                {content: " ", type: "text"},
                {content: "some", type: "text"},
                {content: " ", type: "text"},
                {content: "têxt", type: "fancy"},
            ]);
        });

        it("should allow default state params in outputFor", function () {
            var output = SimpleMarkdown.outputFor(
                {
                    // $FlowFixMe[incompatible-call]
                    Array: SimpleMarkdown.defaultRules.Array,
                    text: Object.assign({}, SimpleMarkdown.defaultRules.text, {
                        react: function (
                            /** @type {SimpleMarkdown.SingleASTNode} */ node,
                            /** @type {SimpleMarkdown.ReactNodeOutput} */ output,
                            /** @type {SimpleMarkdown.State} */ state,
                        ) {
                            return React.createElement(
                                state.TextComponent,
                                {key: state.key},
                                node.content,
                            );
                        },
                    }),
                },
                "react",
                {
                    // make all text bold
                    TextComponent: "b",
                },
            );

            var parsed1 = inlineParse("this is some text");
            var results1 = output(parsed1);

            assert.strictEqual(
                reactToHtml(results1),
                "<b>this is some text</b>",
            );
        });

        it("should not require passing state to recursiveParse", function () {
            var parse = SimpleMarkdown.parserFor(
                {
                    bracketed: {
                        order: SimpleMarkdown.defaultRules.text.order - 1,
                        // $FlowFixMe
                        match: function (/** @type {string} */ source) {
                            return /^\{((?:\\[\S\s]|[^\\\*])+)\}/.exec(source);
                        },
                        parse: function (
                            /** @type {SimpleMarkdown.Capture} */ capture,
                            /** @type {SimpleMarkdown.Parser} */ parse,
                            /** @type {SimpleMarkdown.State} */ state,
                        ) {
                            var result = {
                                // note no passing state here:
                                content: parse(capture[1]),
                                token: state.token || 0,
                            };
                            state.token = (state.token || 0) + 1;
                            return result;
                        },
                    },
                    text: SimpleMarkdown.defaultRules.text,
                },
                {disableAutoBlockNewlines: true},
            );

            var parsed1 = parse("{outer {inner}}", {inline: true, token: 5327});

            validateParse(parsed1, [
                {
                    type: "bracketed",
                    content: [
                        {
                            type: "text",
                            content: "outer ",
                        },
                        {
                            type: "bracketed",
                            content: [
                                {
                                    type: "text",
                                    content: "inner",
                                },
                            ],
                            token: 5327,
                        },
                    ],
                    token: 5328,
                },
            ]);

            // but shouldn't keep old state around between parses:
            var parsed2 = parse("{outer {inner}}");

            validateParse(parsed2, [
                {
                    type: "bracketed",
                    content: [
                        {
                            type: "text",
                            content: "outer ",
                        },
                        {
                            type: "bracketed",
                            content: [
                                {
                                    type: "text",
                                    content: "inner",
                                },
                            ],
                            token: 0,
                        },
                    ],
                    token: 1,
                },
            ]);
        });

        it("should not require passing state to recursiveOutput", function () {
            var output = SimpleMarkdown.outputFor(
                {
                    // $FlowFixMe[incompatible-call]
                    Array: SimpleMarkdown.defaultRules.Array,
                    paragraph: Object.assign(
                        {},
                        SimpleMarkdown.defaultRules.paragraph,
                        {
                            html: function (
                                /** @type {SimpleMarkdown.SingleASTNode} */ node,
                                /** @type {SimpleMarkdown.HtmlOutput} */ output,
                            ) {
                                return "<p>" + output(node.content) + "</p>";
                            },
                        },
                    ),
                    text: Object.assign({}, SimpleMarkdown.defaultRules.text, {
                        html: function (
                            /** @type {SimpleMarkdown.SingleASTNode} */ node,
                            /** @type {SimpleMarkdown.HtmlOutput} */ output,
                            /** @type {SimpleMarkdown.State} */ state,
                        ) {
                            return (
                                '<span class="' +
                                (state.spanClass || "default") +
                                '">' +
                                /*SimpleMarkdown.sanitizeText*/ node.content +
                                "</span>"
                            );
                        },
                    }),
                },
                "html",
            );

            var parsed1 = SimpleMarkdown.defaultBlockParse("hi there!");
            var result1 = output(parsed1, {spanClass: "special"});
            assert.strictEqual(
                result1,
                '<p><span class="special">hi there!</span></p>',
            );

            // but shouldn't keep state around between outputs:
            var parsed2 = SimpleMarkdown.defaultBlockParse("hi there!");
            var result2 = output(parsed2);
            assert.strictEqual(
                result2,
                '<p><span class="default">hi there!</span></p>',
            );
        });

        it("should ignore null or undefined rules", function () {
            var rules = {
                Array: SimpleMarkdown.defaultRules.Array,
                spoiler: {
                    order: SimpleMarkdown.defaultRules.text.order - 1,
                    match: function (/** @type {string} */ source) {
                        return /^\[\[((?:[^\]]|\][^\]])+)\]\]/.exec(source);
                    },
                    parse: function (
                        /** @type {SimpleMarkdown.Capture} */ capture,
                        /** @type {SimpleMarkdown.Parser} */ parse,
                    ) {
                        return {content: parse(capture[1])};
                    },
                    html: function (
                        /** @type {SimpleMarkdown.SingleASTNode} */ node,
                        /** @type {SimpleMarkdown.HtmlOutput} */ output,
                    ) {
                        return (
                            '<span style="background: black;">' +
                            output(node.content) +
                            "</span>"
                        );
                    },
                },
                text: SimpleMarkdown.defaultRules.text,
            };

            // $FlowFixMe
            var parse = SimpleMarkdown.parserFor(rules, {inline: true});
            var output = SimpleMarkdown.outputFor(rules, "html");

            var parsed1 = parse("Hi this is a [[spoiler]]");
            validateParse(parsed1, [
                {type: "text", content: "Hi this is a "},
                {
                    type: "spoiler",
                    content: [{type: "text", content: "spoiler"}],
                },
            ]);
            var result1 = output(parsed1);
            assert.strictEqual(
                result1,
                'Hi this is a <span style="background: black;">spoiler</span>',
            );
        });
    });

    describe("react output", function () {
        it("should sanitize dangerous links", function () {
            var html = htmlFromReactMarkdown(
                "[link](javascript:alert%28%27hi%27%29)",
            );
            assert.strictEqual(html, "<a>link</a>");

            var html2 = htmlFromReactMarkdown(
                "[link][1]\n\n" + "[1]: javascript:alert('hi');\n\n",
            );
            assert.strictEqual(
                html2,
                '<div class="paragraph"><a>link</a></div>',
            );

            var html3 = htmlFromReactMarkdown(
                "[link](data:text/html;base64,PHNjcmlwdD5hbGVydCgnaGknKTwvc2NyaXB0Pg==)",
            );
            assert.strictEqual(html3, "<a>link</a>");

            var html4 = htmlFromReactMarkdown(
                "[link][1]\n\n" +
                    "[1]: data:text/html;base64,PHNjcmlwdD5hbGVydCgnaGknKTwvc2NyaXB0Pg==\n\n",
            );
            assert.strictEqual(
                html4,
                '<div class="paragraph"><a>link</a></div>',
            );

            var html5 = htmlFromReactMarkdown("[link](vbscript:alert)");
            assert.strictEqual(html5, "<a>link</a>");

            var html6 = htmlFromReactMarkdown(
                "[link][1]\n\n" + "[1]: vbscript:alert\n\n",
            );
            assert.strictEqual(
                html6,
                '<div class="paragraph"><a>link</a></div>',
            );
        });

        it("should not sanitize safe links", function () {
            var html = htmlFromReactMarkdown("[link](https://www.google.com)");
            assert.strictEqual(
                html,
                '<a href="https://www.google.com">link</a>',
            );

            var html2 = htmlFromReactMarkdown(
                "[link][1]\n\n" + "[1]: https://www.google.com\n\n",
            );
            assert.strictEqual(
                html2,
                '<div class="paragraph">' +
                    '<a href="https://www.google.com">link</a>' +
                    "</div>",
            );
        });

        it("should output headings", function () {
            assertParsesToReact("### Heading!\n\n", "<h3>Heading!</h3>");

            assertParsesToReact("## hi! ##\n\n", "<h2>hi!</h2>");

            assertParsesToReact("Yay!\n====\n\n", "<h1>Yay!</h1>");

            assertParsesToReact("Success\n---\n\n", "<h2>Success</h2>");
        });

        it("should output hrs", function () {
            assertParsesToReact("-----\n\n", "<hr/>");
            assertParsesToReact(" * * * \n\n", "<hr/>");
            assertParsesToReact("___\n\n", "<hr/>");
        });

        it("should output codeblocks", function () {
            var html = htmlFromReactMarkdown(
                "    var microwave = new TimeMachine();\n\n",
            );
            assert.strictEqual(
                html,
                "<pre><code>var microwave = new TimeMachine();</code></pre>",
            );

            var html2 = htmlFromReactMarkdown(
                "~~~\n" + "var computer = new IBN(5100);\n" + "~~~\n\n",
            );
            assert.strictEqual(
                html2,
                "<pre><code>var computer = new IBN(5100);</code></pre>",
            );

            var html3 = htmlFromReactMarkdown(
                "```yavascript\n" +
                    "var undefined = function() { return 5; }" +
                    "```\n\n",
            );
            assert.strictEqual(
                html3,
                '<pre><code class="markdown-code-yavascript">' +
                    "var undefined = function() { return 5; }" +
                    "</code></pre>",
            );
        });

        it("should output blockQuotes", function () {
            assertParsesToReact(
                "> hi there this is a\ntest\n\n",
                '<blockquote><div class="paragraph">' +
                    "hi there this is a test" +
                    "</div></blockquote>",
            );

            assertParsesToReact(
                "> hi there this is a\n> test\n\n",
                '<blockquote><div class="paragraph">' +
                    "hi there this is a test" +
                    "</div></blockquote>",
            );
        });

        it("should output lists", function () {
            assertParsesToReact(
                " * first\n" + " * second\n" + " * third\n\n",
                "<ul>" +
                    "<li>first</li>" +
                    "<li>second</li>" +
                    "<li>third</li>" +
                    "</ul>",
            );

            assertParsesToReact(
                "1. first\n" + "2. second\n" + "3. third\n\n",
                '<ol start="1">' +
                    "<li>first</li>" +
                    "<li>second</li>" +
                    "<li>third</li>" +
                    "</ol>",
            );

            assertParsesToReact(
                " * first\n" + " * second\n" + "    * inner\n" + " * third\n\n",
                "<ul>" +
                    "<li>first</li>" +
                    "<li>second <ul><li>inner</li></ul></li>" +
                    "<li>third</li>" +
                    "</ul>",
            );
        });

        it("should output tables", function () {
            assertParsesToReact(
                "h1 | h2 | h3\n" + "---|----|---\n" + "d1 | d2 | d3\n" + "\n",
                "<table><thead>" +
                    '<tr><th scope="col">h1</th><th scope="col">h2</th><th scope="col">h3</th></tr>' +
                    "</thead><tbody>" +
                    "<tr><td>d1</td><td>d2</td><td>d3</td></tr>" +
                    "</tbody></table>",
            );

            assertParsesToReact(
                "| h1 | h2 | h3 |\n" +
                    "|----|----|----|\n" +
                    "| d1 | d2 | d3 |\n" +
                    "\n",
                "<table><thead>" +
                    '<tr><th scope="col">h1</th><th scope="col">h2</th><th scope="col">h3</th></tr>' +
                    "</thead><tbody>" +
                    "<tr><td>d1</td><td>d2</td><td>d3</td></tr>" +
                    "</tbody></table>",
            );

            assertParsesToReact(
                "h1 | h2 | h3\n" + ":--|:--:|--:\n" + "d1 | d2 | d3\n" + "\n",
                "<table><thead>" +
                    "<tr>" +
                    '<th style="text-align:left" scope="col">h1</th>' +
                    '<th style="text-align:center" scope="col">h2</th>' +
                    '<th style="text-align:right" scope="col">h3</th>' +
                    "</tr>" +
                    "</thead><tbody>" +
                    "<tr>" +
                    '<td style="text-align:left">d1</td>' +
                    '<td style="text-align:center">d2</td>' +
                    '<td style="text-align:right">d3</td>' +
                    "</tr>" +
                    "</tbody></table>",
            );
        });

        // TODO(aria): Figure out how to test the newline rule here

        it("should output paragraphs", function () {
            var html = htmlFromReactMarkdown("hi\n\n");
            assert.strictEqual(html, '<div class="paragraph">hi</div>');

            var html2 = htmlFromReactMarkdown("hi\n\n" + "bye\n\n");
            assert.strictEqual(
                html2,
                '<div class="paragraph">hi</div>' +
                    '<div class="paragraph">bye</div>',
            );
        });

        it("should output escaped text", function () {
            assertParsesToReact(
                "\\#escaping\\^symbols\\*is\\[legal](yes)",
                "#escaping^symbols*is[legal](yes)",
            );
        });

        it("should output links", function () {
            assertParsesToReact(
                "<https://www.khanacademy.org>",
                '<a href="https://www.khanacademy.org">' +
                    "https://www.khanacademy.org" +
                    "</a>",
            );

            assertParsesToReact(
                "<aria@khanacademy.org>",
                '<a href="mailto:aria@khanacademy.org">' +
                    "aria@khanacademy.org" +
                    "</a>",
            );

            assertParsesToReact(
                "https://www.khanacademy.org",
                '<a href="https://www.khanacademy.org">' +
                    "https://www.khanacademy.org" +
                    "</a>",
            );

            assertParsesToReact(
                "[KA](https://www.khanacademy.org)",
                '<a href="https://www.khanacademy.org">' + "KA" + "</a>",
            );

            assertParsesToReact(
                "[KA][1]\n\n[1]: https://www.khanacademy.org\n\n",
                '<div class="paragraph">' +
                    '<a href="https://www.khanacademy.org">' +
                    "KA" +
                    "</a>" +
                    "</div>",
            );
        });

        it("should output strong", function () {
            assertParsesToReact("**bold**", "<strong>bold</strong>");
        });

        it("should output u", function () {
            assertParsesToReact("__underscore__", "<u>underscore</u>");
        });

        it("should output em", function () {
            assertParsesToReact("*italics*", "<em>italics</em>");
        });

        it("should output simple combined bold/italics", function () {
            assertParsesToReact(
                "***bolditalics***",
                "<em><strong>bolditalics</strong></em>",
            );
            assertParsesToReact(
                "**bold *italics***",
                "<strong>bold <em>italics</em></strong>",
            );
        });

        it("should output complex combined bold/italics", function () {
            assertParsesToReact(
                "***bold** italics*",
                "<em><strong>bold</strong> italics</em>",
            );
            assertParsesToReact(
                "*hi **there you***",
                "<em>hi <strong>there you</strong></em>",
            );
        });

        it("should output del", function () {
            assertParsesToReact(
                "~~strikethrough~~",
                "<del>strikethrough</del>",
            );
        });

        it("should output inline code", function () {
            assertParsesToReact(
                "here is some `inline code`.",
                "here is some <code>inline code</code>.",
            );
        });

        it("should output text", function () {
            assertParsesToReact("Yay text!", "Yay text!");
        });

        it("shouldn't split text into multiple spans", function () {
            var parsed = SimpleMarkdown.defaultInlineParse("hi, there!");
            var elements = SimpleMarkdown.defaultReactOutput(parsed);
            assert.deepEqual(elements, ["hi, there!"]);
        });

        it("should join text nodes before outputting them", function () {
            var rules = Object.assign({}, SimpleMarkdown.defaultRules, {
                text: Object.assign({}, SimpleMarkdown.defaultRules.text, {
                    react: function (
                        /** @type {SimpleMarkdown.SingleASTNode} */ node,
                        /** @type {SimpleMarkdown.ReactOutput} */ output,
                        /** @type {SimpleMarkdown.State} */ state,
                    ) {
                        return React.createElement(
                            "span",
                            {key: state.key, className: "text"},
                            node.content,
                        );
                    },
                }),
            });

            // $FlowFixMe[incompatible-call]
            var output = SimpleMarkdown.outputFor(rules, "react");

            var parsed = SimpleMarkdown.defaultInlineParse("Hi! You! Are! <3!");

            var html = reactToHtml(output(parsed));

            assert.strictEqual(
                html,
                '<span class="text">Hi! You! Are! &lt;3!</span>',
            );
        });
    });

    describe("html output", function () {
        it("should sanitize dangerous links", function () {
            var markdown = "[link](javascript:alert%28%27hi%27%29)";
            assertParsesToHtml(markdown, "<a>link</a>");

            var markdown2 =
                "[link][1]\n\n" + "[1]: javascript:alert('hi');\n\n";
            assertParsesToHtml(
                markdown2,
                '<div class="paragraph"><a>link</a></div>',
            );

            var markdown3 =
                "[link](data:text/html;base64,PHNjcmlwdD5hbGVydCgnaGknKTwvc2NyaXB0Pg==)";
            assertParsesToHtml(markdown3, "<a>link</a>");

            var markdown4 =
                "[link][1]\n\n" +
                "[1]: data:text/html;base64,PHNjcmlwdD5hbGVydCgnaGknKTwvc2NyaXB0Pg==\n\n";
            assertParsesToHtml(
                markdown4,
                '<div class="paragraph"><a>link</a></div>',
            );

            var markdown5 = "[link](vbscript:alert)";
            assertParsesToHtml(markdown5, "<a>link</a>");

            var markdown6 = "[link][1]\n\n" + "[1]: vbscript:alert\n\n";
            assertParsesToHtml(
                markdown6,
                '<div class="paragraph"><a>link</a></div>',
            );
        });

        it("should not sanitize safe links", function () {
            var html = htmlFromMarkdown("[link](https://www.google.com)");
            assert.strictEqual(
                html,
                '<a href="https://www.google.com">link</a>',
            );

            var html2 = htmlFromMarkdown(
                "[link][1]\n\n" + "[1]: https://www.google.com\n\n",
            );
            assert.strictEqual(
                html2,
                '<div class="paragraph">' +
                    '<a href="https://www.google.com">link</a>' +
                    "</div>",
            );
        });

        it("should output headings", function () {
            assertParsesToHtml("### Heading!\n\n", "<h3>Heading!</h3>");

            assertParsesToHtml("## hi! ##\n\n", "<h2>hi!</h2>");

            assertParsesToHtml("Yay!\n====\n\n", "<h1>Yay!</h1>");

            assertParsesToHtml("Success\n---\n\n", "<h2>Success</h2>");
        });

        it("should output hrs", function () {
            assertParsesToHtml("-----\n\n", "<hr>");
            assertParsesToHtml(" * * * \n\n", "<hr>");
            assertParsesToHtml("___\n\n", "<hr>");
        });

        it("should output codeblocks", function () {
            var html = htmlFromMarkdown(
                "    var microwave = new TimeMachine();\n\n",
            );
            assert.strictEqual(
                html,
                "<pre><code>var microwave = new TimeMachine();</code></pre>",
            );

            var html2 = htmlFromMarkdown(
                "~~~\n" + "var computer = new IBN(5100);\n" + "~~~\n\n",
            );
            assert.strictEqual(
                html2,
                "<pre><code>var computer = new IBN(5100);</code></pre>",
            );

            var html3 = htmlFromMarkdown(
                "```yavascript\n" +
                    "var undefined = function() { return 5; }" +
                    "```\n\n",
            );
            assert.strictEqual(
                html3,
                '<pre><code class="markdown-code-yavascript">' +
                    "var undefined = function() { return 5; }" +
                    "</code></pre>",
            );
        });

        it("should output blockQuotes", function () {
            assertParsesToHtml(
                "> hi there this is a\ntest\n\n",
                '<blockquote><div class="paragraph">' +
                    "hi there this is a test" +
                    "</div></blockquote>",
            );

            assertParsesToHtml(
                "> hi there this is a\n> test\n\n",
                '<blockquote><div class="paragraph">' +
                    "hi there this is a test" +
                    "</div></blockquote>",
            );
        });

        it("should output lists", function () {
            assertParsesToHtml(
                " * first\n" + " * second\n" + " * third\n\n",
                "<ul>" +
                    "<li>first</li>" +
                    "<li>second</li>" +
                    "<li>third</li>" +
                    "</ul>",
            );

            assertParsesToHtml(
                "1. first\n" + "2. second\n" + "3. third\n\n",
                '<ol start="1">' +
                    "<li>first</li>" +
                    "<li>second</li>" +
                    "<li>third</li>" +
                    "</ol>",
            );

            assertParsesToHtml(
                " * first\n" + " * second\n" + "    * inner\n" + " * third\n\n",
                "<ul>" +
                    "<li>first</li>" +
                    "<li>second <ul><li>inner</li></ul></li>" +
                    "<li>third</li>" +
                    "</ul>",
            );
        });

        it("should output tables", function () {
            assertParsesToHtml(
                "h1 | h2 | h3\n" + "---|----|---\n" + "d1 | d2 | d3\n" + "\n",
                "<table><thead>" +
                    '<tr><th scope="col">h1</th><th scope="col">h2</th><th scope="col">h3</th></tr>' +
                    "</thead><tbody>" +
                    "<tr><td>d1</td><td>d2</td><td>d3</td></tr>" +
                    "</tbody></table>",
            );

            assertParsesToHtml(
                "| h1 | h2 | h3 |\n" +
                    "|----|----|----|\n" +
                    "| d1 | d2 | d3 |\n" +
                    "\n",
                "<table><thead>" +
                    '<tr><th scope="col">h1</th><th scope="col">h2</th><th scope="col">h3</th></tr>' +
                    "</thead><tbody>" +
                    "<tr><td>d1</td><td>d2</td><td>d3</td></tr>" +
                    "</tbody></table>",
            );

            assertParsesToHtml(
                "h1 | h2 | h3\n" + ":--|:--:|--:\n" + "d1 | d2 | d3\n" + "\n",
                "<table><thead>" +
                    "<tr>" +
                    '<th style="text-align:left;" scope="col">h1</th>' +
                    '<th style="text-align:center;" scope="col">h2</th>' +
                    '<th style="text-align:right;" scope="col">h3</th>' +
                    "</tr>" +
                    "</thead><tbody>" +
                    "<tr>" +
                    '<td style="text-align:left;">d1</td>' +
                    '<td style="text-align:center;">d2</td>' +
                    '<td style="text-align:right;">d3</td>' +
                    "</tr>" +
                    "</tbody></table>",
            );
        });

        // TODO(aria): Figure out how to test the newline rule here

        it("should output paragraphs", function () {
            var html = htmlFromMarkdown("hi\n\n");
            assert.strictEqual(html, '<div class="paragraph">hi</div>');

            var html2 = htmlFromMarkdown("hi\n\n" + "bye\n\n");
            assert.strictEqual(
                html2,
                '<div class="paragraph">hi</div>' +
                    '<div class="paragraph">bye</div>',
            );
        });

        it("should output escaped text", function () {
            assertParsesToHtml(
                "\\#escaping\\^symbols\\*is\\[legal](yes)",
                "#escaping^symbols*is[legal](yes)",
            );
        });

        it("should output links", function () {
            assertParsesToHtml(
                "<https://www.khanacademy.org>",
                '<a href="https://www.khanacademy.org">' +
                    "https://www.khanacademy.org" +
                    "</a>",
            );

            assertParsesToHtml(
                "<aria@khanacademy.org>",
                '<a href="mailto:aria@khanacademy.org">' +
                    "aria@khanacademy.org" +
                    "</a>",
            );

            assertParsesToHtml(
                "https://www.khanacademy.org",
                '<a href="https://www.khanacademy.org">' +
                    "https://www.khanacademy.org" +
                    "</a>",
            );

            assertParsesToHtml(
                "[KA](https://www.khanacademy.org)",
                '<a href="https://www.khanacademy.org">' + "KA" + "</a>",
            );

            assertParsesToHtml(
                "[KA][1]\n\n[1]: https://www.khanacademy.org\n\n",
                '<div class="paragraph">' +
                    '<a href="https://www.khanacademy.org">' +
                    "KA" +
                    "</a>" +
                    "</div>",
            );
        });

        it("should output strong", function () {
            assertParsesToHtml("**bold**", "<strong>bold</strong>");
        });

        it("should output u", function () {
            assertParsesToHtml("__underscore__", "<u>underscore</u>");
        });

        it("should output em", function () {
            assertParsesToHtml("*italics*", "<em>italics</em>");
        });

        it("should output simple combined bold/italics", function () {
            assertParsesToHtml(
                "***bolditalics***",
                "<em><strong>bolditalics</strong></em>",
            );
            assertParsesToHtml(
                "**bold *italics***",
                "<strong>bold <em>italics</em></strong>",
            );
        });

        it("should output complex combined bold/italics", function () {
            assertParsesToHtml(
                "***bold** italics*",
                "<em><strong>bold</strong> italics</em>",
            );
            assertParsesToHtml(
                "*hi **there you***",
                "<em>hi <strong>there you</strong></em>",
            );
        });

        it("should output del", function () {
            assertParsesToHtml("~~strikethrough~~", "<del>strikethrough</del>");
        });

        it("should output inline code", function () {
            assertParsesToHtml(
                "here is some `inline code`.",
                "here is some <code>inline code</code>.",
            );
        });

        it("should output text", function () {
            assertParsesToHtml("Yay text!", "Yay text!");
        });

        it("shouldn't split text into multiple spans", function () {
            var parsed = SimpleMarkdown.defaultInlineParse("hi, there!");
            var elements = SimpleMarkdown.defaultHtmlOutput(parsed);
            assert.deepEqual(elements, "hi, there!");
        });
    });

    describe("convenience wrappers", function () {
        describe("markdownToReact", function () {
            it("should work on a basic 2 paragraph input", function () {
                var elems = SimpleMarkdown.markdownToReact("Hi there!\n\nYay!");

                assert.strictEqual(
                    reactToHtml(elems),
                    '<div class="paragraph">Hi there!</div>' +
                        '<div class="paragraph">Yay!</div>',
                );
            });
        });

        describe("markdownToHtml", function () {
            it("should work on a basic 2 paragraph input", function () {
                var html = SimpleMarkdown.markdownToHtml("Hi there!\n\nYay!");

                assert.strictEqual(
                    html,
                    '<div class="paragraph">Hi there!</div>' +
                        '<div class="paragraph">Yay!</div>',
                );
            });
        });

        describe("ReactMarkdown component", function () {
            it("should work on a basic 2 paragraph input", function () {
                var elem = React.createElement(SimpleMarkdown.ReactMarkdown, {
                    source: "Hi there!\n\nYay!",
                });

                assert.strictEqual(
                    reactToHtml(elem),
                    "<div>" +
                        '<div class="paragraph">Hi there!</div>' +
                        '<div class="paragraph">Yay!</div>' +
                        "</div>",
                );
            });
        });
    });

    describe("helper functions", function () {
        describe("sanitizeText", function () {
            it("should escape basic html", function () {
                var result = SimpleMarkdown.sanitizeText(
                    'hi <span class="my-class">there</span>',
                );
                assert.strictEqual(
                    result,
                    "hi &lt;span class=&quot;my-class&quot;&gt;there&lt;/span&gt;",
                );
            });
        });
    });

    describe("Exponential backtracking avoidance", function () {
        it("should parse long inlineCode quickly", function () {
            var source = "`" + Array(2000).join(" ");
            var startTime = Date.now();
            var parsed = inlineParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );
        });

        it("should parse long headings quickly", function () {
            var source = "### Hi " + Array(1200).join(" ") + "there ### \n\n";
            var startTime = Date.now();
            var parsed = blockParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );
        });

        it("should parse long del strikethroughs quickly", function () {
            var source = "~~~h" + Array(30).join(" ") + "i";
            var startTime = Date.now();
            var parsed = inlineParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );

            source = "~~~h" + Array(1000).join(" ") + "i";
            startTime = Date.now();
            parsed = inlineParse(source);
            duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );
        });

        it("should parse long code fences quickly", function () {
            var source =
                "~~~" +
                Array(1000).join(" ") +
                "\n" +
                Array(1000).join(" ") +
                "\n";
            var startTime = Date.now();
            var parsed = blockParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );

            var source =
                "~~~" +
                Array(2000).join(" ") +
                "\n" +
                Array(10000).join(" ") +
                "\n";
            var startTime = Date.now();
            var parsed = blockParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );
        });

        it("should parse long strikethroughs with lots of backslasher quickly", function () {
            var source =
                "~~\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}\\}" +
                "\\}\\}\\}\\}\\}\\}\\}\\}\\\\}\\}\\}\\}\\}\\}\\}}\\}\\}\\}\\}\\}\\}}~";

            var startTime = Date.now();
            var parsed = blockParse(source);
            var duration = Date.now() - startTime;
            assert.ok(
                duration < 10,
                "Expected parsing to finish in <10ms, but was " +
                    duration +
                    "ms.",
            );
        });
    });

    describe("custom rules", () => {
        it("should throw if `parse` returns invalid result", () => {
            const parse = jest
                .fn()
                // Flow correctly catches that the `parse` function returns and
                // incorrect type, but I want to keep this test here for now
                // because in call sites that use this, we've seen Flow not
                // catch this. So for now, we hard-fail!
                // $FlowFixMe[incompatible-call]
                .mockImplementation(() => "invalid parse result");

            const invalidRules = {
                parseDoesntReturnCorrectType: {
                    order: 1,
                    match: (source, state, prevCapture) => true,
                    parse,
                },
            };

            expect(() =>
                // $FlowFixMe[incompatible-call]
                SimpleMarkdown.parserFor(invalidRules)("some input"),
            ).toThrow();
            expect(parse).toHaveBeenCalled();
        });
    });
});
