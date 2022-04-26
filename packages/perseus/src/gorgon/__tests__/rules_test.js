// @flow
import PerseusMarkdown from "../../perseus-markdown.jsx";
import absoluteUrlRule from "../rules/absolute-url.js";
import blockquotedMathRule from "../rules/blockquoted-math.js";
import blockquotedWidgetRule from "../rules/blockquoted-widget.js";
import doubleSpacingAfterTerminalRule from "../rules/double-spacing-after-terminal.js";
import extraContentSpacingRule from "../rules/extra-content-spacing.js";
import headingLevel1Rule from "../rules/heading-level-1.js";
import headingLevelSkipRule from "../rules/heading-level-skip.js";
import headingSentenceCaseRule from "../rules/heading-sentence-case.js";
import headingTitleCaseRule from "../rules/heading-title-case.js";
import imageAltTextRule from "../rules/image-alt-text.js";
import imageInTableRule from "../rules/image-in-table.js";
import imageSpacesAroundUrlsRule from "../rules/image-spaces-around-urls.js";
import imageWidgetRule from "../rules/image-widget.js";
import linkClickHereRule from "../rules/link-click-here.js";
import longParagraphRule from "../rules/long-paragraph.js";
import mathAdjacentRule from "../rules/math-adjacent.js";
import mathAlignExtraBreakRule from "../rules/math-align-extra-break.js";
import mathAlignLinebreaksRule from "../rules/math-align-linebreaks.js";
import mathEmptyRule from "../rules/math-empty.js";
import mathFontSizeRule from "../rules/math-font-size.js";
import mathFracRule from "../rules/math-frac.js";
import mathNestedRule from "../rules/math-nested.js";
import mathStartsWithSpaceRule from "../rules/math-starts-with-space.js";
import mathTextEmptyRule from "../rules/math-text-empty.js";
import mathWithoutDollarsRule from "../rules/math-without-dollars.js";
import nestedListsRule from "../rules/nested-lists.js";
import profanityRule from "../rules/profanity.js";
import tableMissingCellsRule from "../rules/table-missing-cells.js";
import unbalancedCodeDelimitersRule from "../rules/unbalanced-code-delimiters.js";
import unescapedDollarRule from "../rules/unescaped-dollar.js";
import widgetInTableRule from "../rules/widget-in-table.js";
import TreeTransformer from "../tree-transformer.js";

