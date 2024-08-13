import * as PureMarkdown from "@khanacademy/pure-markdown";

import absoluteUrlRule from "../rules/absolute-url";
import blockquotedMathRule from "../rules/blockquoted-math";
import blockquotedWidgetRule from "../rules/blockquoted-widget";
import doubleSpacingAfterTerminalRule from "../rules/double-spacing-after-terminal";
import extraContentSpacingRule from "../rules/extra-content-spacing";
import headingLevel1Rule from "../rules/heading-level-1";
import headingLevelSkipRule from "../rules/heading-level-skip";
import headingSentenceCaseRule from "../rules/heading-sentence-case";
import headingTitleCaseRule from "../rules/heading-title-case";
import imageAltTextRule from "../rules/image-alt-text";
import imageInTableRule from "../rules/image-in-table";
import imageSpacesAroundUrlsRule from "../rules/image-spaces-around-urls";
import imageWidgetRule from "../rules/image-widget";
import linkClickHereRule from "../rules/link-click-here";
import longParagraphRule from "../rules/long-paragraph";
import mathAdjacentRule from "../rules/math-adjacent";
import mathAlignExtraBreakRule from "../rules/math-align-extra-break";
import mathAlignLinebreaksRule from "../rules/math-align-linebreaks";
import mathEmptyRule from "../rules/math-empty";
import mathFontSizeRule from "../rules/math-font-size";
import mathFracRule from "../rules/math-frac";
import mathNestedRule from "../rules/math-nested";
import mathStartsWithSpaceRule from "../rules/math-starts-with-space";
import mathTextEmptyRule from "../rules/math-text-empty";
import mathWithoutDollarsRule from "../rules/math-without-dollars";
import nestedListsRule from "../rules/nested-lists";
import StaticWidgetInQuestionStem from "../rules/static-widget-in-question-stem";
import tableMissingCellsRule from "../rules/table-missing-cells";
import unbalancedCodeDelimitersRule from "../rules/unbalanced-code-delimiters";
import unescapedDollarRule from "../rules/unescaped-dollar";
import widgetInTableRule from "../rules/widget-in-table";
import TreeTransformer from "../tree-transformer";

type Rule = any;

describe("Individual lint rules tests", () => {
    function testRule(rule: Rule, markdown: string, context): {message: string}[] | null {
        const tree = PureMarkdown.parse(markdown);
        const tt = new TreeTransformer(tree);
        const warnings = [];

        // The markdown parser often outputs adjacent text nodes. We
        // coalesce them before linting for efficiency and accuracy.
        tt.traverse((node, state, content) => {
            if (TreeTransformer.isTextNode(node)) {
                let next = state.nextSibling();
                while (TreeTransformer.isTextNode(next)) {
                    // @ts-expect-error - TS2339 - Property 'content' does not exist on type 'TreeNode'. | TS2533 - Object is possibly 'null' or 'undefined'. | TS2339 - Property 'content' does not exist on type 'TreeNode'.
                    node.content += next.content;
                    state.removeNextSibling();
                    next = state.nextSibling();
                }
            }
        });

        if (context) {
            context.content = markdown;
        } else {
            context = {
                content: markdown,
                widgets: {},
            };
        }
        tt.traverse((node, state, content) => {
            const check = rule.check(node, state, content, context);
            if (check) {
                // @ts-expect-error - TS2345 - Argument of type 'any' is not assignable to parameter of type 'never'.
                warnings.push(check);
            }
        });

        return warnings.length === 0 ? null : warnings;
    }

    function expectWarning(rule, strings: string | Array<string>, context) {
        if (typeof strings === "string") {
            strings = [strings];
        }

        it(`Rule ${rule.name} warns`, () => {
            for (const string of strings) {
                expect(testRule(rule, string, context) !== null).toBeTruthy();
            }
        });
    }

    function expectPass(rule, strings: string | Array<string>, context) {
        if (typeof strings === "string") {
            strings = [strings];
        }

        it(`Rule ${rule.name} passes`, () => {
            for (const string of strings) {
                expect(testRule(rule, string, context) === null).toBeTruthy();
            }
        });
    }

    // 299 characters
    const sentence = new Array(25).fill("lorem ipsum").join(" ");

    // long-paragraph rule warns about paragraphs over 500 characters
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(longParagraphRule, sentence + sentence);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(longParagraphRule, [sentence, sentence + "\n\n" + sentence]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(headingLevel1Rule, "# Level 1 heading");
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(headingLevel1Rule, "## Level 1 heading\n\n### Level 3 heading");

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(headingLevelSkipRule, "## heading 1\n\n#### heading 2");
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(headingLevelSkipRule, [
        "## heading 1\n\n### heading 2\n\n#### heading 3\n\n### heading 4",
        "## heading 1\n\n##heading 2\n\n##heading3",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(
        headingTitleCaseRule,
        "## This Heading is in Title Case and the but nor for Too",
    );
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(headingTitleCaseRule, [
        "## This heading is in sentence case",
        "## Acronyms: The CIA, NSA, DNI, and FBI",
        "## The Great War",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(headingSentenceCaseRule, [
        "## this heading is uncapitalized",
        "## 'this' heading is uncapitalized",
        "##   this heading is uncapitalized",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(headingSentenceCaseRule, [
        "## This heading is in sentence case",
        "## 'This heading too'",
        "## 2 + 2 = 4",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(nestedListsRule, [
        "1. outer\n  * nested\n  *nested",
        " + outer\n\n   1. nested",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(nestedListsRule, [
        "-one\n-two\n-three",
        "1. one\n 2. two\n3. three",
        " * one\n\n * two\n\n * three",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(imageAltTextRule, [
        "![](http://google.com/)",
        '![](http://google.com/ "title")',
        "![][url-ref]",
        "![ ](http://google.com/)",
        "![ \t\n ](http://google.com/)", // all whitespace
        "![blah](http://google.com/)", // too short to be meaningful
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(imageAltTextRule, [
        "![alt-text](http://google.com)",
        '![alternative text](http://google.com/ "title")',
        "![alt alt alt][url-ref]",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(blockquotedMathRule, ["> $1$", "Quote:\n\n> $x$\n\n"]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(blockquotedMathRule, [
        "$x$",
        "\n$x$\n  $y$\n",
        "> bq #1\n\n$x+y=1$\n\n> bq #2",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(blockquotedWidgetRule, ["> [[☃ passage 1]]"]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(blockquotedWidgetRule, [
        "[[☃ passage 1]]",
        "> bq #1\n\nTesting [[☃ passage 1]] testing\n\n> bq #2",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(linkClickHereRule, [
        "[click here](http://google.com)",
        "[Click here, please](http://google.com)",
        "[For a good time, Click Here](http://google.com)",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(linkClickHereRule, [
        "[click to activate this link here](http://google.com)",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(absoluteUrlRule, [
        // Warn about absolute khanacademy.org urls
        "[target](http://khanacademy.org/about)",
        "[target](https://khanacademy.org/about)",
        "[target](http://www.khanacademy.org/about)",
        "[target](https://www.khanacademy.org/about)",
        "[target](http://es.khanacademy.org/about)",
        "[target](https://es.khanacademy.org/about)",
        "[target](//www.khanacademy.org/about)",
        "[target](//www.khanacademy.org/about)",

        // We should get the same warnings for images
        "![alt text](http://khanacademy.org/about)",
        "![alt text](https://www.khanacademy.org/about)",
        "![alt text](https://es.khanacademy.org/about)",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(absoluteUrlRule, [
        "[target](/about)", // relative URLs okay
        "[target](https://kasandbox.org/path)",
        "[target](https://fastly.kastatic.org/path)",
        "[target](https://cdn.kastatic.org/path)",
        "[target](https://ka-perseus-images.s3.amazonaws.com/path)",
        "[target](https://ka-youtube-converted.storage.googleapis.com)",

        // Same warnings for images
        "![alt text](/about)",
        "![alt text](https://cdn.kastatic.org/path)",
        "![alt text](https://ka-perseus-images.s3.amazonaws.com/path)",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(imageInTableRule, [
        "|col1|col2|\n|----|----|\n|![alt-text](/link.gif)|cell2|",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(imageInTableRule, [
        "![alt-text](/link.gif)\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(widgetInTableRule, [
        "|col1|col2|\n|----|----|\n|[[☃ passage 1]]|cell2|",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(widgetInTableRule, [
        "[[☃ passage 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(tableMissingCellsRule, [
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|col3|\n|cell1|cell2|",
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|cell3|",
        "|col1|\n|----|----|\n|col1|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|col1|\n|cell1|cell2|",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(tableMissingCellsRule, [
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|",
        "|cell1|\n|----|\n|cell2|\n|cell3|",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(unescapedDollarRule, ["It costs $10", "It costs $$10$"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(unescapedDollarRule, ["It costs \\$10", "It costs $10x$"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathStartsWithSpaceRule, [
        "foo$~ x$bar",
        "$\\qquad x$",
        "$\\quad x$",
        "$\\, x$",
        "$\\; x$",
        "$\\: x$",
        "$\\ x$",
        "$\\! x$",
        "$\\enspace x$",
        "$\\phantom{xyz} x$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathStartsWithSpaceRule, [
        "$a~ x$",
        "$a\\qquad x$",
        "$a\\quad x$",
        "$a\\, x$",
        "$a\\; x$",
        "$a\\: x$",
        "$a\\ x$",
        "$a\\! x$",
        "$a\\enspace x$",
        "$a\\phantom{xyz} x$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathEmptyRule, [
        "foo $$ bar",
        "foo\n\n$$\n\nbar",
        "$$ | $$ | $$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathEmptyRule, [
        "foo $x$ bar",
        "foo\n\n$x$\n\nbar",
        "$x$ | $y$ | $z$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathFracRule, ["$\\frac 12$", "$\\frac{1}{2}$"]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathFracRule, [
        "$\\dfrac 12$",
        "$\\dfrac{1}{2}$",
        "$\\fraction 12$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathTextEmptyRule, [
        "$x\\text{}y$",
        "$x\\text{ }y$",
        "$x\\text{\n}y$",
        "$x\\text{\t}y$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathTextEmptyRule, ["$x\\text{z}y$"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathAdjacentRule, ["$x=b+c$\n\n$x-b=c$"]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathAdjacentRule, ["$x=b+c$\n\nnew paragraph\n\n$x-b=c$"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\\\y\\end{align}$",
        "$\\begin{align} x \\\\ y \\end{align}$",
        "$\\begin{align}x\\\\\\\\\\\\y\\end{align}$",
        "$\\begin{align}\nx\\\\\n\\\\\\\\\ny\n\\end{align}$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\sqrty\\end{align}$",
        "$\\begin{align}x\\\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\n\\\\y\\end{align}$",
        "$\\begin{align}x \\\\  \\\\ y\\end{align}$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathAlignExtraBreakRule, [
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathAlignExtraBreakRule, [
        "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathNestedRule, [
        "$\\text{4$x$}$",
        "inline $\\text{4$x$}$ math",
        "$\\text{$$}$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathNestedRule, ["$\\text{4}x$", "inline $\\text{4}x$ math"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathFontSizeRule, [
        "$\\tiny{x}$",
        "inline $\\Tiny{x}$ math",
        "$a \\small{x} b$",
        "$\\large{ xyz }$",
        "$ \\Large { x } $",
        "$\\LARGE{x}$",
        "$\\huge{x}$",
        "$\\Huge{x}$",
        "$\\normalsize{x}$",
        "$\\scriptsize{x}$",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathFontSizeRule, ["$\\sqrt{x}$", "inline $\\sqrt{x}$ math"]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(mathWithoutDollarsRule, [
        "One half: \\frac{1}{2}!",
        "\\Large{BIG}!",
        "This looks like someone's ear: {",
        "Here's the other ear: }. Weird!",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(mathWithoutDollarsRule, [
        "One half: $\\frac{1}{2}$",
        "$\\Large{BIG}$!",
        "`{`",
        "`\\frac{1}{2}`",
        "``\\frac{1}{2}``",
        "```\n\\frac{1}{2}\n```",
        "~~~\n\\frac{1}{2}\n~~~",
        "\n    \\frac{1}{2}\n    {\n    }\n",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(unbalancedCodeDelimitersRule, [
        "`code``",
        "``code```",
        "```code\n",
        "~~~\ncode\n~~",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(unbalancedCodeDelimitersRule, [
        "`code`",
        "``code``",
        "```code```",
        "```\ncode\n```",
        "~~~\ncode\n~~~",
        "``co`de``",
        "`co~de`",
        "$`~$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(imageSpacesAroundUrlsRule, [
        "![alternative]( http://example.com/image.jpg )",
        "![alternative]( http://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg )",
        "![alternative](\thttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\t)",
        "![alternative](\nhttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\n)",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(imageSpacesAroundUrlsRule, [
        "![alternative](http://example.com/image.jpg)",
        "![alternative](image.jpg)",
        "![alternative](--image.jpg--)",
    ]);

    // Warn for image widget with no alt text
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {},
            },
        },
    });

    // Warn for image widget with short alt text
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567",
                },
            },
        },
    });

    // Pass for image widget with long alt text
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                },
            },
        },
    });

    // Warn for image widget with math in its caption
    expectWarning(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: $x$",
                },
            },
        },
    });

    // Pass for image widget with caption and no math
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: x",
                },
            },
        },
    });

    // Pass for image widget with escaped dollar in its caption
    expectPass(imageWidgetRule, "[[☃ image 1]]", {
        widgets: {
            "image 1": {
                options: {
                    alt: "1234567890",
                    caption: "Test: \\$10",
                },
            },
        },
    });

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(doubleSpacingAfterTerminalRule, [
        "Good times.  Great oldies.",
        "End of the line!  ",
        "You?  Me!",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(doubleSpacingAfterTerminalRule, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);

    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectWarning(extraContentSpacingRule, [
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ]);
    // @ts-expect-error - TS2554 - Expected 3 arguments, but got 2.
    expectPass(extraContentSpacingRule, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);

    test("Rule static-widget-in-question-stem allows static widgets in hints", () => {
        const problems = testRule(StaticWidgetInQuestionStem, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: ["hint"],
            widgets: {
                "radio 1": {
                    options: {
                        static: true,
                    },
                },
            },
        })

        expect(problems).toBe(null)
    });

    test("Rule static-widget-in-question-stem allows static widgets in articles", () => {
        const problems = testRule(StaticWidgetInQuestionStem, "[[☃ radio 1]]", {
            contentType: "article",
            stack: [],
            widgets: {
                "radio 1": {
                    options: {
                        static: true,
                    },
                },
            },
        })

        expect(problems).toBe(null)
    });

    test("Rule static-widget-in-question-stem allows non-static widgets in question stems", () => {
        const problems = testRule(StaticWidgetInQuestionStem, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: [],
            widgets: {
                "radio 1": {
                    options: {
                        static: false,
                    },
                },
            },
        })

        expect(problems).toBe(null)
    });

    test("Rule static-widget-in-question-stem tolerates widget with no definition", () => {
        const problems = testRule(StaticWidgetInQuestionStem, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: [],
            widgets: {},
        })

        expect(problems).toBe(null)
    });

    test("Rule static-widget-in-question-stem allows warns about static widgets in question stems", () => {
        const problems = testRule(StaticWidgetInQuestionStem, "[[☃ radio 1]]", {
            contentType: "exercise",
            stack: [],
            widgets: {
                "radio 1": {
                    options: {
                        static: true,
                    },
                },
            },
        })

        expect(problems?.length).toBe(1)
        expect(problems?.[0]?.message).toBe("Widget in question stem is static (non-interactive).")
    });
});