describe("Individual lint rules tests", () => {
    function testRule(rule, markdown, context) {
        const tree = PerseusMarkdown.parse(markdown);
        const tt = new TreeTransformer(tree);
        const warnings = [];

        // The markdown parser often outputs adjacent text nodes. We
        // coalesce them before linting for efficiency and accuracy.
        tt.traverse((node, state, content) => {
            if (TreeTransformer.isTextNode(node)) {
                let next = state.nextSibling();
                while (TreeTransformer.isTextNode(next)) {
                    // $FlowFixMe[prop-missing]
                    // $FlowFixMe[incompatible-use]
                    node.content += next.content;
                    state.removeNextSibling();
                    next = state.nextSibling();
                }
            }
        });

        if (context) {
            // $FlowFixMe[prop-missing]
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
                warnings.push(check);
            }
        });

        return warnings.length === 0 ? null : warnings;
    }

    function expectWarning(rule, strings, context) {
        if (typeof strings === "string") {
            strings = [strings];
        }

        it(`Rule ${rule.name} warns`, () => {
            for (const string of strings) {
                expect(testRule(rule, string, context) !== null).toBeTruthy();
            }
        });
    }

    function expectPass(rule, strings, context) {
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
    expectWarning(longParagraphRule, sentence + sentence);
    expectPass(longParagraphRule, [sentence, sentence + "\n\n" + sentence]);

    expectWarning(headingLevel1Rule, "# Level 1 heading");
    expectPass(headingLevel1Rule, "## Level 1 heading\n\n### Level 3 heading");

    expectWarning(headingLevelSkipRule, "## heading 1\n\n#### heading 2");
    expectPass(headingLevelSkipRule, [
        "## heading 1\n\n### heading 2\n\n#### heading 3\n\n### heading 4",
        "## heading 1\n\n##heading 2\n\n##heading3",
    ]);

    expectWarning(
        headingTitleCaseRule,
        "## This Heading is in Title Case and the but nor for Too",
    );
    expectPass(headingTitleCaseRule, [
        "## This heading is in sentence case",
        "## Acronyms: The CIA, NSA, DNI, and FBI",
        "## The Great War",
    ]);

    expectWarning(headingSentenceCaseRule, [
        "## this heading is uncapitalized",
        "## 'this' heading is uncapitalized",
        "##   this heading is uncapitalized",
    ]);
    expectPass(headingSentenceCaseRule, [
        "## This heading is in sentence case",
        "## 'This heading too'",
        "## 2 + 2 = 4",
    ]);

    expectWarning(nestedListsRule, [
        "1. outer\n  * nested\n  *nested",
        " + outer\n\n   1. nested",
    ]);
    expectPass(nestedListsRule, [
        "-one\n-two\n-three",
        "1. one\n 2. two\n3. three",
        " * one\n\n * two\n\n * three",
    ]);

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

    expectWarning(blockquotedMathRule, ["> $1$", "Quote:\n\n> $x$\n\n"]);
    expectPass(blockquotedMathRule, [
        "$x$",
        "\n$x$\n  $y$\n",
        "> bq #1\n\n$x+y=1$\n\n> bq #2",
    ]);

    expectWarning(blockquotedWidgetRule, ["> [[☃ passage 1]]"]);
    expectPass(blockquotedWidgetRule, [
        "[[☃ passage 1]]",
        "> bq #1\n\nTesting [[☃ passage 1]] testing\n\n> bq #2",
    ]);

    expectWarning(linkClickHereRule, [
        "[click here](http://google.com)",
        "[Click here, please](http://google.com)",
        "[For a good time, Click Here](http://google.com)",
    ]);
    expectPass(linkClickHereRule, [
        "[click to activate this link here](http://google.com)",
    ]);

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

    expectWarning(imageInTableRule, [
        "|col1|col2|\n|----|----|\n|![alt-text](/link.gif)|cell2|",
    ]);
    expectPass(imageInTableRule, [
        "![alt-text](/link.gif)\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    expectWarning(widgetInTableRule, [
        "|col1|col2|\n|----|----|\n|[[☃ passage 1]]|cell2|",
    ]);
    expectPass(widgetInTableRule, [
        "[[☃ passage 1]]\n|col1|col2|\n|----|----|\n|cell1|cell2|",
    ]);

    expectWarning(tableMissingCellsRule, [
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|col3|\n|cell1|cell2|",
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|cell3|",
        "|col1|\n|----|----|\n|col1|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|col1|\n|cell1|cell2|",
    ]);
    expectPass(tableMissingCellsRule, [
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|",
        "|cell1|\n|----|\n|cell2|\n|cell3|",
    ]);

    expectWarning(unescapedDollarRule, ["It costs $10", "It costs $$10$"]);

    expectPass(unescapedDollarRule, ["It costs \\$10", "It costs $10x$"]);

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

    expectWarning(mathEmptyRule, [
        "foo $$ bar",
        "foo\n\n$$\n\nbar",
        "$$ | $$ | $$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);
    expectPass(mathEmptyRule, [
        "foo $x$ bar",
        "foo\n\n$x$\n\nbar",
        "$x$ | $y$ | $z$\n- | - | -\ndata 1 | data 2 | data 3",
    ]);

    expectWarning(mathFracRule, ["$\\frac 12$", "$\\frac{1}{2}$"]);
    expectPass(mathFracRule, [
        "$\\dfrac 12$",
        "$\\dfrac{1}{2}$",
        "$\\fraction 12$",
    ]);

    expectWarning(mathTextEmptyRule, [
        "$x\\text{}y$",
        "$x\\text{ }y$",
        "$x\\text{\n}y$",
        "$x\\text{\t}y$",
    ]);
    expectPass(mathTextEmptyRule, ["$x\\text{z}y$"]);

    expectWarning(mathAdjacentRule, ["$x=b+c$\n\n$x-b=c$"]);
    expectPass(mathAdjacentRule, ["$x=b+c$\n\nnew paragraph\n\n$x-b=c$"]);

    expectWarning(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\\\y\\end{align}$",
        "$\\begin{align} x \\\\ y \\end{align}$",
        "$\\begin{align}x\\\\\\\\\\\\y\\end{align}$",
        "$\\begin{align}\nx\\\\\n\\\\\\\\\ny\n\\end{align}$",
    ]);
    expectPass(mathAlignLinebreaksRule, [
        "$\\begin{align}x\\sqrty\\end{align}$",
        "$\\begin{align}x\\\\\\\\y\\end{align}$",
        "$\\begin{align}x\\\\\n\\\\y\\end{align}$",
        "$\\begin{align}x \\\\  \\\\ y\\end{align}$",
    ]);

    expectWarning(mathAlignExtraBreakRule, [
        "$\\begin{align}x \\\\\\\\ y \\\\ \\end{align}$",
        "$\\begin{align}x \\\\\\\\ y \\\\\\\\ \\end{align}$",
    ]);
    expectPass(mathAlignExtraBreakRule, [
        "$\\begin{align} x \\\\\\\\ y  \\end{align}$",
    ]);

    expectWarning(mathNestedRule, [
        "$\\text{4$x$}$",
        "inline $\\text{4$x$}$ math",
        "$\\text{$$}$",
    ]);
    expectPass(mathNestedRule, ["$\\text{4}x$", "inline $\\text{4}x$ math"]);

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
    expectPass(mathFontSizeRule, ["$\\sqrt{x}$", "inline $\\sqrt{x}$ math"]);

    expectWarning(profanityRule, [
        "Shit",
        "taking a piss",
        "He said 'Fuck that!'",
        "cunt",
        "cocksucker",
        "motherfucker",
    ]);
    expectPass(profanityRule, ["spit", "miss", "duck"]);

    expectWarning(mathWithoutDollarsRule, [
        "One half: \\frac{1}{2}!",
        "\\Large{BIG}!",
        "This looks like someone's ear: {",
        "Here's the other ear: }. Weird!",
    ]);
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

    expectWarning(unbalancedCodeDelimitersRule, [
        "`code``",
        "``code```",
        "```code\n",
        "~~~\ncode\n~~",
    ]);
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

    expectWarning(imageSpacesAroundUrlsRule, [
        "![alternative]( http://example.com/image.jpg )",
        "![alternative]( http://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg )",
        "![alternative](\thttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\t)",
        "![alternative](\nhttp://example.com/image.jpg)",
        "![alternative](http://example.com/image.jpg\n)",
    ]);
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

    expectWarning(doubleSpacingAfterTerminalRule, [
        "Good times.  Great oldies.",
        "End of the line!  ",
        "You?  Me!",
    ]);
    expectPass(doubleSpacingAfterTerminalRule, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);

    expectWarning(extraContentSpacingRule, [
        "There's extra spaces here.     ",
        "There's extra spaces here    ",
        "  ",
    ]);
    expectPass(extraContentSpacingRule, [
        "This is okay.",
        "This is definitely okay. Yeah.",
        "$a == 3.  125$",
    ]);
});
